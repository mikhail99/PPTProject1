// product-launch.jsx
// A product launch presentation

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

// Sample data for product launch
const launchTimeline = [
  {
    date: 'March 2024',
    title: 'Beta Release',
    description: 'Limited access to key customers',
    color: '#0066CC'
  },
  {
    date: 'April 2024',
    title: 'Marketing Campaign',
    description: 'Social media and PR launch',
    color: '#33CC33'
  },
  {
    date: 'May 2024',
    title: 'Official Launch',
    description: 'Public availability and events',
    color: '#FF9900'
  },
  {
    date: 'June 2024',
    title: 'Feature Update',
    description: 'First major feature expansion',
    color: '#CC3333'
  },
  {
    date: 'August 2024',
    title: 'Enterprise Edition',
    description: 'Launch of enterprise features',
    color: '#9933CC'
  }
];

const productFeatures = [
  {
    value: 'AI',
    label: 'Smart Assistant',
    description: 'Powered by advanced machine learning',
    color: '#0066CC',
    icon: { type: 'rect' }
  },
  {
    value: '5x',
    label: 'Performance',
    description: 'Faster than previous version',
    color: '#33CC33',
    icon: { type: 'ellipse' }
  },
  {
    value: '99.9%',
    label: 'Uptime',
    description: 'Enterprise-grade reliability',
    color: '#FF9900',
    icon: { type: 'roundRect' }
  },
  {
    value: '256-bit',
    label: 'Encryption',
    description: 'Bank-level security standards',
    color: '#CC3333',
    icon: { type: 'ellipse' }
  }
];

const pricingHeaders = ['Features', 'Free Tier', 'Professional', 'Enterprise'];

const pricingRows = [
  {
    feature: 'Price',
    values: ['$0/month', '$29/month', '$99/month']
  },
  {
    feature: 'Users',
    values: ['1', '10', 'Unlimited']
  },
  {
    feature: 'Storage',
    values: ['5 GB', '100 GB', '1 TB']
  },
  {
    feature: 'AI Features',
    values: [false, true, true]
  },
  {
    feature: 'Priority Support',
    values: [false, false, true]
  },
  {
    feature: 'Custom Integrations',
    values: [false, false, true]
  }
];

const productHighlights = [
  "Revolutionary AI-powered workflow automation",
  "Intuitive interface with 60% fewer clicks than competitors",
  "Cross-platform compatibility (Web, iOS, Android, Windows, Mac)",
  "Real-time collaboration with unlimited team members",
  "Enterprise-grade security with SOC 2 and GDPR compliance"
];

const customerTestimonials = [
  {
    quote: "This product has completely transformed how our team collaborates. We've seen a 40% increase in productivity since implementation.",
    author: "Sarah Johnson",
    source: "CTO, TechInnovate Inc.",
    theme: "blue",
    style: "modern"
  },
  {
    quote: "The AI features are genuinely impressive. It's like having a digital assistant that actually understands what you need.",
    author: "Michael Chen",
    source: "Product Manager, FutureSoft",
    theme: "green",
    style: "classic"
  }
];

// Function to generate the product launch presentation
async function generatePresentation(customOutputPath) {
  try {
    console.log('Generating Product Launch Presentation...');
    
    // Download product logo and screenshots
    console.log('Downloading images...');
    const logoData = await downloadImage('https://picsum.photos/id/24/200/200');
    console.log('Images downloaded');
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide with Gradient Background */}
        <TitleSlide 
          title="Introducing Nova" 
          subtitle="The Next Generation Productivity Platform" 
          date="May 2024"
        />
        
        {/* Product Overview */}
        <TemplateSlide 
          title="Product Overview" 
          logoData={logoData}
          theme="purple"
        >
          <BulletList 
            items={productHighlights}
            startY={1.5}
            style={{ fontSize: 24 }}
          />
        </TemplateSlide>
        
        {/* Key Features */}
        <ContentSlide title="Key Features & Benefits">
          <InfoGraphic 
            items={productFeatures}
            x={1}
            y={1.5}
            width={8}
            height={4}
            columns={2}
          />
        </ContentSlide>
        
        {/* Launch Timeline */}
        <ContentSlide title="Product Launch Timeline">
          <Timeline 
            events={launchTimeline}
            x={1}
            y={2}
            width={8}
            orientation="horizontal"
            lineColor="#0066CC"
            lineWidth={0.1}
          />
        </ContentSlide>
        
        {/* Pricing Plans */}
        <TemplateSlide 
          title="Pricing & Plans" 
          logoData={logoData}
          theme="blue"
        >
          <ComparisonTable 
            headers={pricingHeaders}
            rows={pricingRows}
            x={0.5}
            y={1.5}
            width={9}
            columnColors={['#0066CC', '#33CC33', '#9933CC']}
          />
        </TemplateSlide>
        
        {/* Customer Testimonials - First */}
        <ContentSlide title="What Our Beta Users Are Saying">
          <QuoteBlock 
            quote={customerTestimonials[0].quote}
            author={customerTestimonials[0].author}
            source={customerTestimonials[0].source}
            x={1}
            y={1.8}
            width={8}
            theme={customerTestimonials[0].theme}
            style={customerTestimonials[0].style}
          />
        </ContentSlide>
        
        {/* Customer Testimonials - Second */}
        <ContentSlide title="What Our Beta Users Are Saying">
          <QuoteBlock 
            quote={customerTestimonials[1].quote}
            author={customerTestimonials[1].author}
            source={customerTestimonials[1].source}
            x={1}
            y={1.8}
            width={8}
            theme={customerTestimonials[1].theme}
            style={customerTestimonials[1].style}
          />
        </ContentSlide>
        
        {/* Call to Action */}
        <TemplateSlide 
          title="Get Started Today" 
          logoData={logoData}
          theme="orange"
        >
          <BulletList 
            items={[
              "Sign up for free at www.nova-platform.com",
              "Schedule a demo with our product specialists",
              "Join our webinar on May 15th for a deep dive",
              "Follow us on social media for updates",
              "Early adopter discounts available until June 30th"
            ]}
            startY={1.5}
            style={{ fontSize: 24 }}
          />
        </TemplateSlide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = customOutputPath || path.join(__dirname, '..', config.outputDir, 'product-launch.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 