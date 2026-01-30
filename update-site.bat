@echo off
echo Updating website...

echo Adding changes...
git add .

echo Committing changes...
git commit -m "Updated site - %date% %time%"

echo Pushing to GitHub...
git push

echo.
echo Done! Netlify will auto-deploy in ~30 seconds.
echo Check your Netlify dashboard to see the deployment.
pause
