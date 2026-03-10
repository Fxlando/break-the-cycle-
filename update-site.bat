@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
set "GIT_TERMINAL_PROMPT=0"
set "GCM_INTERACTIVE=never"
cls

echo ================================
echo  Updating Break the Cycle Site
echo ================================
echo.

REM Check if git is available
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH.
    echo Closing in 10 seconds...
    timeout /t 10 /nobreak >nul
    exit /b 1
)

REM Check git status before proceeding
git status >nul 2>&1
if errorlevel 1 (
    echo ERROR: This directory is not a valid git repository.
    echo Closing in 10 seconds...
    timeout /t 10 /nobreak >nul
    exit /b 1
)

echo Staging files...
git add .

REM If nothing is staged, there is nothing to deploy.
git diff --cached --quiet
if not errorlevel 1 (
    echo.
    echo No changes detected. Nothing to update.
    echo Closing in 5 seconds...
    timeout /t 5 /nobreak >nul
    exit /b 0
)

for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format ''yyyy-MM-dd HH:mm:ss''"') do set "commit_stamp=%%I"
set "commit_msg=Auto update - !commit_stamp!"

echo.
echo Committing changes with message: "!commit_msg!"
git commit -m "!commit_msg!"

if errorlevel 1 (
    echo.
    echo ERROR: Failed to commit changes.
    echo Closing in 10 seconds...
    timeout /t 10 /nobreak >nul
    exit /b 1
)

echo.
echo Pushing to GitHub (origin/main)...
git push origin main

if errorlevel 1 (
    echo.
    echo ERROR: Failed to push to GitHub.
    echo Check your internet connection and GitHub sign-in.
    echo Closing in 15 seconds...
    timeout /t 15 /nobreak >nul
    exit /b 1
)

echo.
echo ================================
echo  Update Complete
echo ================================
echo.
echo Your changes were pushed successfully.
echo Vercel will deploy automatically.
echo.
echo Review deployment:
echo https://vercel.com/fxlando/break-the-cycle
echo.
echo Closing in 5 seconds...
timeout /t 5 /nobreak >nul
exit /b 0
