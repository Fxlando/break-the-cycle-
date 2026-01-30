@echo off
echo ===================================
echo FORCE CLEANUP - Break the Cycle
echo ===================================
echo.

cd "C:\Users\Anon\Desktop\break the cycle"

echo Backing up working files...
copy index-new.html index-TEMP.html >nul
copy quiz-FINAL-WORKING.html quiz-TEMP.html >nul

echo Deleting ALL old files...
del /F /Q index.html 2>nul
del /F /Q quiz.html 2>nul
del /F /Q index-new.html 2>nul
del /F /Q quiz-new.html 2>nul
del /F /Q quiz-fixed.html 2>nul
del /F /Q quiz.js 2>nul
del /F /Q quiz-FINAL-WORKING.html 2>nul

echo Creating clean new files...
ren index-TEMP.html index.html
ren quiz-TEMP.html quiz.html

echo.
echo ===================================
echo CLEANUP COMPLETE!
echo ===================================
echo.
echo Your folder now has:
echo   - index.html (NEW clean version)
echo   - quiz.html (WORKING version)
echo   - styles.css
echo   - Images
echo   - README.md
echo.
echo All old files DELETED!
echo.
pause
