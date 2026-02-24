const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
let openBraces = 0;
let inComment = false;
let lines = css.split('\n');
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for (let j = 0; j < line.length; j++) {
        if (!inComment && line[j] === '/' && line[j+1] === '*') inComment = true;
        if (inComment && line[j] === '*' && line[j+1] === '/') inComment = false;
        if (!inComment && line[j] === '{') openBraces++;
        if (!inComment && line[j] === '}') {
            openBraces--;
            if (openBraces < 0) {
                console.log(`Extra closing brace found at line ${i+1}`);
                process.exit();
            }
        }
    }
}
if (openBraces > 0) {
    console.log(`${openBraces} unclosed braces found.`);
} else if (openBraces === 0) {
    console.log('Braces matched perfectly.');
}
