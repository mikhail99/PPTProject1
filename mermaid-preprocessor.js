// mermaid-preprocessor.js
// A script to preprocess Mermaid diagrams by converting them to images

const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./config');

/**
 * Generate a Mermaid diagram image using the mermaid.ink service
 * @param {string} mermaidCode - The Mermaid diagram code
 * @param {string} theme - The theme to use ('default', 'forest', 'dark', 'neutral')
 * @param {string} outputPath - The path to save the image to
 * @param {Object} options - Additional options for image generation
 * @returns {Promise<string>} - A promise that resolves to the base64-encoded image data
 */
async function generateMermaidImage(mermaidCode, theme = 'default', outputPath = null, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      // Default options
      const defaultOptions = {
        width: 1200,         // Higher resolution for better quality
        backgroundColor: 'white',
        format: 'png'
      };
      
      // Merge with provided options
      const mergedOptions = { ...defaultOptions, ...options };
      
      // Encode the Mermaid code for URL
      const base64Code = Buffer.from(mermaidCode).toString('base64');
      
      // Create the URL for mermaid.ink service with improved parameters
      const url = `https://mermaid.ink/img/${base64Code}?theme=${theme}&width=${mergedOptions.width}&backgroundColor=${mergedOptions.backgroundColor}&format=${mergedOptions.format}`;
      
      console.log(`Generating Mermaid diagram from: ${url}`);
      
      // Download the image
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to generate Mermaid diagram: ${response.statusCode}`));
          return;
        }
        
        const chunks = [];
        response.on('data', (chunk) => {
          chunks.push(chunk);
        });
        
        response.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            
            // If an output path is provided, save the image to disk
            if (outputPath) {
              // Create the directory if it doesn't exist
              const dir = path.dirname(outputPath);
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }
              
              // Make sure the output path has a .png extension
              const pngOutputPath = outputPath.replace(/\.svg$/, '.png');
              
              // Write the image to disk
              fs.writeFileSync(pngOutputPath, buffer);
              console.log(`Saved Mermaid diagram to: ${pngOutputPath}`);
            }
            
            // Convert to base64 for embedding in the presentation
            const base64 = buffer.toString('base64');
            resolve(`data:image/png;base64,${base64}`);
          } catch (error) {
            reject(error);
          }
        });
        
        response.on('error', (err) => {
          reject(err);
        });
      }).on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Process a collection of Mermaid diagrams and generate images for them
 * @param {Array} diagrams - Array of diagram objects with {id, code, theme}
 * @param {string} outputDir - Directory to save the images to
 * @param {Object} options - Additional options for image generation
 * @returns {Promise<Array>} - A promise that resolves to an array of processed diagrams with image data
 */
async function processMermaidDiagrams(diagrams, outputDir = path.join(__dirname, 'examples', 'temp'), options = {}) {
  const processedDiagrams = [];
  
  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log(`Processing ${diagrams.length} Mermaid diagrams...`);
  
  // Process each diagram
  for (let i = 0; i < diagrams.length; i++) {
    const diagram = diagrams[i];
    const { id, code, theme } = diagram;
    
    try {
      // Generate a unique filename with PNG extension
      const filename = `mermaid-${id || i}-${theme || 'default'}.png`;
      const outputPath = path.join(outputDir, filename);
      
      // Determine appropriate options based on diagram type
      const diagramOptions = { ...options };
      
      // Adjust width based on diagram type for better proportions
      if (code.trim().toLowerCase().startsWith('sequencediagram')) {
        diagramOptions.width = options.width || 1000;
      } else if (code.trim().toLowerCase().startsWith('gantt')) {
        diagramOptions.width = options.width || 1400;
      } else if (code.trim().toLowerCase().startsWith('classdiagram')) {
        diagramOptions.width = options.width || 1200;
      }
      
      // Generate the image
      console.log(`Generating diagram ${i + 1}/${diagrams.length}: ${filename}`);
      const imageData = await generateMermaidImage(code, theme, outputPath, diagramOptions);
      
      // Add the processed diagram to the array
      processedDiagrams.push({
        ...diagram,
        imageData,
        imagePath: outputPath
      });
    } catch (error) {
      console.error(`Error processing diagram ${i + 1}/${diagrams.length}:`, error);
      // Add the diagram without image data
      processedDiagrams.push({
        ...diagram,
        error: error.message
      });
    }
  }
  
  console.log(`Processed ${processedDiagrams.length} Mermaid diagrams`);
  return processedDiagrams;
}

// Export the functions
module.exports = {
  generateMermaidImage,
  processMermaidDiagrams
}; 