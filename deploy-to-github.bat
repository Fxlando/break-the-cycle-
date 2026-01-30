@echo off
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Committing files...
git commit -m "Initial commit - Break the Cycle quiz site"

echo Adding remote repository...
git remote add origin https://github.com/Fxlando/break-the-cycle-.git

echo Setting main branch...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo Done! Your code is now on GitHub.
echo Now go to app.netlify.com to deploy!
pause
