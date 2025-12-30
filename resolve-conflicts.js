const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

function resolveConflictsInFile(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.json') || filePath.endsWith('.css') || filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('<<<<<<< HEAD')) {
      // Keep only the HEAD version
      const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n[\s\S]*?\r?\n>>>>>>> [a-zA-Z0-9]*\r?\n/g;
      let newContent = content.replace(regex, '$1\n');
      
      // Some conflict markers might not have a newline after them or have different IDs
      const regexGeneric = /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n[\s\S]*?\r?\n>>>>>>> .*/g;
      newContent = newContent.replace(regexGeneric, '$1');

      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Resolved conflicts in ${filePath}`);
      }
    }
  }
}

const rootDir = process.argv[2] || '.';
const files = getAllFiles(rootDir);
files.forEach(resolveConflictsInFile);
