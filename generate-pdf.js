// generate-pdf.js
// Script to generate PDF from presentations via HTML

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
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
  console.error(`  node generate-pdf.js --input examples/jsx/visual-showcase.jsx --output ${path.join('examples', config.outputDir, 'visual-showcase.pdf')}`);
  console.error(`  node generate-pdf.js -i examples/jsx/quarterly-report.jsx -o ${path.join('examples', config.outputDir, 'q2-2023-report.pdf')}`);
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
  outputPath = path.join(path.dirname(jsxFilePath), '..', config.outputDir, `${inputFileName}.pdf`);
}

// Create the output directory if it doesn't exist
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate HTML first, then convert to PDF
async function generatePDF() {
  try {
    console.log(`Processing JSX file: ${jsxFilePath}`);
    
    // First, generate HTML
    const htmlOutputPath = outputPath.replace('.pdf', '.html');
    console.log(`Generating intermediate HTML to: ${htmlOutputPath}`);
    
    // Import the HTML renderer
    const htmlRendererPath = path.join(__dirname, 'examples', 'html', 'html-renderer.jsx');
    
    // Check if the HTML renderer exists
    if (!fs.existsSync(htmlRendererPath)) {
      console.error(`HTML renderer not found: ${htmlRendererPath}`);
      process.exit(1);
    }
    
    // Generate the HTML
    const { generateHTML } = require(htmlRendererPath);
    await generateHTML(jsxFilePath, htmlOutputPath);
    console.log('HTML generation completed successfully');
    
    // Now convert HTML to PDF using wkhtmltopdf (must be installed on the system)
    console.log(`Converting HTML to PDF: ${outputPath}`);
    
    // Use wkhtmltopdf command
    const command = `wkhtmltopdf "${htmlOutputPath}" "${outputPath}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error converting to PDF: ${error.message}`);
        console.error('Make sure wkhtmltopdf is installed on your system.');
        console.error('You can download it from: https://wkhtmltopdf.org/downloads.html');
        console.error('Alternatively, you can use the HTML output directly.');
        console.error(`HTML output is available at: ${htmlOutputPath}`);
        process.exit(1);
      }
      
      console.log(`PDF generated successfully: ${outputPath}`);
      
      // Optionally, remove the intermediate HTML file
      // fs.unlinkSync(htmlOutputPath);
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

// Run the PDF generator
generatePDF(); 