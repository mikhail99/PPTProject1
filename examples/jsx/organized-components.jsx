// organized-components.jsx
// An example demonstrating the organized component structure

const React = require('react');
const { Presentation, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');
const https = require('https');
const config = require('../../config');

// Import components from their organized structure
// You can import everything from the main index
const {
  // Slide Templates
  TitleSlide,
  ContentSlide,
  TemplateSlide,
  
  // Layouts
  GridLayout,
  GridItem,
  
  // Elements
  BulletList,
  BarChart,
  PieChart
} = require('../../components');

// Alternatively, you could import from specific subdirectories:
// const { TitleSlide, ContentSlide } = require('../../components/slides');
// const { GridLayout } = require('../../components/layouts');
// const { BulletList } = require('../../components/elements');

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
const salesData = [
  { label: "Q1", value: 30, color: "#0066CC" },
  { label: "Q2", value: 50, color: "#33CC33" },
  { label: "Q3", value: 80, color: "#FF9900" },
  { label: "Q4", value: 60, color: "#CC3333" }
];

const marketShareData = [
  { label: "Product A", value: 35, color: "#0066CC" },
  { label: "Product B", value: 42, color: "#33CC33" },
  { label: "Product C", value: 23, color: "#FF9900" }
];

// Function to generate a presentation with organized components
async function generatePresentation() {
  try {
    console.log('Starting PowerPoint generation with organized components...');
    
    // Download a logo image
    console.log('Downloading logo...');
    const logoData = await downloadImage('https://picsum.photos/id/24/200/200');
    console.log('Logo downloaded');
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Using a Slide Template component */}
        <TitleSlide 
          title="Organized Components" 
          subtitle="Using a structured component library" 
          date={new Date().toLocaleDateString()} 
        />
        
        {/* Using a Slide Template with an Element component */}
        <ContentSlide title="Slide Templates + Elements">
          <BulletList 
            items={[
              "Components are organized by type",
              "Slide Templates: TitleSlide, ContentSlide, TemplateSlide",
              "Layouts: GridLayout, GridItem",
              "Elements: BulletList, BarChart, PieChart"
            ]}
            startY={1.8}
            style={{ fontSize: 24 }}
          />
        </ContentSlide>
        
        {/* Using a Layout component with Element components */}
        <ContentSlide title="Layouts + Elements">
          <GridLayout 
            columns={2}
            startY={1.8}
            width={9}
            height={4}
            columnGap={0.5}
            rowGap={0.5}
          >
            <BarChart 
              data={salesData}
              title="Quarterly Sales"
              height={3}
            />
            <PieChart 
              data={marketShareData}
              title="Market Share"
              size={3}
            />
          </GridLayout>
        </ContentSlide>
        
        {/* Using a Template component with a Layout and Elements */}
        <TemplateSlide 
          title="Combining All Component Types" 
          logoData={logoData}
          theme="blue"
        >
          <GridLayout 
            columns={2}
            startY={1.2}
            width={9}
            height={4}
            columnGap={0.5}
            rowGap={0.5}
          >
            <BulletList 
              items={[
                "Slide Templates for consistent slide structure",
                "Layouts for positioning elements",
                "Elements for specific content types"
              ]}
              startY={0}
              style={{ fontSize: 20 }}
            />
            <BarChart 
              data={salesData.slice(0, 3)}
              title="Sales Preview"
              height={3}
            />
          </GridLayout>
        </TemplateSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = path.join(__dirname, '..', config.outputDir, 'organized-components.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 