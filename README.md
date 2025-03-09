# PowerPoint Presentation Generator

A flexible PowerPoint presentation generator using React JSX syntax and react-pptx.

## Features

- Create PowerPoint presentations using React JSX syntax
- Component-based architecture with reusable slide templates and elements
- Generate PPTX, HTML, and PDF formats
- Configurable output paths via environment variables or config file
- Command-line interface for generating presentations
- Mermaid diagram integration for creating dynamic diagrams
- CSV and JSON data integration for data-driven presentations
- Enhanced theme system with multiple built-in themes
- Template gallery for managing and using presentation templates

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ppt-generator.git
cd ppt-generator

# Install dependencies
npm install
```

## Configuration

The application uses a central configuration system to manage output paths and other settings. You can customize these settings in several ways:

### 1. Environment Variables

Set environment variables to override default paths:

```bash
# Set output directory for presentations
export PPT_OUTPUT_DIR=my-presentations

# Set output directory for analysis files
export PPT_ANALYSIS_DIR=my-analysis
```

### 2. Edit config.js

Modify the `config.js` file directly:

```javascript
// config.js
const config = {
  outputDir: process.env.PPT_OUTPUT_DIR || 'custom-output-dir',
  analysisDir: process.env.PPT_ANALYSIS_DIR || 'custom-analysis-dir',
  // ...
};
```

### Default Configuration

By default, presentations are saved to the `examples/ppt` directory and analysis files to the `examples/analysis` directory.

## Usage

### Generate a Presentation

```bash
# Generate a presentation using a JSX file
node generate-ppt.js --input examples/jsx/simple-presentation.jsx

# Specify a custom output path
node generate-ppt.js --input examples/jsx/quarterly-report.jsx --output ./my-presentations/q2-report.pptx
```

### Generate HTML Preview

```bash
# Generate an HTML preview of a presentation
node generate-html.js --input examples/jsx/visual-showcase.jsx

# Specify a custom output path
node generate-html.js --input examples/jsx/visual-showcase.jsx --output ./my-html/showcase.html
```

### Generate PDF

```bash
# Generate a PDF from a presentation
node generate-pdf.js --input examples/jsx/visual-showcase.jsx

# Specify a custom output path
node generate-pdf.js --input examples/jsx/quarterly-report.jsx --output ./my-pdfs/q2-report.pdf
```

### Parse PPTX Files

```bash
# Parse a PPTX file to extract information
node parse-pptx.js --input examples/ppt/quarterly-report.pptx
```

### Use Templates

```bash
# List all available templates
node use-template.js --list

# List templates by category
node use-template.js --list --category business

# Create a presentation from a template
node use-template.js --id business-quarterly --output ./my-report.pptx

# Create a presentation from a template with custom data
node use-template.js --id business-quarterly --output ./my-report.pptx --data ./my-data.json
```

### Data-Driven Presentations

```bash
# Generate a presentation with data from CSV
node generate-ppt.js --input examples/jsx/data-driven-charts.jsx
```

### Themed Presentations

```bash
# Generate a presentation with enhanced theming
node generate-ppt.js --input examples/jsx/themed-presentation.jsx
```

## Example Presentations

The repository includes several example presentations:

- `simple-presentation.jsx`: Basic slides with minimal styling
- `component-presentation.jsx`: Demonstration of component-based slides
- `grid-layout-example.jsx`: Advanced layout capabilities
- `organized-components.jsx`: Structured component usage
- `visual-showcase.jsx`: Demonstration of visual elements
- `quarterly-report.jsx`: Business reporting template
- `product-launch.jsx`: Marketing presentation template
- `project-status.jsx`: Project management presentation template
- `mermaid-example.jsx`: Demonstration of Mermaid diagram integration
- `data-driven-charts.jsx`: Data-driven charts from CSV
- `themed-presentation.jsx`: Enhanced theme system demonstration

## Using Mermaid Diagrams

The PowerPoint generator includes support for Mermaid diagrams, allowing you to create dynamic diagrams directly in your presentations using Mermaid syntax.

### Example Usage

```jsx
// Import the MermaidDiagram component
const { MermaidDiagram } = require('./components');

// Define your Mermaid diagram code
const flowchartCode = `
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
`;

// Use the component in your presentation
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
```

### Supported Diagram Types

- Flowcharts
- Sequence diagrams
- Class diagrams
- Gantt charts
- Entity Relationship diagrams
- State diagrams

### Themes

The MermaidDiagram component supports different themes:
- `default`: Standard Mermaid theme
- `forest`: Green-focused theme
- `dark`: Dark background theme
- `neutral`: Minimal, neutral colors theme

## Using Data Integration

The PowerPoint generator includes support for data integration, allowing you to create data-driven presentations from CSV and JSON files.

### Example Usage

```jsx
// Import the data loader
const { loadCSVData, transformChartData } = require('./data-loader');

// Load data from CSV file
const salesDataPath = path.join(__dirname, '..', 'data', 'sales.csv');
const salesData = await loadCSVData(salesDataPath);

// Transform data for charts
const barChartData = transformChartData(salesData, 'quarter', 'revenue', 'color');

// Use the data in your presentation
<ContentSlide title="Quarterly Revenue">
  <BarChart 
    data={barChartData}
    title="Revenue by Quarter"
    x={1}
    y={1.8}
    width={8}
    height={3}
  />
</ContentSlide>
```

## Using the Theme System

The PowerPoint generator includes an enhanced theme system, allowing you to create consistent, beautiful presentations.

### Example Usage

```jsx
// Import the theme manager
const themeManager = require('./themes');

// Get a theme
const theme = themeManager.getTheme('corporate');

// Create a custom theme
const customTheme = themeManager.createCustomTheme('corporate', {
  colors: {
    accent: '#FF5500'
  }
});

// Use the theme in your presentation
<Text 
  style={{
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: theme.fonts.sizes.title,
    bold: true,
    color: theme.colors.text.light,
    fontFace: theme.fonts.heading
  }}
>
  Enhanced Theme System
</Text>
```

## Using Templates

The PowerPoint generator includes a template gallery, allowing you to create presentations from pre-defined templates.

### Example Usage

```bash
# List all templates
node use-template.js --list

# Create a presentation from a template
node use-template.js --id business-quarterly --output ./my-report.pptx

# Create a presentation from a template with custom data
node use-template.js --id business-quarterly --output ./my-report.pptx --data ./my-data.json
```

## Directory Structure

```
ppt-generator/
├── components/            # Reusable presentation components
│   ├── elements/          # Visual elements (charts, lists, diagrams, etc.)
│   ├── layouts/           # Layout components
│   └── slides/            # Slide templates
├── examples/              # Example presentations
│   ├── jsx/               # JSX presentation files
│   ├── ppt/               # Generated PPTX files
│   ├── html/              # HTML preview files
│   ├── data/              # Data files (CSV, JSON)
│   └── analysis/          # Analysis output files
├── templates/             # Presentation templates
├── config.js              # Configuration settings
├── data-loader.js         # Data loading utilities
├── themes.js              # Theme management system
├── generate-ppt.js        # Script to generate PPTX files
├── generate-html.js       # Script to generate HTML previews
├── generate-pdf.js        # Script to generate PDF files
├── use-template.js        # Script to use templates
└── parse-pptx.js          # Script to parse PPTX files
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 