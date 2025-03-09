// visual-showcase-data.js
// Data for the visual showcase example

// Timeline events data
const timelineEvents = [
  {
    date: 'Jan 2023',
    title: 'Project Kickoff',
    description: 'Initial planning and team assembly',
    color: '#0066CC'
  },
  {
    date: 'Mar 2023',
    title: 'Design Phase',
    description: 'UI/UX design and prototyping',
    color: '#33CC33'
  },
  {
    date: 'Jun 2023',
    title: 'Development',
    description: 'Core functionality implementation',
    color: '#FF9900'
  },
  {
    date: 'Aug 2023',
    title: 'Testing',
    description: 'QA and user acceptance testing',
    color: '#CC3333'
  },
  {
    date: 'Oct 2023',
    title: 'Launch',
    description: 'Public release and marketing',
    color: '#9933CC'
  }
];

// InfoGraphic items data
const infographicItems = [
  {
    value: '87%',
    label: 'Customer Satisfaction',
    description: 'Based on post-purchase surveys',
    color: '#0066CC',
    icon: { type: 'ellipse' }
  },
  {
    value: '42%',
    label: 'Market Growth',
    description: 'Year-over-year increase',
    color: '#33CC33',
    icon: { type: 'rect' }
  },
  {
    value: '$2.4M',
    label: 'Revenue',
    description: 'Q3 2023 total revenue',
    color: '#FF9900',
    icon: { type: 'roundRect' }
  },
  {
    value: '24',
    label: 'New Markets',
    description: 'Expansion locations in 2023',
    color: '#CC3333',
    icon: { type: 'ellipse' }
  }
];

// Comparison table data
const comparisonHeaders = ['Features', 'Basic Plan', 'Pro Plan', 'Enterprise'];

const comparisonRows = [
  {
    feature: 'Core Features',
    values: [true, true, true]
  },
  {
    feature: 'Advanced Analytics',
    values: [false, true, true]
  },
  {
    feature: 'Custom Branding',
    values: [false, true, true]
  },
  {
    feature: 'API Access',
    values: [false, false, true]
  },
  {
    feature: 'Support SLA',
    values: ['Email only', '24/7 Chat', 'Dedicated Rep']
  },
  {
    feature: 'Price',
    values: ['$9.99/mo', '$29.99/mo', 'Custom']
  }
];

// Quote data
const quotes = [
  {
    quote: 'This product has completely transformed how our team collaborates on projects.',
    author: 'Jane Smith',
    source: 'ABC Corporation',
    theme: 'blue',
    style: 'modern'
  },
  {
    quote: 'The efficiency gains we\'ve seen since implementing this solution have exceeded our expectations.',
    author: 'John Davis',
    source: 'XYZ Enterprises',
    theme: 'green',
    style: 'classic'
  },
  {
    quote: 'Simple, intuitive, and powerful. Exactly what we needed.',
    author: 'Sarah Johnson',
    source: 'Tech Innovators',
    theme: 'purple',
    style: 'minimal'
  }
];

module.exports = {
  timelineEvents,
  infographicItems,
  comparisonHeaders,
  comparisonRows,
  quotes
}; 