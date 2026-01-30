@echo off
echo Cleaning up old files...

cd "C:\Users\Anon\Desktop\break the cycle"

REM Delete old broken files
del quiz.html
del quiz-new.html
del quiz-fixed.html
del quiz.js
del index.html

REM Rename working files to proper names
ren index-new.html index.html
ren quiz-FINAL-WORKING.html quiz.html

echo Cleanup complete!
echo.
echo Working files:
echo - index.html (homepage)
echo - quiz.html (working quiz)
echo - styles.css
echo - images
echo.
pause
