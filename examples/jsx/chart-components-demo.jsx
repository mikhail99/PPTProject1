// chart-components-demo.jsx
// A demonstration of the React-PPTX chart components

const React = require('react');
const { Presentation, Slide, Text, Shape, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

// Import our custom components
const {
  TitleSlide,
  ContentSlide,
  PieChart,
  DoughnutChart,
  BarChart,
  ColumnChart
} = require('../../components');

// Sample data for different chart types
const pieData = [
  { name: 'Category 1', value: 40, color: '4472C4' },
  { name: 'Category 2', value: 20, color: 'ED7D31' },
  { name: 'Category 3', value: 30, color: 'A5A5A5' },
  { name: 'Category 4', value: 10, color: 'FFC000' },
];

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

// Function to generate a presentation with chart components
async function generatePresentation(customOutputPath) {
  try {
    console.log('Starting PowerPoint generation with chart components...');
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide */}
        <TitleSlide 
          title="Chart Components Demo" 
          subtitle="Using React-PPTX Chart Components" 
          date={new Date().toLocaleDateString()} 
        />
        
        {/* Pie Chart Slide */}
        <ContentSlide title="Pie Charts">
          <PieChart 
            data={pieData}
            title="Sales by Category"
            x={1}
            y={1.5}
            width={3.5}
            height={3.5}
            showPercent={true}
          />
          
          <DoughnutChart 
            data={pieData}
            title="Market Share"
            x={5.5}
            y={1.5}
            width={3.5}
            height={3.5}
            showPercent={true}
            holeSize={50}
          />
        </ContentSlide>
        
        {/* Bar Chart Slide */}
        <ContentSlide title="Bar Charts">
          <BarChart 
            data={categoryData}
            title="Quarterly Sales (Bar)"
            x={1}
            y={1.5}
            width={3.5}
            height={3.5}
            catAxisTitle="Month"
            valAxisTitle="Sales ($K)"
          />
          
          <ColumnChart 
            data={categoryData}
            title="Quarterly Sales (Column)"
            x={5.5}
            y={1.5}
            width={3.5}
            height={3.5}
            catAxisTitle="Month"
            valAxisTitle="Sales ($K)"
          />
        </ContentSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = customOutputPath || path.join(config.outputPath, 'chart-components-demo.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 