$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

function Stop-NodeService($pattern, $label) {
  $processes = @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
    $_.Name -eq 'node.exe' -and $_.CommandLine -match $pattern
  })

  if (-not $processes.Count) {
    Write-Host "$label is not running."
    return
  }

  foreach ($process in $processes) {
    Stop-Process -Id $process.ProcessId -Force
    Write-Host "$label stopped (PID $($process.ProcessId))."
  }
}

Stop-NodeService 'server\.js' 'Web server'
Stop-NodeService 'bot\.js' 'Discord bot'
