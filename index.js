const React = require('react');
const { Presentation, Slide, Text, Shape, Image, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');

// Function to generate a simple presentation
async function generatePresentation() {
  try {
    console.log('Starting PowerPoint generation...');
    
    // Current date for the presentation
    const currentDate = new Date().toLocaleDateString();
    
    // Sample data for a chart (we'll simulate with shapes)
    const chartData = [
      { label: 'Q1', value: 30 },
      { label: 'Q2', value: 50 },
      { label: 'Q3', value: 80 },
      { label: 'Q4', value: 60 }
    ];
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      React.createElement(Presentation, null, 
        // Title Slide
        React.createElement(Slide, null,
          React.createElement(Text, {
            style: {
              x: 1, y: 1, w: 8, h: 1.5,
              fontSize: 44,
              bold: true,
              align: "center",
              color: "#0066CC"
            }
          }, "My Awesome Presentation"),
          React.createElement(Text, {
            style: {
              x: 1, y: 3, w: 8, h: 1,
              fontSize: 28,
              align: "center",
              color: "#666666"
            }
          }, "Created with react-pptx"),
          React.createElement(Text, {
            style: {
              x: 1, y: 5, w: 8, h: 0.5,
              fontSize: 16,
              align: "center",
              color: "#888888"
            }
          }, `Generated on: ${currentDate}`),
          // Footer with page number
          React.createElement(Text, {
            style: {
              x: 0.5, y: 7, w: 9, h: 0.3,
              fontSize: 10,
              align: "right",
              color: "#888888"
            }
          }, "Page 1")
        ),
        
        // Content Slide
        React.createElement(Slide, null,
          React.createElement(Text, {
            style: {
              x: 0.5, y: 0.5, w: 9, h: 0.8,
              fontSize: 32,
              bold: true,
              align: "left",
              color: "#0066CC"
            }
          }, "Key Points"),
          // Bullet points
          React.createElement(Text, {
            style: {
              x: 1, y: 1.8, w: 8, h: 0.5,
              fontSize: 24,
              bullet: true
            }
          }, "First important point"),
          React.createElement(Text, {
            style: {
              x: 1, y: 2.5, w: 8, h: 0.5,
              fontSize: 24,
              bullet: true
            }
          }, "Second important point"),
          React.createElement(Text, {
            style: {
              x: 1, y: 3.2, w: 8, h: 0.5,
              fontSize: 24,
              bullet: true
            }
          }, "Third important point"),
          // Footer with page number
          React.createElement(Text, {
            style: {
              x: 0.5, y: 7, w: 9, h: 0.3,
              fontSize: 10,
              align: "right",
              color: "#888888"
            }
          }, "Page 2")
        ),
        
        // Chart Slide (simulated with shapes)
        React.createElement(Slide, null,
          React.createElement(Text, {
            style: {
              x: 0.5, y: 0.5, w: 9, h: 0.8,
              fontSize: 32,
              bold: true,
              align: "left",
              color: "#0066CC"
            }
          }, "Quarterly Results"),
          
          // Chart title
          React.createElement(Text, {
            style: {
              x: 1, y: 1.5, w: 8, h: 0.5,
              fontSize: 20,
              align: "center"
            }
          }, "Sales Performance"),
          
          // Chart bars (simulated with shapes)
          ...chartData.map((item, index) => {
            const barHeight = item.value / 20; // Scale the height
            const barX = 2 + index * 1.5;
            
            return [
              // Bar
              React.createElement(Shape, {
                type: "rect",
                style: {
                  x: barX, 
                  y: 5 - barHeight, // Position from bottom
                  w: 1, 
                  h: barHeight,
                  backgroundColor: "#0066CC"
                }
              }),
              // Label
              React.createElement(Text, {
                style: {
                  x: barX, 
                  y: 5.2, 
                  w: 1, 
                  h: 0.3,
                  fontSize: 14,
                  align: "center"
                }
              }, item.label),
              // Value
              React.createElement(Text, {
                style: {
                  x: barX, 
                  y: 4.8 - barHeight, 
                  w: 1, 
                  h: 0.3,
                  fontSize: 12,
                  align: "center"
                }
              }, item.value.toString())
            ];
          }).flat(),
          
          // Footer with page number
          React.createElement(Text, {
            style: {
              x: 0.5, y: 7, w: 9, h: 0.3,
              fontSize: 10,
              align: "right",
              color: "#888888"
            }
          }, "Page 3")
        )
      )
    );
    
    // Write the presentation to a file
    const outputPath = path.join(__dirname, 'output', 'my-presentation.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Run the presentation generator
generatePresentation(); 