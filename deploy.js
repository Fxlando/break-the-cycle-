const fs = require('fs');
const path = require('path');

console.log('\n========================================');
console.log('  DEPLOYING DUAL-MODE QUIZ');
console.log('========================================\n');

const dir = __dirname;
const quizPath = path.join(dir, 'quiz.html');
const dualPath = path.join(dir, 'quiz-dual.html');
const backupPath = path.join(dir, 'quiz-backup-5archetype-old.html');

try {
  // Backup old quiz
  console.log('[1/2] Backing up old quiz.html...');
  fs.copyFileSync(quizPath, backupPath);
  
  // Replace with dual-mode
  console.log('[2/2] Replacing quiz.html with dual-mode version...');
  fs.copyFileSync(dualPath, quizPath);
  
  console.log('\n✓ SUCCESS!\n');
  console.log('- Old quiz backed up to: quiz-backup-5archetype-old.html');
  console.log('- quiz.html is now the DUAL-MODE version with:');
  console.log('  * Career mode (25 questions, 53 career paths)');
  console.log('  * Life mode (25 questions, 53 hobby/passion paths)');
  console.log('  * Both mode (50 questions total)\n');
  console.log('Next steps:');
  console.log('1. Open quiz.html in browser to test');
  console.log('2. Run update-site.bat to deploy to GitHub/Vercel\n');
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
