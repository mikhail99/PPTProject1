// project-status.jsx
// A project status update presentation

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

// Sample data for project status
const projectTimeline = [
  {
    date: 'Jan 2024',
    title: 'Project Kickoff',
    description: 'Requirements gathering',
    color: '#0066CC'
  },
  {
    date: 'Feb 2024',
    title: 'Design Phase',
    description: 'Architecture and UI design',
    color: '#33CC33'
  },
  {
    date: 'Mar 2024',
    title: 'Development',
    description: 'Core functionality (Current)',
    color: '#FF9900'
  },
  {
    date: 'Apr 2024',
    title: 'Testing',
    description: 'QA and user acceptance',
    color: '#CC3333'
  },
  {
    date: 'May 2024',
    title: 'Deployment',
    description: 'Production release',
    color: '#9933CC'
  }
];

const statusMetrics = [
  {
    value: '65%',
    label: 'Overall Progress',
    description: 'Based on completed tasks',
    color: '#0066CC',
    icon: { type: 'rect' }
  },
  {
    value: '87%',
    label: 'On Schedule',
    description: 'Tasks completed on time',
    color: '#33CC33',
    icon: { type: 'ellipse' }
  },
  {
    value: '92%',
    label: 'Quality Score',
    description: 'Code review pass rate',
    color: '#FF9900',
    icon: { type: 'roundRect' }
  },
  {
    value: '3',
    label: 'Open Issues',
    description: 'Critical issues to resolve',
    color: '#CC3333',
    icon: { type: 'ellipse' }
  }
];

const teamHeaders = ['Team Member', 'Role', 'Tasks Completed', 'In Progress', 'Status'];

const teamRows = [
  {
    feature: 'John Smith',
    values: ['Project Manager', '12', '2', 'On Track']
  },
  {
    feature: 'Sarah Johnson',
    values: ['Lead Developer', '24', '3', 'On Track']
  },
  {
    feature: 'Michael Chen',
    values: ['UI/UX Designer', '18', '1', 'On Track']
  },
  {
    feature: 'Emily Davis',
    values: ['QA Engineer', '15', '5', 'At Risk']
  },
  {
    feature: 'David Wilson',
    values: ['Backend Developer', '20', '2', 'On Track']
  }
];

const accomplishments = [
  "Completed user authentication module with 2FA support",
  "Finalized database schema and migration scripts",
  "Implemented responsive UI for mobile and tablet devices",
  "Set up CI/CD pipeline for automated testing and deployment",
  "Conducted first round of user testing with key stakeholders"
];

const challenges = [
  "Integration with legacy system requires additional time",
  "Performance bottleneck identified in data processing module",
  "Resource constraint in QA team may impact testing timeline",
  "Third-party API documentation is incomplete"
];

// Function to generate the project status presentation
async function generatePresentation(customOutputPath) {
  try {
    console.log('Generating Project Status Presentation...');
    
    // Download a logo
    console.log('Downloading logo...');
    const logoData = await downloadImage('https://picsum.photos/id/24/200/200');
    console.log('Logo downloaded');
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide */}
        <TitleSlide 
          title="Project Phoenix" 
          subtitle="March 2024 Status Update" 
          date={new Date().toLocaleDateString()}
        />
        
        {/* Project Overview */}
        <TemplateSlide 
          title="Project Overview" 
          logoData={logoData}
          theme="blue"
        >
          <BulletList 
            items={[
              "Objective: Modernize customer portal with enhanced security and mobile support",
              "Timeline: January - May 2024 (5 months)",
              "Budget: $450,000",
              "Team: 8 members across development, design, and QA",
              "Current Phase: Core Development (Sprint 5 of 12)"
            ]}
            startY={1.5}
            style={{ fontSize: 24 }}
          />
        </TemplateSlide>
        
        {/* Timeline */}
        <ContentSlide title="Project Timeline">
          <Timeline 
            events={projectTimeline}
            x={1}
            y={2}
            width={8}
            orientation="horizontal"
            lineColor="#0066CC"
            lineWidth={0.1}
          />
        </ContentSlide>
        
        {/* Status Metrics */}
        <ContentSlide title="Status At A Glance">
          <InfoGraphic 
            items={statusMetrics}
            x={1}
            y={1.5}
            width={8}
            height={4}
            columns={2}
          />
        </ContentSlide>
        
        {/* Team Status */}
        <TemplateSlide 
          title="Team Status" 
          logoData={logoData}
          theme="green"
        >
          <ComparisonTable 
            headers={teamHeaders}
            rows={teamRows}
            x={0.5}
            y={1.5}
            width={9}
            columnColors={['#0066CC', '#33CC33', '#FF9900', '#CC3333']}
          />
        </TemplateSlide>
        
        {/* Accomplishments */}
        <ContentSlide title="Key Accomplishments This Month">
          <BulletList 
            items={accomplishments}
            startY={1.5}
            style={{ fontSize: 24 }}
          />
        </ContentSlide>
        
        {/* Challenges */}
        <ContentSlide title="Challenges & Risks">
          <BulletList 
            items={challenges}
            startY={1.5}
            style={{ fontSize: 24, color: '#CC3333' }}
          />
        </ContentSlide>
        
        {/* Stakeholder Feedback */}
        <ContentSlide title="Stakeholder Feedback">
          <QuoteBlock 
            quote="The team has made impressive progress on the core functionality. The UI improvements are particularly noteworthy and align perfectly with our brand guidelines."
            author="Jennifer Adams"
            source="VP of Customer Experience"
            x={1}
            y={1.8}
            width={8}
            theme="blue"
            style="modern"
          />
        </ContentSlide>
        
        {/* Next Steps */}
        <TemplateSlide 
          title="Next Steps" 
          logoData={logoData}
          theme="purple"
        >
          <BulletList 
            items={[
              "Complete integration with payment gateway (by March 25)",
              "Resolve performance bottleneck in data processing module (by March 30)",
              "Begin comprehensive QA testing cycle (April 1-15)",
              "Prepare user documentation and training materials (by April 10)",
              "Schedule final stakeholder review meeting (April 20)"
            ]}
            startY={1.5}
            style={{ fontSize: 24 }}
          />
        </TemplateSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = customOutputPath || path.join(__dirname, '..', config.outputDir, 'project-status.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 