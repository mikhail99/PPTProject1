// grid-layout-example.jsx
// An example demonstrating the GridLayout component

const React = require('react');
const { Presentation, Slide, Text, Shape, Image, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');
const https = require('https');
const config = require('../../config');

// Import our custom components
const {
  TitleSlide,
  ContentSlide,
  GridLayout,
  GridItem
} = require('../../components');

// Function to download image and convert to base64
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks = [];
      response.on('data', (chunk) => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString('base64');
        resolve(`data:image/jpeg;base64,${base64}`);
      });
      response.on('error', (err) => {
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to generate a presentation demonstrating GridLayout
async function generatePresentation() {
  try {
    console.log('Starting PowerPoint generation with GridLayout...');
    
    // Download some images for the examples
    console.log('Downloading images...');
    const images = await Promise.all([
      downloadImage('https://picsum.photos/id/1/300/200'),
      downloadImage('https://picsum.photos/id/10/300/200'),
      downloadImage('https://picsum.photos/id/100/300/200'),
      downloadImage('https://picsum.photos/id/1000/300/200')
    ]);
    console.log('Images downloaded');
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide */}
        <TitleSlide 
          title="GridLayout Component" 
          subtitle="Easily position elements in a grid" 
          date={new Date().toLocaleDateString()} 
        />
        
        {/* Basic Grid Layout Example */}
        <ContentSlide title="Basic Grid Layout (2x2)">
          <GridLayout 
            columns={2}
            startY={1.8}
            width={9}
            height={4}
            columnGap={0.5}
            rowGap={0.5}
          >
            <Shape
              type="rect"
              style={{
                backgroundColor: "#0066CC",
                padding: 0.2
              }}
            />
            <Shape
              type="rect"
              style={{
                backgroundColor: "#33CC33",
                padding: 0.2
              }}
            />
            <Shape
              type="rect"
              style={{
                backgroundColor: "#FF9900",
                padding: 0.2
              }}
            />
            <Shape
              type="rect"
              style={{
                backgroundColor: "#CC3333",
                padding: 0.2
              }}
            />
          </GridLayout>
        </ContentSlide>
        
        {/* Grid Layout with Text */}
        <ContentSlide title="Grid Layout with Text (2x2)">
          <GridLayout 
            columns={2}
            startY={1.8}
            width={9}
            height={4}
            columnGap={0.5}
            rowGap={0.5}
          >
            <Text
              style={{
                fontSize: 24,
                bold: true,
                align: "center",
                verticalAlign: "middle",
                color: "#FFFFFF",
                backgroundColor: "#0066CC"
              }}
            >
              Item 1
            </Text>
            <Text
              style={{
                fontSize: 24,
                bold: true,
                align: "center",
                verticalAlign: "middle",
                color: "#FFFFFF",
                backgroundColor: "#33CC33"
              }}
            >
              Item 2
            </Text>
            <Text
              style={{
                fontSize: 24,
                bold: true,
                align: "center",
                verticalAlign: "middle",
                color: "#FFFFFF",
                backgroundColor: "#FF9900"
              }}
            >
              Item 3
            </Text>
            <Text
              style={{
                fontSize: 24,
                bold: true,
                align: "center",
                verticalAlign: "middle",
                color: "#FFFFFF",
                backgroundColor: "#CC3333"
              }}
            >
              Item 4
            </Text>
          </GridLayout>
        </ContentSlide>
        
        {/* Grid Layout with Images */}
        <ContentSlide title="Grid Layout with Images (2x2)">
          <GridLayout 
            columns={2}
            startY={1.8}
            width={9}
            height={4}
            columnGap={0.5}
            rowGap={0.5}
          >
            {images.map((imageData, index) => (
              <Image
                key={index}
                src={{
                  kind: "data",
                  data: imageData
                }}
              />
            ))}
          </GridLayout>
        </ContentSlide>
        
        {/* Grid Layout with More Columns */}
        <ContentSlide title="Grid Layout with More Columns (3x2)">
          <GridLayout 
            columns={3}
            startY={1.8}
            width={9}
            height={4}
            columnGap={0.3}
            rowGap={0.5}
          >
            {Array(6).fill().map((_, index) => {
              // Define an array of hex colors instead of using HSL
              const colors = [
                "#0066CC", // Blue
                "#33CC33", // Green
                "#FF9900", // Orange
                "#CC3333", // Red
                "#9933CC", // Purple
                "#00CCCC"  // Teal
              ];
              
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: 20,
                    bold: true,
                    align: "center",
                    verticalAlign: "middle",
                    color: "#FFFFFF",
                    backgroundColor: colors[index]
                  }}
                >
                  {`Item ${index + 1}`}
                </Text>
              );
            })}
          </GridLayout>
        </ContentSlide>
        
        {/* Grid Layout with Explicit Positioning */}
        <ContentSlide title="Grid Layout with Explicit Positioning">
          <Text
            style={{
              x: 0.5, y: 1.5, w: 9, h: 0.5,
              fontSize: 16,
              color: "#666666"
            }}
          >
            Using GridItem for explicit positioning and spanning
          </Text>
          
          <GridLayout 
            columns={4}
            startY={2.2}
            width={9}
            height={4}
            columnGap={0.2}
            rowGap={0.2}
            autoFlow={false}
          >
            <GridItem gridColumn={0} gridRow={0} colSpan={2} rowSpan={2}>
              <Shape
                type="rect"
                style={{
                  backgroundColor: "#0066CC",
                  padding: 0.2
                }}
              />
            </GridItem>
            
            <GridItem gridColumn={2} gridRow={0} colSpan={2} rowSpan={1}>
              <Shape
                type="rect"
                style={{
                  backgroundColor: "#33CC33",
                  padding: 0.2
                }}
              />
            </GridItem>
            
            <GridItem gridColumn={2} gridRow={1} colSpan={1} rowSpan={1}>
              <Shape
                type="rect"
                style={{
                  backgroundColor: "#FF9900",
                  padding: 0.2
                }}
              />
            </GridItem>
            
            <GridItem gridColumn={3} gridRow={1} colSpan={1} rowSpan={2}>
              <Shape
                type="rect"
                style={{
                  backgroundColor: "#CC3333",
                  padding: 0.2
                }}
              />
            </GridItem>
            
            <GridItem gridColumn={0} gridRow={2} colSpan={3} rowSpan={1}>
              <Shape
                type="rect"
                style={{
                  backgroundColor: "#9933CC",
                  padding: 0.2
                }}
              />
            </GridItem>
          </GridLayout>
        </ContentSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = path.join(__dirname, '..', config.outputDir, 'grid-layout-example.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 