// parse-pptx.js
// A script to parse PPTX files and extract information about slides and their components

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const xml2js = require('xml2js');
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
  console.error('Please provide an input PPTX file path');
  console.error('Examples:');
  console.error(`  node parse-pptx.js --input ${path.join('examples', config.outputDir, 'visual-showcase.pptx')} --output ${path.join('examples', config.analysisDir, 'visual-showcase.json')}`);
  console.error(`  node parse-pptx.js -i ${path.join('examples', config.outputDir, 'quarterly-report.pptx')} -o ${path.join('examples', config.analysisDir, 'quarterly-report.json')}`);
  process.exit(1);
}

// Resolve the PPTX file path
const pptxFilePath = path.resolve(args.input);

// Check if the PPTX file exists
if (!fs.existsSync(pptxFilePath)) {
  console.error(`PPTX file not found: ${pptxFilePath}`);
  console.error('Make sure the file exists at the specified path');
  process.exit(1);
}

// Determine the output path for JSON results
let outputPath;
if (args.output) {
  outputPath = path.resolve(args.output);
} else {
  // Use default output path based on input filename
  const inputFileName = path.basename(pptxFilePath, '.pptx');
  const analysisDir = path.join(path.dirname(pptxFilePath), '..', config.analysisDir);
  
  // Create the analysis directory if it doesn't exist
  if (!fs.existsSync(analysisDir)) {
    fs.mkdirSync(analysisDir, { recursive: true });
  }
  
  outputPath = path.join(analysisDir, `${inputFileName}.json`);
}

// Create the output directory if it doesn't exist
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Parsing PPTX file: ${pptxFilePath}`);
console.log(`Output will be saved to: ${outputPath}`);

// Parse the PPTX file
async function parsePptx(filePath) {
  try {
    // PPTX files are essentially ZIP files with XML content
    const zip = new AdmZip(filePath);
    const zipEntries = zip.getEntries();
    
    // Find and parse presentation.xml
    const presentationEntry = zipEntries.find(entry => 
      entry.entryName === 'ppt/presentation.xml'
    );
    
    if (!presentationEntry) {
      throw new Error('presentation.xml not found in the PPTX file');
    }
    
    // Extract slide references using regex for more reliable parsing
    const presentationXml = presentationEntry.getData().toString('utf8');
    
    const slideIdListMatch = presentationXml.match(/<p:sldIdLst>(.*?)<\/p:sldIdLst>/s);
    if (!slideIdListMatch || !slideIdListMatch[1]) {
      console.warn('No slide references found in presentation.xml');
      return { totalSlides: 0, slides: [] };
    }
    
    const slideIdList = slideIdListMatch[1];
    const slideIdMatches = [...slideIdList.matchAll(/<p:sldId id="(\d+)" r:id="(rId\d+)"/g)];
    
    console.log(`Found ${slideIdMatches.length} slides in the presentation`);
    
    // Parse each slide
    const slides = [];
    
    for (let i = 0; i < slideIdMatches.length; i++) {
      const match = slideIdMatches[i];
      const slideId = match[1];
      const slideRId = match[2];
      const slideNumber = i + 1;
      
      // Find the slide XML file
      const slideEntry = zipEntries.find(entry => 
        entry.entryName === `ppt/slides/slide${slideNumber}.xml`
      );
      
      if (!slideEntry) {
        console.warn(`Slide ${slideNumber} (ID: ${slideId}, rId: ${slideRId}) not found`);
        continue;
      }
      
      // Get the slide XML content
      const slideXml = slideEntry.getData().toString('utf8');
      
      // Extract text content using regex
      const textMatches = [...slideXml.matchAll(/<a:t>(.*?)<\/a:t>/g)];
      const textContent = textMatches.map(match => match[1].trim()).filter(text => text.length > 0);
      
      // Extract shape types
      const shapeMatches = [...slideXml.matchAll(/<p:sp>/g)];
      
      // Extract picture references
      const pictureMatches = [...slideXml.matchAll(/<p:pic>/g)];
      
      // Extract chart references
      const chartMatches = [...slideXml.matchAll(/<c:chart/g)];
      
      // Extract table references
      const tableMatches = [...slideXml.matchAll(/<a:tbl>/g)];
      
      slides.push({
        number: slideNumber,
        id: slideId,
        rId: slideRId,
        elements: {
          text: textContent.length > 0 ? {
            count: textContent.length,
            samples: textContent.slice(0, 5)
          } : null,
          shapes: shapeMatches.length,
          pictures: pictureMatches.length,
          charts: chartMatches.length,
          tables: tableMatches.length
        }
      });
    }
    
    return {
      totalSlides: slideIdMatches.length,
      slides
    };
  } catch (error) {
    console.error('Error parsing PPTX file:', error);
    throw error;
  }
}

// Extract elements from a slide
function extractSlideElements(slide) {
  const elements = [];
  
  try {
    // Check if we have slide XML
    if (!slide) {
      return elements;
    }
    
    // Convert slide object to XML string for regex parsing
    const slideXml = JSON.stringify(slide);
    
    // Extract text elements
    const textMatches = [...slideXml.matchAll(/"t":"([^"]+)"/g)];
    if (textMatches.length > 0) {
      elements.push({
        type: 'text',
        count: textMatches.length,
        samples: textMatches.slice(0, 5).map(match => match[1])
      });
    }
    
    // Extract shape elements
    const shapeMatches = [...slideXml.matchAll(/"type":"shape"/g)];
    if (shapeMatches.length > 0) {
      elements.push({
        type: 'shape',
        count: shapeMatches.length
      });
    }
    
    // Extract picture elements
    const picMatches = [...slideXml.matchAll(/"blip"/g)];
    if (picMatches.length > 0) {
      elements.push({
        type: 'picture',
        count: picMatches.length
      });
    }
    
    // Extract chart elements
    const chartMatches = [...slideXml.matchAll(/"chart"/g)];
    if (chartMatches.length > 0) {
      elements.push({
        type: 'chart',
        count: chartMatches.length
      });
    }
    
    // Extract table elements
    const tableMatches = [...slideXml.matchAll(/"tbl"/g)];
    if (tableMatches.length > 0) {
      elements.push({
        type: 'table',
        count: tableMatches.length
      });
    }
  } catch (error) {
    console.warn('Error extracting slide elements:', error);
  }
  
  return elements;
}

// Convert EMU (English Metric Unit) to pixels
function emuToPixels(emu) {
  return Math.round(emu / 9525);
}

// Run the parser
parsePptx(pptxFilePath)
  .then(result => {
    // Write the result to the output file
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`Analysis completed successfully. Results saved to: ${outputPath}`);
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });