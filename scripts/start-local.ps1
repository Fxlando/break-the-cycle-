$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

function Write-Section($message) {
  Write-Host ""
  Write-Host "== $message ==" -ForegroundColor Cyan
}

function Get-EnvFileValue($name) {
  $envPath = Join-Path $repoRoot '.env'
  if (-not (Test-Path $envPath)) {
    return ''
  }

  $line = Get-Content $envPath | Where-Object { $_ -match "^\s*$([regex]::Escape($name))\s*=" } | Select-Object -Last 1
  if (-not $line) {
    return ''
  }

  return ($line -replace "^\s*$([regex]::Escape($name))\s*=\s*", '').Trim()
}

function Get-DatabaseSummary() {
  $raw = Get-EnvFileValue 'DATABASE_URL'
  if (-not $raw) {
    return @{
      Raw = ''
      Host = ''
      IsLocal = $false
      Valid = $false
    }
  }

  $dbHost = ''
  try {
    $uri = [System.Uri]$raw
    $dbHost = $uri.Host
  } catch {
    if ($raw -match '^[a-z]+:\/\/[^@]+@(?<host>[^:\/\?]+)') {
      $dbHost = $Matches.host
    }
  }

  $isLocal = $dbHost -match '^(localhost|127(?:\.\d{1,3}){3}|::1)$'
  return @{
    Raw = $raw
    Host = $dbHost
    IsLocal = [bool]$isLocal
    Valid = [bool]$dbHost
  }
}

function Test-LocalPort($port) {
  try {
    $client = New-Object System.Net.Sockets.TcpClient
    $async = $client.BeginConnect('127.0.0.1', $port, $null, $null)
    $connected = $async.AsyncWaitHandle.WaitOne(1500, $false)
    if (-not $connected) {
      $client.Close()
      return $false
    }
    $null = $client.EndConnect($async)
    $client.Close()
    return $true
  } catch {
    return $false
  }
}

function Get-NodeProcess($pattern) {
  @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
    $_.Name -eq 'node.exe' -and $_.CommandLine -match $pattern
  })
}

function Ensure-PostgresRunning() {
  Write-Section 'Postgres'
  $database = Get-DatabaseSummary
  if ($database.Valid -and -not $database.IsLocal) {
    Write-Host "DATABASE_URL points to $($database.Host). Skipping local PostgreSQL service check."
    return
  }

  $service = Get-Service -Name 'postgresql-x64-17' -ErrorAction SilentlyContinue
  if (-not $service) {
    Write-Host 'PostgreSQL service not found. Start it manually if this machine uses a different service name.' -ForegroundColor Yellow
    return
  }

  if ($service.Status -eq 'Running') {
    Write-Host 'PostgreSQL is already running.'
    return
  }

  try {
    Start-Service -Name $service.Name -ErrorAction Stop
    Start-Sleep -Seconds 2
    Write-Host 'Started PostgreSQL.'
  } catch {
    Write-Host 'Could not start PostgreSQL automatically. Start it manually if needed.' -ForegroundColor Yellow
  }
}

function Ensure-OllamaRunning() {
  Write-Section 'Ollama'
  if (Test-LocalPort 11434) {
    Write-Host 'Ollama is already reachable on port 11434.'
    return
  }

  $ollamaCommand = Get-Command ollama -ErrorAction SilentlyContinue
  if (-not $ollamaCommand) {
    Write-Host 'Ollama is not installed or not on PATH. Start it manually if you need mentor replies.' -ForegroundColor Yellow
    return
  }

  try {
    Start-Process -FilePath $ollamaCommand.Source -ArgumentList 'serve' -WindowStyle Hidden | Out-Null
    Start-Sleep -Seconds 3
    if (Test-LocalPort 11434) {
      Write-Host 'Started Ollama.'
    } else {
      Write-Host 'Tried to start Ollama, but it is still not reachable. Open the Ollama app manually if needed.' -ForegroundColor Yellow
    }
  } catch {
    Write-Host 'Could not start Ollama automatically. Open the Ollama app manually if needed.' -ForegroundColor Yellow
  }
}

function Start-NodeService($name, $scriptName, $outLog, $errLog) {
  Write-Section $name
  $pattern = [regex]::Escape($scriptName)
  $existing = Get-NodeProcess $pattern | Select-Object -First 1
  if ($existing) {
    Write-Host "$name is already running (PID $($existing.ProcessId))."
    return
  }

  $nodeCommand = Get-Command node -ErrorAction Stop
  $outPath = Join-Path $repoRoot $outLog
  $errPath = Join-Path $repoRoot $errLog

  Start-Process `
    -FilePath $nodeCommand.Source `
    -ArgumentList $scriptName `
    -WorkingDirectory $repoRoot `
    -RedirectStandardOutput $outPath `
    -RedirectStandardError $errPath `
    -WindowStyle Hidden `
    | Out-Null

  Start-Sleep -Seconds 3

  $started = Get-NodeProcess $pattern | Select-Object -First 1
  if ($started) {
    Write-Host "$name started (PID $($started.ProcessId))."
  } else {
    Write-Host "$name did not stay up. Check $errLog." -ForegroundColor Yellow
  }
}

function Show-Summary() {
  Write-Section 'Summary'
  $database = Get-DatabaseSummary

  $server = Get-NodeProcess 'server\.js' | Select-Object -First 1
  $bot = Get-NodeProcess 'bot\.js' | Select-Object -First 1

  if ($server) {
    Write-Host "Web server: running (PID $($server.ProcessId))"
  } else {
    Write-Host 'Web server: not running' -ForegroundColor Yellow
  }

  if ($bot) {
    Write-Host "Discord bot: running (PID $($bot.ProcessId))"
  } else {
    Write-Host 'Discord bot: not running' -ForegroundColor Yellow
  }

  if (Test-LocalPort 11434) {
    Write-Host 'Ollama: reachable'
  } else {
    Write-Host 'Ollama: not reachable' -ForegroundColor Yellow
  }

  if ($database.Valid) {
    $dbMode = if ($database.IsLocal) { 'local' } else { 'hosted' }
    Write-Host "Database: $dbMode ($($database.Host))"
  } else {
    Write-Host 'Database: DATABASE_URL missing or unreadable' -ForegroundColor Yellow
  }

  try {
    $health = Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:3000/api/health' -TimeoutSec 5
    Write-Host "Site health: $($health.StatusCode) http://127.0.0.1:3000/quiz.html"
  } catch {
    Write-Host 'Site health: request failed' -ForegroundColor Yellow
  }

  Write-Host ''
  Write-Host 'Logs: server.out.log, server.err.log, bot.out.log, bot.err.log'
}

Ensure-PostgresRunning
Ensure-OllamaRunning
Start-NodeService 'Web server' 'server.js' 'server.out.log' 'server.err.log'
Start-NodeService 'Discord bot' 'bot.js' 'bot.out.log' 'bot.err.log'
Show-Summary
