const fs = require('fs');

let content = fs.readFileSync('quiz.html', 'utf8');

// Split by career and life sections to handle separately
const lines = content.split('\n');
let result = [];
let inCareerQuestion = false;
let inLifeQuestion = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Track which track we're in
  if (line.includes('data-track="career"')) {
    inCareerQuestion = true;
    inLifeQuestion = false;
  } else if (line.includes('data-track="life"')) {
    inLifeQuestion = true;
    inCareerQuestion = false;
  } else if (line.includes('</div>') && line.includes('class="step"')) {
    inCareerQuestion = false;
    inLifeQuestion = false;
  }
  
  // Replace onclick in buttons based on track
  if (line.includes('onclick="nextQuestion(')) {
    if (inCareerQuestion) {
      result.push(line.replace(/onclick="nextQuestion\((\d+)\)"/, 'onclick="nextCareerStep($1)"'));
    } else if (inLifeQuestion) {
      result.push(line.replace(/onclick="nextQuestion\((\d+)\)"/, 'onclick="nextLifeStep($1)"'));
    } else {
      result.push(line);
    }
  } else {
    result.push(line);
  }
}

fs.writeFileSync('quiz.html', result.join('\n'));
console.log('✅ Fixed all button handlers!');
