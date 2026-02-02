@echo off
echo ================================
echo  Deploying to GitHub Pages
echo ================================
echo.

git add .
echo Files staged for commit...

set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update site

git commit -m "%commit_msg%"
echo Committed changes...

git push origin main
echo.
echo ================================
echo  Deployment Complete!
echo ================================
echo.
echo Your site will be live at:
echo https://fxlando.github.io/breakthecycle
echo.
echo (Updates take 1-2 minutes to appear)
echo.
pause
