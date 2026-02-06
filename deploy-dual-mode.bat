@echo off
echo.
echo ========================================
echo   DEPLOYING DUAL-MODE QUIZ
echo ========================================
echo.

REM Backup old quiz
echo [1/2] Backing up old quiz.html...
copy /Y quiz.html quiz-backup-5archetype-old.html > nul

REM Replace with dual-mode
echo [2/2] Replacing quiz.html with dual-mode version...
copy /Y quiz-dual.html quiz.html > nul

echo.
echo ✓ SUCCESS!
echo.
echo - Old quiz backed up to: quiz-backup-5archetype-old.html
echo - quiz.html is now the DUAL-MODE version with:
echo   * Career mode (25 questions, 53 career paths)
echo   * Life mode (25 questions, 53 hobby/passion paths)
echo   * Both mode (50 questions total)
echo.
echo Next steps:
echo 1. Open quiz.html in browser to test
echo 2. Run update-site.bat to deploy to GitHub/Vercel
echo.
pause

