Copy-Item "quiz.html" "quiz-backup-5archetype-old.html" -Force
Copy-Item "quiz-dual.html" "quiz.html" -Force
Write-Host "✓ Backed up old quiz to quiz-backup-5archetype-old.html"
Write-Host "✓ Replaced quiz.html with dual-mode version"
Write-Host ""
Write-Host "You can now:"
Write-Host "1. Open quiz.html in your browser to test"
Write-Host "2. Run update-site.bat to deploy to GitHub/Vercel"
