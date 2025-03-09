// open-html.js
// Script to open the HTML file in a browser

const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Parse command line arguments
function parseArgs() {
  const args = {
    input: null
  };

  // Check for --input flag
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === '--input' || process.argv[i] === '-i') {
      args.input = process.argv[i + 1];
      i++; // Skip the next argument as it's the value
    }
  }

  return args;
}

// Get the arguments
const args = parseArgs();

// Check if input path is provided
if (!args.input) {
  console.error('Please provide an HTML file path');
  console.error('Examples:');
  console.error('  node open-html.js --input examples/output/visual-showcase.html');
  console.error('  node open-html.js -i examples/output/custom.html');
  process.exit(1);
}

// Resolve the HTML file path
const htmlFilePath = path.resolve(args.input);

// Check if the HTML file exists
if (!fs.existsSync(htmlFilePath)) {
  console.error(`HTML file not found: ${htmlFilePath}`);
  console.error('Make sure you have generated the HTML file first with: node generate-html.js --input <jsx-file> --output <html-file>');
  process.exit(1);
}

// Determine the platform-specific command to open the file
let command;
switch (process.platform) {
  case 'darwin': // macOS
    command = `open "${htmlFilePath}"`;
    break;
  case 'win32': // Windows
    command = `start "" "${htmlFilePath}"`;
    break;
  default: // Linux and others
    command = `xdg-open "${htmlFilePath}"`;
    break;
}

// Open the HTML file in the default browser
console.log(`Opening ${htmlFilePath} in your default browser...`);
exec(command, (error) => {
  if (error) {
    console.error(`Error opening file: ${error.message}`);
    process.exit(1);
  }
  console.log('Browser opened successfully');
}); 