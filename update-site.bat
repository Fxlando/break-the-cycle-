@echo off
setlocal enabledelayedexpansion
cls

echo ================================
echo  Updating Break the Cycle Site
echo ================================
echo.

REM Check if git is available
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    pause
    exit /b 1
)

REM Check git status before proceeding
git status >nul 2>&1
if errorlevel 1 (
    echo ERROR: This directory is not a valid git repository
    pause
    exit /b 1
)

REM Stage all changes
echo Staging files...
git add .

REM Check if there are changes to commit
git diff-index --quiet HEAD --
if errorlevel 1 (
    echo Files staged for commit...
) else (
    echo.
    echo WARNING: No changes detected in working directory
    echo.
    set /p proceed="Continue anyway? (y/n): "
    if /i not "!proceed!"=="y" (
        echo Cancelled.
        pause
        exit /b 0
    )
)

REM Get commit message
echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "!commit_msg!"=="" set commit_msg=Update site - %date% %time%

echo.
echo Committing changes with message: "!commit_msg!"
git commit -m "!commit_msg!"

if errorlevel 1 (
    echo ERROR: Failed to commit changes
    pause
    exit /b 1
)

echo Committed successfully...
echo.
echo Pushing to GitHub (origin/main)...
git push origin main

if errorlevel 1 (
    echo.
    echo ERROR: Failed to push to GitHub
    echo Please check your internet connection and GitHub credentials
    pause
    exit /b 1
)

echo.
echo ================================
echo  Deployment in Progress!
echo ================================
echo.
echo Your changes have been pushed successfully!
echo Vercel will automatically deploy your changes...
echo.
echo Review your deployment:
echo https://vercel.com/fxlando/break-the-cycle
echo.
echo Your site will be live in ~30-60 seconds
echo.
pause
