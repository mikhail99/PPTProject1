// quarterly-report.jsx
// A quarterly business report presentation

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
  BarChart,
  PieChart,
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

// Sample data for quarterly report
const quarterlyRevenue = [
  { label: "Q1", value: 1.2, color: "#0066CC" },
  { label: "Q2", value: 1.7, color: "#33CC33" },
  { label: "Q3", value: 2.3, color: "#FF9900" },
  { label: "Q4", value: 2.8, color: "#CC3333" }
];

const marketShareData = [
  { label: "Our Company", value: 35, color: "#0066CC" },
  { label: "Competitor A", value: 28, color: "#33CC33" },
  { label: "Competitor B", value: 22, color: "#FF9900" },
  { label: "Others", value: 15, color: "#CC3333" }
];

const keyMetrics = [
  {
    value: '28%',
    label: 'Revenue Growth',
    description: 'Year-over-year increase',
    color: '#0066CC',
    icon: { type: 'rect' }
  },
  {
    value: '94%',
    label: 'Customer Retention',
    description: 'Renewal rate for existing clients',
    color: '#33CC33',
    icon: { type: 'ellipse' }
  },
  {
    value: '15',
    label: 'New Enterprise Clients',
    description: 'Added in Q4 2023',
    color: '#FF9900',
    icon: { type: 'roundRect' }
  },
  {
    value: '$3.2M',
    label: 'R&D Investment',
    description: 'For product innovation',
    color: '#CC3333',
    icon: { type: 'ellipse' }
  }
];

const productComparisonHeaders = ['Metrics', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'];

const productComparisonRows = [
  {
    feature: 'Revenue (millions)',
    values: ['$1.2M', '$1.7M', '$2.3M', '$2.8M']
  },
  {
    feature: 'New Customers',
    values: ['42', '56', '78', '93']
  },
  {
    feature: 'Customer Satisfaction',
    values: ['85%', '87%', '90%', '94%']
  },
  {
    feature: 'Market Share',
    values: ['22%', '25%', '30%', '35%']
  },
  {
    feature: 'Product Releases',
    values: ['1', '2', '2', '3']
  }
];

const executiveSummary = [
  "Record-breaking Q4 with $2.8M in revenue, up 28% YoY",
  "Increased market share to 35%, solidifying our position as market leader",
  "Launched 3 new product features driving 15% increase in user engagement",
  "Expanded to 5 new international markets in APAC region",
  "Achieved 94% customer retention rate, exceeding target by 4%"
];

// Function to generate the quarterly report presentation
async function generatePresentation(customOutputPath) {
  try {
    console.log('Generating Quarterly Business Report...');
    
    // Download a company logo
    console.log('Downloading logo...');
    const logoData = await downloadImage('https://picsum.photos/id/24/200/200');
    console.log('Logo downloaded');
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide */}
        <TitleSlide 
          title="Q4 2023 Business Report" 
          subtitle="Financial Performance & Strategic Highlights" 
          date={new Date().toLocaleDateString()}
        />
        
        {/* Executive Summary */}
        <TemplateSlide 
          title="Executive Summary" 
          logoData={logoData}
          theme="blue"
        >
          <BulletList 
            items={executiveSummary}
            startY={1.5}
            style={{ fontSize: 24 }}
          />
        </TemplateSlide>
        
        {/* Quarterly Revenue */}
        <ContentSlide title="Quarterly Revenue Performance">
          <BarChart 
            data={quarterlyRevenue}
            title="Revenue by Quarter (in millions $)"
            x={1}
            y={1.8}
            width={8}
            height={3.5}
          />
        </ContentSlide>
        
        {/* Market Share Analysis */}
        <ContentSlide title="Market Share Analysis">
          <PieChart 
            data={marketShareData}
            title="Current Market Distribution"
            x={2.5}
            y={1.8}
            size={3.5}
          />
        </ContentSlide>
        
        {/* Key Performance Metrics */}
        <TemplateSlide 
          title="Key Performance Metrics" 
          logoData={logoData}
          theme="green"
        >
          <InfoGraphic 
            items={keyMetrics}
            x={1}
            y={1.5}
            width={8}
            height={4}
            columns={2}
          />
        </TemplateSlide>
        
        {/* Quarterly Comparison */}
        <ContentSlide title="Quarterly Comparison">
          <ComparisonTable 
            headers={productComparisonHeaders}
            rows={productComparisonRows}
            x={0.5}
            y={1.5}
            width={9}
            columnColors={['#0066CC', '#33CC33', '#FF9900', '#CC3333']}
          />
        </ContentSlide>
        
        {/* CEO Quote */}
        <ContentSlide title="Leadership Perspective">
          <QuoteBlock 
            quote="Our exceptional Q4 results reflect the team's dedication and our strategic investments in product innovation. We're well-positioned for continued growth in 2024."
            author="Jane Smith"
            source="CEO"
            x={1}
            y={1.8}
            width={8}
            theme="blue"
            style="modern"
          />
        </ContentSlide>
        
        {/* Next Steps */}
        <TemplateSlide 
          title="Strategic Priorities for 2024" 
          logoData={logoData}
          theme="purple"
        >
          <BulletList 
            items={[
              "Expand enterprise client base by 40% through targeted sales initiatives",
              "Launch next-generation platform with AI-powered features in Q2",
              "Enter 3 new markets in EMEA region by Q3",
              "Increase R&D investment to $4.5M to accelerate product roadmap",
              "Implement customer success program to achieve 96% retention rate"
            ]}
            startY={1.5}
            style={{ fontSize: 24 }}
          />
        </TemplateSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = customOutputPath || path.join(__dirname, '..', config.outputDir, 'quarterly-report.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 