$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host ""
Write-Host "== Break the Cycle public-local start ==" -ForegroundColor Cyan

powershell -ExecutionPolicy Bypass -File ".\scripts\start-local.ps1"

Write-Host ""
Write-Host "== Tunnel ==" -ForegroundColor Cyan

$cloudflared = Get-Command cloudflared -ErrorAction SilentlyContinue
if (-not $cloudflared) {
  Write-Host "cloudflared is not installed or not on PATH." -ForegroundColor Yellow
  Write-Host "The local app is running, but breakthecycle.network will not reach this PC until the tunnel is up." -ForegroundColor Yellow
  exit 0
}

$existing = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
  $_.Name -eq 'cloudflared.exe' -and $_.CommandLine -match 'tunnel'
} | Select-Object -First 1

if ($existing) {
  Write-Host "cloudflared is already running (PID $($existing.ProcessId))."
  exit 0
}

$tunnelToken = $env:CLOUDFLARE_TUNNEL_TOKEN
if (-not $tunnelToken) {
  Write-Host "CLOUDFLARE_TUNNEL_TOKEN is not set in this shell/environment." -ForegroundColor Yellow
  Write-Host "Start cloudflared manually or install the tunnel as a Windows service." -ForegroundColor Yellow
  exit 0
}

$outLog = Join-Path $repoRoot 'cloudflared.out.log'
$errLog = Join-Path $repoRoot 'cloudflared.err.log'

Start-Process `
  -FilePath $cloudflared.Source `
  -ArgumentList @('tunnel', 'run', '--token', $tunnelToken) `
  -WorkingDirectory $repoRoot `
  -RedirectStandardOutput $outLog `
  -RedirectStandardError $errLog `
  -WindowStyle Hidden `
  | Out-Null

Start-Sleep -Seconds 4

$started = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
  $_.Name -eq 'cloudflared.exe' -and $_.CommandLine -match 'tunnel'
} | Select-Object -First 1

if ($started) {
  Write-Host "cloudflared started (PID $($started.ProcessId))."
  Write-Host "If your tunnel route is configured, breakthecycle.network can now hit this PC." -ForegroundColor Green
} else {
  Write-Host "cloudflared did not stay up. Check cloudflared.err.log." -ForegroundColor Yellow
}
