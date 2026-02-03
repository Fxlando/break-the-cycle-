@echo off
echo ================================
echo  Updating Break the Cycle Site
echo ================================
echo.

git add .
echo Files staged for commit...

set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update site - %date% %time%

git commit -m "%commit_msg%"
echo Committed changes...

git push origin main
echo.
echo ================================
echo  Deployment in Progress!
echo ================================
echo.
echo Your changes are being deployed to Vercel...
echo Check https://vercel.com/fxlando/breakthecycle
echo.
echo Site will be live in ~30 seconds
echo.
pause
