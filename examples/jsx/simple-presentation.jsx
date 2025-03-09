// simple-presentation.jsx
// A simple presentation example using JSX syntax

const React = require('react');
const { Presentation, Slide, Text, Shape, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

// Function to generate a simple presentation
async function generatePresentation(customOutputPath) {
  try {
    console.log('Starting PowerPoint generation from JSX file...');
    
    // Current date for the presentation
    const currentDate = new Date().toLocaleDateString();
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide */}
        <Slide>
          <Text 
            style={{
              x: 1, y: 1, w: 8, h: 1.5,
              fontSize: 44,
              bold: true,
              align: "center",
              color: "#0066CC"
            }}
          >
            Simple JSX Presentation
          </Text>
          <Shape
            type="rect"
            style={{
              x: 3, y: 2.5, w: 4, h: 0.2,
              backgroundColor: "#FF0000"
            }}
          />
          <Text
            style={{
              x: 1, y: 3, w: 8, h: 1,
              fontSize: 28,
              align: "center",
              color: "#666666"
            }}
          >
            Created with JSX and react-pptx
          </Text>
          <Text
            style={{
              x: 1, y: 5, w: 8, h: 0.5,
              fontSize: 16,
              align: "center",
              color: "#888888"
            }}
          >
            {`Generated on: ${currentDate}`}
          </Text>
        </Slide>
        
        {/* Content Slide */}
        <Slide>
          <Text
            style={{
              x: 0.5, y: 0.5, w: 9, h: 0.8,
              fontSize: 32,
              bold: true,
              align: "left",
              color: "#0066CC"
            }}
          >
            Key Features
          </Text>
          
          <Text
            style={{
              x: 1, y: 1.8, w: 8, h: 0.5,
              fontSize: 24,
              bullet: true
            }}
          >
            Create presentations with JSX syntax
          </Text>
          
          <Text
            style={{
              x: 1, y: 2.5, w: 8, h: 0.5,
              fontSize: 24,
              bullet: true
            }}
          >
            Organize files in a structured way
          </Text>
          
          <Text
            style={{
              x: 1, y: 3.2, w: 8, h: 0.5,
              fontSize: 24,
              bullet: true
            }}
          >
            Generate PPT files programmatically
          </Text>
          
          <Text
            style={{
              x: 1, y: 3.9, w: 8, h: 0.5,
              fontSize: 24,
              bullet: true
            }}
          >
            Customize with React components
          </Text>
        </Slide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = customOutputPath || path.join(__dirname, '..', config.outputDir, 'simple-presentation.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 