// mermaid-example.jsx
// An example demonstrating the use of Mermaid diagrams in presentations

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
  TemplateSlide,
  GridLayout,
  BulletList,
  MermaidDiagram
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

// Sample Mermaid diagram codes
const flowchartCode = `
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
`;

const sequenceDiagramCode = `
sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request Data
    System->>Database: Query Data
    Database-->>System: Return Results
    System-->>User: Display Results
`;

const classDiagramCode = `
classDiagram
    class Product {
        +String name
        +Float price
        +Int quantity
        +addToCart()
    }
    
    class ShoppingCart {
        +List<Product> items
        +Float total
        +checkout()
    }
    
    Product --> ShoppingCart
`;

const ganttChartCode = `
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    
    section Planning
    Requirements    :a1, 2023-01-01, 30d
    Design          :a2, after a1, 20d
    
    section Development
    Implementation  :a3, after a2, 60d
    Testing         :a4, after a3, 15d
    
    section Deployment
    Release         :a5, after a4, 5d
`;

// Function to generate a presentation with Mermaid diagrams
async function generatePresentation(customOutputPath) {
  try {
    console.log('Starting PowerPoint generation with Mermaid diagrams...');
    
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
          title="Mermaid Diagrams in PowerPoint" 
          subtitle="Using Mermaid to create dynamic diagrams in presentations" 
          date={new Date().toLocaleDateString()} 
        />
        
        {/* Introduction Slide */}
        <ContentSlide title="What is Mermaid?">
          <BulletList 
            items={[
              "Mermaid is a JavaScript-based diagramming and charting tool",
              "It renders Markdown-inspired text definitions to create diagrams",
              "Supports flowcharts, sequence diagrams, class diagrams, and more",
              "Perfect for technical documentation and presentations",
              "Now integrated into our PowerPoint generator!"
            ]}
            startY={1.8}
            style={{ fontSize: 24 }}
          />
        </ContentSlide>
        
        {/* Flowchart Example */}
        <ContentSlide title="Flowchart Example">
          <MermaidDiagram 
            code={flowchartCode}
            x={1}
            y={1.8}
            width={8}
            height={4}
            theme="default"
          />
        </ContentSlide>
        
        {/* Sequence Diagram Example */}
        <ContentSlide title="Sequence Diagram Example">
          <MermaidDiagram 
            code={sequenceDiagramCode}
            x={1}
            y={1.8}
            width={8}
            height={4}
            theme="forest"
          />
        </ContentSlide>
        
        {/* Class Diagram Example */}
        <ContentSlide title="Class Diagram Example">
          <MermaidDiagram 
            code={classDiagramCode}
            x={1}
            y={1.8}
            width={8}
            height={4}
            theme="dark"
          />
        </ContentSlide>
        
        {/* Gantt Chart Example */}
        <ContentSlide title="Gantt Chart Example">
          <MermaidDiagram 
            code={ganttChartCode}
            x={1}
            y={1.8}
            width={8}
            height={4}
            theme="neutral"
          />
        </ContentSlide>
        
        {/* Multiple Diagrams in Grid Layout */}
        <TemplateSlide 
          title="Multiple Diagrams in Grid Layout" 
          logoData={logoData}
          theme="blue"
        >
          <GridLayout 
            columns={2}
            startY={1.2}
            width={9}
            height={5}
            columnGap={0.5}
            rowGap={0.5}
          >
            <MermaidDiagram 
              code={flowchartCode}
              width={4}
              height={2}
              theme="default"
            />
            <MermaidDiagram 
              code={sequenceDiagramCode}
              width={4}
              height={2}
              theme="forest"
            />
            <MermaidDiagram 
              code={classDiagramCode}
              width={4}
              height={2}
              theme="dark"
            />
            <MermaidDiagram 
              code={ganttChartCode}
              width={4}
              height={2}
              theme="neutral"
            />
          </GridLayout>
        </TemplateSlide>
        
        {/* Conclusion Slide */}
        <ContentSlide title="Benefits of Mermaid Diagrams">
          <BulletList 
            items={[
              "Create diagrams programmatically without external tools",
              "Maintain diagrams as code for version control",
              "Easily update and regenerate diagrams",
              "Consistent styling across all presentations",
              "Support for multiple diagram types and themes"
            ]}
            startY={1.8}
            style={{ fontSize: 24 }}
          />
        </ContentSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = customOutputPath || path.join(__dirname, '..', config.outputDir, 'mermaid-example.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 