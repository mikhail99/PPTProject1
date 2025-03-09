// components/index.js
// Export all components for easy importing

// Import from subdirectories
const slides = require('./slides');
const layouts = require('./layouts');
const elements = require('./elements');
const charts = require('./charts');

// Export everything
module.exports = {
  ...slides,   // TitleSlide, ContentSlide, TemplateSlide
  ...layouts,  // GridLayout, GridItem
  ...elements, // BulletList, Timeline, InfoGraphic, ComparisonTable, QuoteBlock, MermaidDiagram
  ...charts    // PieChart, DoughnutChart, BarChart, ColumnChart
}; 