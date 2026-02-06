@echo off
echo Backing up old quiz.html to quiz-backup-old.html...
copy /Y quiz.html quiz-backup-old.html

echo Replacing quiz.html with quiz-new.html...
copy /Y quiz-new.html quiz.html

echo Done! Old quiz backed up, new quiz is live.
pause
