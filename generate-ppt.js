// generate-ppt.js
// This script takes a JSX file as input and generates a PPT file

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const fs = require('fs');
const path = require('path');
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
  console.error(`  node generate-ppt.js --input examples/jsx/simple-presentation.jsx --output ${path.join('examples', config.outputDir, 'custom.pptx')}`);
  console.error(`  node generate-ppt.js -i examples/jsx/quarterly-report.jsx -o ${path.join('examples', config.outputDir, 'q2-2023-report.pptx')}`);
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

console.log(`Processing JSX file: ${jsxFilePath}`);

// Import and run the JSX file
// The JSX file should export a function named 'generatePresentation'
try {
  const jsxModule = require(jsxFilePath);
  
  if (typeof jsxModule.generatePresentation !== 'function') {
    console.error(`The JSX file must export a function named 'generatePresentation'`);
    process.exit(1);
  }
  
  // Determine if we need to set the output path
  if (args.output) {
    // Create the output directory if it doesn't exist
    const outputDir = path.dirname(args.output);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Call the generatePresentation function with the custom output path
    jsxModule.generatePresentation(args.output);
  } else {
    // Use default output path based on input filename
    const inputFileName = path.basename(jsxFilePath, '.jsx');
    const defaultOutputPath = path.join(path.dirname(jsxFilePath), '..', config.outputDir, `${inputFileName}.pptx`);
    
    // Create the output directory if it doesn't exist
    const outputDir = path.dirname(defaultOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    jsxModule.generatePresentation(defaultOutputPath);
  }
  
  console.log('Presentation generation completed successfully');
} catch (error) {
  console.error('Error processing JSX file:', error);
  process.exit(1);
} 