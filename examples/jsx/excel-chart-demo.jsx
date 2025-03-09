// excel-chart-demo.jsx
// A demonstration of the Excel-based chart components

const React = require('react');
const { Presentation, Slide, Text, Shape, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const os = require('os');

// Import our custom components
const {
  TitleSlide,
  ContentSlide,
  BarChart,
  ColumnChart,
  ExcelBarChart,
  ExcelColumnChart
} = require('../../components');

// Sample data for different chart types
const categoryData = [
  {
    name: 'Q1 2023',
    labels: ['Jan', 'Feb', 'Mar'],
    values: [10, 20, 30],
    color: '4472C4',
  },
  {
    name: 'Q1 2022',
    labels: ['Jan', 'Feb', 'Mar'],
    values: [8, 15, 25],
    color: 'ED7D31',
  },
];

// Function to generate a presentation with Excel chart components
async function generatePresentation(customOutputPath) {
  try {
    console.log('Starting PowerPoint generation with Excel chart components...');
    
    // Detect platform
    const isMacOS = os.platform() === 'darwin';
    console.log(`Running on ${isMacOS ? 'macOS' : 'non-macOS'} platform`);
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide */}
        <TitleSlide 
          title="Excel Chart Components Demo" 
          subtitle="Using Native Excel Charts in PowerPoint" 
          date={new Date().toLocaleDateString()} 
        />
        
        {/* Platform Note Slide */}
        <ContentSlide title="Cross-Platform Compatibility Note">
          <Text
            style={{
              x: 1, y: 1.8, w: 8, h: 0.5,
              fontSize: 20
            }}
          >
            {`Current Platform: ${isMacOS ? 'macOS' : 'Windows/Linux'}`}
          </Text>
          
          <Text
            style={{
              x: 1, y: 2.5, w: 8, h: 2,
              fontSize: 16
            }}
          >
            {isMacOS ? 
              "On macOS, Excel charts may not render correctly in PowerPoint. The ExcelBarChart component automatically detects macOS and uses standard charts as a fallback to ensure compatibility." :
              "On Windows/Linux, Excel charts should render correctly in PowerPoint, providing enhanced compatibility with Microsoft Office."}
          </Text>
          
          <Text
            style={{
              x: 1, y: 4.5, w: 8, h: 1,
              fontSize: 16,
              italic: true
            }}
          >
            Note: The charts in this presentation will use the appropriate rendering method for your platform.
          </Text>
        </ContentSlide>
        
        {/* Comparison Slide - Regular vs Excel Bar Charts */}
        <ContentSlide title="Bar Chart Comparison">
          <Text
            style={{
              x: 1, y: 1.5, w: 3.5, h: 0.5,
              fontSize: 16,
              bold: true,
              align: "center"
            }}
          >
            Standard Bar Chart
          </Text>
          
          <BarChart 
            data={categoryData}
            title="Quarterly Sales"
            x={1}
            y={2}
            width={3.5}
            height={3.5}
            catAxisTitle="Month"
            valAxisTitle="Sales ($K)"
          />
          
          <Text
            style={{
              x: 5.5, y: 1.5, w: 3.5, h: 0.5,
              fontSize: 16,
              bold: true,
              align: "center"
            }}
          >
            {isMacOS ? "Excel-Based Bar Chart (Fallback Mode)" : "Excel-Based Bar Chart"}
          </Text>
          
          <ExcelBarChart 
            data={categoryData}
            title="Quarterly Sales"
            x={5.5}
            y={2}
            width={3.5}
            height={3.5}
            catAxisTitle="Month"
            valAxisTitle="Sales ($K)"
          />
        </ContentSlide>
        
        {/* Comparison Slide - Regular vs Excel Column Charts */}
        <ContentSlide title="Column Chart Comparison">
          <Text
            style={{
              x: 1, y: 1.5, w: 3.5, h: 0.5,
              fontSize: 16,
              bold: true,
              align: "center"
            }}
          >
            Standard Column Chart
          </Text>
          
          <ColumnChart 
            data={categoryData}
            title="Quarterly Sales"
            x={1}
            y={2}
            width={3.5}
            height={3.5}
            catAxisTitle="Month"
            valAxisTitle="Sales ($K)"
          />
          
          <Text
            style={{
              x: 5.5, y: 1.5, w: 3.5, h: 0.5,
              fontSize: 16,
              bold: true,
              align: "center"
            }}
          >
            {isMacOS ? "Excel-Based Column Chart (Fallback Mode)" : "Excel-Based Column Chart"}
          </Text>
          
          <ExcelColumnChart 
            data={categoryData}
            title="Quarterly Sales"
            x={5.5}
            y={2}
            width={3.5}
            height={3.5}
            catAxisTitle="Month"
            valAxisTitle="Sales ($K)"
          />
        </ContentSlide>
        
        {/* Benefits Slide */}
        <ContentSlide title="Benefits of Excel-Based Charts">
          <Text
            style={{
              x: 1, y: 1.8, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Better compatibility with Microsoft Office (Windows)
          </Text>
          
          <Text
            style={{
              x: 1, y: 2.5, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Native Excel formatting and styling options
          </Text>
          
          <Text
            style={{
              x: 1, y: 3.2, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Improved data handling for large datasets
          </Text>
          
          <Text
            style={{
              x: 1, y: 3.9, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Better performance for complex charts
          </Text>
          
          <Text
            style={{
              x: 1, y: 4.6, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Maintains HTML generation capability
          </Text>
        </ContentSlide>
        
        {/* Cross-Platform Strategy Slide */}
        <ContentSlide title="Cross-Platform Strategy">
          <Text
            style={{
              x: 1, y: 1.8, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Automatic platform detection (Windows, macOS, Linux)
          </Text>
          
          <Text
            style={{
              x: 1, y: 2.5, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Intelligent fallback to standard charts on macOS
          </Text>
          
          <Text
            style={{
              x: 1, y: 3.2, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Manual override with forceFallback prop when needed
          </Text>
          
          <Text
            style={{
              x: 1, y: 3.9, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Consistent API across all platforms
          </Text>
          
          <Text
            style={{
              x: 1, y: 4.6, w: 8, h: 0.5,
              fontSize: 20,
              bullet: true
            }}
          >
            Transparent operation with console logging
          </Text>
        </ContentSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = customOutputPath || path.join(config.outputPath, 'excel-chart-demo.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 