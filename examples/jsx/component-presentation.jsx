// component-presentation.jsx
// A presentation example using custom components with JSX syntax

const React = require('react');
const { Presentation, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');
const https = require('https');
const config = require('../../config');

// Import our custom components
const {
  TitleSlide,
  ContentSlide,
  BulletList,
  BarChart,
  PieChart,
  TemplateSlide
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

// Sample data
const quarterlyData = [
  { label: "Q1", value: 35, color: "#0066CC" },
  { label: "Q2", value: 45, color: "#33CC33" },
  { label: "Q3", value: 60, color: "#FF9900" },
  { label: "Q4", value: 75, color: "#CC3333" }
];

const productData = [
  { label: "Product A", value: 40, color: "#0066CC" },
  { label: "Product B", value: 35, color: "#33CC33" },
  { label: "Product C", value: 25, color: "#FF9900" }
];

const achievements = [
  "Increased market share by 15%",
  "Launched 2 new product lines",
  "Expanded to 3 new international markets",
  "Reduced production costs by 12%",
  "Improved customer satisfaction rating to 4.7/5"
];

// Function to generate a presentation with custom components
async function generatePresentation() {
  try {
    console.log('Starting PowerPoint generation with custom components...');
    
    // Download a logo image
    console.log('Downloading logo...');
    const logoData = await downloadImage('https://picsum.photos/id/24/200/200');
    console.log('Logo downloaded');
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide */}
        <TitleSlide 
          title="Annual Business Review" 
          subtitle="Using Custom Components" 
          date={new Date().toLocaleDateString()} 
        />
        
        {/* Content Slide with Bullet List */}
        <ContentSlide 
          title="Key Achievements" 
          footer={`Generated on: ${new Date().toLocaleDateString()}`}
        >
          <BulletList 
            items={achievements}
            startY={1.8}
            style={{ fontSize: 24 }}
          />
        </ContentSlide>
        
        {/* Bar Chart Slide */}
        <ContentSlide 
          title="Quarterly Performance" 
          footer="Financial Data - Confidential"
        >
          <BarChart 
            data={quarterlyData}
            title="Revenue Growth by Quarter"
            x={1}
            y={1.8}
            width={8}
            height={3}
          />
        </ContentSlide>
        
        {/* Pie Chart Slide */}
        <ContentSlide 
          title="Product Distribution" 
          footer="Sales Data - Q4 2023"
        >
          <PieChart 
            data={productData}
            title="Revenue by Product Line"
            x={2}
            y={1.8}
            size={3}
          />
        </ContentSlide>
        
        {/* Template Slide with Blue Theme */}
        <TemplateSlide 
          title="Strategic Initiatives" 
          logoData={logoData}
          theme="blue"
        >
          <BulletList 
            items={[
              "Expand digital transformation efforts",
              "Increase investment in R&D",
              "Develop new market entry strategies",
              "Enhance customer experience programs"
            ]}
            startY={1.2}
            style={{ fontSize: 24 }}
          />
        </TemplateSlide>
        
        {/* Template Slide with Green Theme */}
        <TemplateSlide 
          title="Sustainability Goals" 
          logoData={logoData}
          theme="green"
          footer="Environmental Impact Report - 2023"
        >
          <BulletList 
            items={[
              "Reduce carbon footprint by 25% by 2025",
              "Implement 100% recyclable packaging",
              "Source 75% of materials from sustainable suppliers",
              "Achieve zero waste in manufacturing by 2026"
            ]}
            startY={1.2}
            style={{ fontSize: 24 }}
          />
        </TemplateSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = path.join(__dirname, '..', config.outputDir, 'component-presentation.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 