const fs = require('fs');
const path = require('path');

// Get the src directory path
const srcDir = path.resolve(__dirname, '../src');
console.log('Checking imports in:', srcDir);

// Check if App.tsx exists
const appPath = path.join(srcDir, 'App.tsx');
console.log('Checking for App.tsx at:', appPath);
if (fs.existsSync(appPath)) {
  console.log('App.tsx exists!');
} else {
  console.log('App.tsx does not exist!');
}

// List all files in the src directory
console.log('\nListing all files in src directory:');
const files = fs.readdirSync(srcDir);
files.forEach(file => {
  console.log(file);
});

// Read the index.tsx file
const indexPath = path.join(srcDir, 'index.tsx');
if (fs.existsSync(indexPath)) {
  console.log('\nContents of index.tsx:');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  console.log(indexContent);
}

// Check file case sensitivity (for Mac/Windows differences)
console.log('\nChecking for case sensitivity issues:');
const appTsxLower = files.find(file => file.toLowerCase() === 'app.tsx');
if (appTsxLower && appTsxLower !== 'App.tsx') {
  console.log(`Found app.tsx with different case: ${appTsxLower}`);
}