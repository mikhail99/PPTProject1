// data-driven-charts.jsx
// An example demonstrating data-driven charts using CSV data

const React = require('react');
const { Presentation, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const { loadCSVData, transformChartData } = require('../../data-loader');

// Import components
const {
  TitleSlide,
  ContentSlide,
  BarChart,
  PieChart
} = require('../../components');

// Function to generate a presentation with data-driven charts
async function generatePresentation(customOutputPath) {
  try {
    console.log('Starting data-driven PowerPoint generation...');
    
    // Load data from CSV file
    console.log('Loading sales data from CSV...');
    const salesDataPath = path.join(__dirname, '..', 'data', 'sales.csv');
    const salesData = await loadCSVData(salesDataPath);
    console.log(`Loaded ${salesData.length} sales data records`);
    
    // Transform data for charts
    const barChartData = transformChartData(salesData, 'quarter', 'revenue', 'color');
    const pieChartData = transformChartData(salesData, 'quarter', 'growth', 'color');
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide */}
        <TitleSlide 
          title="Data-Driven Presentation" 
          subtitle="Using CSV Data Integration" 
          date={new Date().toLocaleDateString()} 
        />
        
        {/* Bar Chart Slide */}
        <ContentSlide title="Quarterly Revenue">
          <BarChart 
            data={barChartData}
            title="Revenue by Quarter"
            x={1}
            y={1.8}
            width={8}
            height={3}
          />
        </ContentSlide>
        
        {/* Pie Chart Slide */}
        <ContentSlide title="Growth Percentages">
          <PieChart 
            data={pieChartData}
            title="Growth Distribution"
            x={3}
            y={1.8}
            size={3}
          />
        </ContentSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = customOutputPath || path.join(__dirname, '..', config.outputDir, 'data-driven-charts.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 