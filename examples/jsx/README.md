# React-PPTX Chart Components Demo

This directory contains a demonstration of the React-PPTX Chart Components library, which provides a set of React components for creating charts in PowerPoint presentations.

## Chart Components Demo

The `chart-components-demo.jsx` file showcases various chart types that can be created using the React-PPTX Chart Components library:

- Pie Chart
- Doughnut Chart
- Bar Chart
- Column Chart
- Line Chart
- Area Chart
- Scatter Chart
- Bubble Chart
- Radar Chart

## Running the Demo

To generate a PowerPoint presentation from the demo, run the following command from the root of the project:

```bash
node generate-ppt.js --input examples/jsx/chart-components-demo.jsx
```

This will create a PowerPoint file at `examples/ppt/chart-components-demo.pptx`.

## Demo Structure

The demo presentation includes:

1. A title slide introducing the React-PPTX Chart Components
2. An introduction slide explaining the purpose and features of the library
3. Multiple slides showcasing different chart types with examples
4. An API overview slide explaining the common props shared by all chart components
5. A conclusion slide with a call to action

## Implementation Details

The demo uses mock implementations of the chart components to demonstrate how they would be used in a real application. In a real-world scenario, you would import the components from the `react-pptx-components` package:

```javascript
import { PieChart, BarChart, LineChart } from 'react-pptx-components';
```

Each chart component accepts props for customizing the appearance and behavior of the chart, such as:

- `data`: The data to be displayed in the chart
- `title`: The title of the chart
- `x`, `y`: The position of the chart on the slide (in inches)
- `width`, `height`: The dimensions of the chart (in inches)
- Chart-specific props like `showPercent`, `catAxisTitle`, `valAxisTitle`, etc.

## Sample Data

The demo includes sample data for each chart type:

- `pieData`: Sample data for pie and doughnut charts
- `categoryData`: Sample data for bar, column, line, and area charts
- `scatterData`: Sample data for scatter charts
- `bubbleData`: Sample data for bubble charts
- `radarData`: Sample data for radar charts

## Learn More

For more information about the React-PPTX Chart Components library, check out the [react-pptx-components](https://github.com/yourusername/react-pptx-components) repository. 