@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File ".\scripts\start-public-local.ps1"
