@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File ".\scripts\stop-local.ps1"
