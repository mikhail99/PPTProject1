// generate-html.js
// Script to generate HTML from the components

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const path = require('path');
const fs = require('fs');
const config = require('./config');

// Parse command line arguments
function parseArgs() {
  const args = {
    input: null,
    output: null
  };

  // Check for --input and --output flags
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === '--input' || process.argv[i] === '-i') {
      args.input = process.argv[i + 1];
      i++; // Skip the next argument as it's the value
    } else if (process.argv[i] === '--output' || process.argv[i] === '-o') {
      args.output = process.argv[i + 1];
      i++; // Skip the next argument as it's the value
    }
  }

  return args;
}

// Get the arguments
const args = parseArgs();

// Check if input path is provided
if (!args.input) {
  console.error('Please provide an input file path');
  console.error('Examples:');
  console.error(`  node generate-html.js --input examples/jsx/visual-showcase.jsx --output ${path.join('examples', config.outputDir, 'visual-showcase.html')}`);
  console.error(`  node generate-html.js -i examples/jsx/visual-showcase.jsx -o ${path.join('examples', config.outputDir, 'custom.html')}`);
  process.exit(1);
}

// Determine the JSX file path
let jsxFilePath = path.resolve(args.input);

// If the path doesn't have a .jsx extension, add it
if (!jsxFilePath.endsWith('.jsx')) {
  jsxFilePath += '.jsx';
}

// Check if the JSX file exists
if (!fs.existsSync(jsxFilePath)) {
  console.error(`JSX file not found: ${jsxFilePath}`);
  console.error('Make sure the file exists at the specified path');
  process.exit(1);
}

// Determine the output path
let outputPath;
if (args.output) {
  outputPath = path.resolve(args.output);
} else {
  // Use default output path based on input filename
  const inputFileName = path.basename(jsxFilePath, '.jsx');
  outputPath = path.join(path.dirname(jsxFilePath), '..', config.outputDir, `${inputFileName}.html`);
}

// Create the output directory if it doesn't exist
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Import the HTML renderer
const htmlRendererPath = path.join(__dirname, 'examples', 'html', 'html-renderer.jsx');

// Check if the HTML renderer exists
if (!fs.existsSync(htmlRendererPath)) {
  console.error(`HTML renderer not found: ${htmlRendererPath}`);
  process.exit(1);
}

// Generate the HTML
try {
  console.log(`Processing JSX file: ${jsxFilePath}`);
  console.log(`Generating HTML output to: ${outputPath}`);
  
  const { generateHTML } = require(htmlRendererPath);
  generateHTML(jsxFilePath, outputPath);
  
  console.log('HTML generation completed successfully');
} catch (error) {
  console.error('Error generating HTML:', error);
  process.exit(1);
} 