@echo off
echo ================================
echo  Safe Cleanup - Break the Cycle
echo ================================
echo.
echo This will remove:
echo   - new-quiz-structure.txt (planning document)
echo   - cleanup.bat (outdated script)
echo   - FORCE-CLEANUP.bat (outdated script)
echo   - deploy-to-github.bat (duplicate of update-site.bat)
echo   - quiz-backup-old.html (old broken version)
echo.
echo These files are SAFE to delete.
echo.
pause

cd "C:\Users\Anon\Desktop\break the cycle"

echo Removing outdated files...
del /F /Q new-quiz-structure.txt 2>nul
del /F /Q cleanup.bat 2>nul
del /F /Q FORCE-CLEANUP.bat 2>nul
del /F /Q deploy-to-github.bat 2>nul
del /F /Q quiz-backup-old.html 2>nul

echo.
echo ================================
echo  Cleanup Complete!
echo ================================
echo.
echo Removed 5 unnecessary files.
echo.
echo Your working files are safe:
echo   - index.html
echo   - quiz.html (old - needs replacing)
echo   - quiz-new.html (new working version)
echo   - quiz-paths.js
echo   - styles.css
echo   - replace-quiz.bat (use this to swap quiz files)
echo   - update-site.bat (use this to deploy)
echo   - All images
echo.
pause
