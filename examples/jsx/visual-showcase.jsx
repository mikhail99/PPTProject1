// visual-showcase.jsx
// An example demonstrating the visually challenging components

const React = require('react');
const { Presentation, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');
const https = require('https');
const config = require('../../config');

// Import components from their organized structure
const {
  // Slide Templates
  TitleSlide,
  ContentSlide,
  TemplateSlide,
  
  // Layouts
  GridLayout,
  GridItem,
  
  // Elements
  Timeline,
  InfoGraphic,
  ComparisonTable,
  QuoteBlock
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

// Sample data for the components
const timelineEvents = [
  { date: 'Jan 2022', title: 'Project Start', description: 'Initial planning phase', color: '#0066CC' },
  { date: 'Mar 2022', title: 'Design Phase', description: 'UI/UX design completed', color: '#33CC33' },
  { date: 'Jun 2022', title: 'Development', description: 'Core features implemented', color: '#FF9900' },
  { date: 'Sep 2022', title: 'Testing', description: 'QA and user testing', color: '#CC3333' },
  { date: 'Dec 2022', title: 'Launch', description: 'Product release', color: '#9933CC' }
];

const infographicItems = [
  { value: '85%', label: 'User Satisfaction', description: 'Based on post-launch surveys', color: '#0066CC', icon: { type: 'ellipse' } },
  { value: '2.5x', label: 'Productivity Increase', description: 'Compared to previous solution', color: '#33CC33', icon: { type: 'rect' } },
  { value: '40%', label: 'Cost Reduction', description: 'In operational expenses', color: '#FF9900', icon: { type: 'roundRect' } },
  { value: '24/7', label: 'Support Coverage', description: 'Global team availability', color: '#CC3333', icon: { type: 'ellipse' } }
];

const comparisonHeaders = ['Features', 'Our Product', 'Competitor A', 'Competitor B'];
const comparisonRows = [
  { feature: 'Cloud Integration', values: [true, true, false] },
  { feature: 'Mobile Support', values: [true, false, true] },
  { feature: 'API Access', values: [true, false, false] },
  { feature: 'Custom Reports', values: [true, true, false] },
  { feature: 'Data Encryption', values: [true, true, true] },
  { feature: 'Price', values: ['$99/mo', '$149/mo', '$79/mo'] }
];

const quotes = [
  { 
    quote: 'This product has transformed how our team collaborates on projects.',
    author: 'Jane Smith',
    source: 'ABC Corporation',
    theme: 'blue',
    style: 'modern'
  },
  {
    quote: "The most intuitive interface we've ever used for project management.",
    author: 'John Davis',
    source: 'XYZ Enterprises',
    theme: 'green',
    style: 'classic'
  },
  {
    quote: 'Increased our team productivity by 40% in the first month.',
    author: 'Sarah Johnson',
    source: 'Tech Innovators',
    theme: 'purple',
    style: 'minimal'
  }
];

// Function to generate a presentation with visually challenging components
async function generatePresentation() {
  try {
    console.log('Starting PowerPoint generation with visually challenging components...');
    
    // Download a logo image
    console.log('Downloading logo...');
    const logoData = await downloadImage('https://fastly.picsum.photos/id/24/200/200.jpg?hmac=oCL7VXkJ8V2Z5tJQT8cL3-1DXiIvyM1JnqTIkr-bYVI');
    console.log('Logo downloaded');
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title slide */}
        <TitleSlide 
          title="Visual Components Showcase" 
          subtitle="Demonstrating the power of component-based presentations" 
          date={new Date().toLocaleDateString()} 
        />
        
        {/* Timeline slide */}
        <ContentSlide title="Project Timeline">
          <Timeline 
            events={timelineEvents}
            x={2.5}
            y={3}
            width={6}
            orientation="horizontal"
            lineColor="#0066CC"
            lineWidth={0.1}
          />
        </ContentSlide>
        
        {/* InfoGraphic slide */}
        <ContentSlide title="Key Performance Indicators">
          <InfoGraphic 
            items={infographicItems}
            x={1}
            y={1.8}
            width={8}
            height={4}
            columns={2}
          />
        </ContentSlide>
        
        {/* Comparison Table slide */}
        <ContentSlide title="Feature Comparison">
          <ComparisonTable 
            headers={comparisonHeaders}
            rows={comparisonRows}
            x={1}
            y={1.8}
            width={8}
            columnColors={['#0066CC', '#33CC33', '#FF9900']}
          />
        </ContentSlide>
        
        {/* Quote slides */}
        <ContentSlide title="Customer Testimonials">
          <GridLayout 
            columns={1}
            startY={1.8}
            width={9}
            height={4}
            rowGap={0.5}
          >
            <QuoteBlock 
              quote={quotes[0].quote}
              author={quotes[0].author}
              source={quotes[0].source}
              theme={quotes[0].theme}
              style={quotes[0].style}
              width={8}
            />
            <QuoteBlock 
              quote={quotes[1].quote}
              author={quotes[1].author}
              source={quotes[1].source}
              theme={quotes[1].theme}
              style={quotes[1].style}
              width={8}
            />
          </GridLayout>
        </ContentSlide>
        
        {/* Combined components slide */}
        <TemplateSlide 
          title="Combined Components" 
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
            <GridItem column={1} row={1}>
              <Timeline 
                events={timelineEvents.slice(0, 3)}
                x={1}
                y={1}
                width={3}
                orientation="vertical"
                lineColor="#0066CC"
                lineWidth={0.1}
              />
            </GridItem>
            <GridItem column={2} row={1} rowSpan={2}>
              <InfoGraphic 
                items={infographicItems.slice(0, 2)}
                x={0}
                y={0}
                width={4}
                height={4}
                columns={1}
              />
            </GridItem>
            <GridItem column={1} row={2}>
              <QuoteBlock 
                quote={quotes[2].quote}
                author={quotes[2].author}
                source={quotes[2].source}
                theme={quotes[2].theme}
                style={quotes[2].style}
                x={0}
                y={0}
                width={4}
              />
            </GridItem>
          </GridLayout>
        </TemplateSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = path.join(__dirname, '..', config.outputDir, 'visual-showcase.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 