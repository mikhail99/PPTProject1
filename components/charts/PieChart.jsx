const React = require('react');
const { getBaseChartOptions } = require('./BaseChart');

/**
 * PieChart component for creating pie charts in PowerPoint presentations
 * @param {Object} props Component props
 * @param {Array} props.data The data to be displayed in the chart
 * @param {string} props.title The title of the chart
 * @param {number} props.x The x position of the chart on the slide (in inches)
 * @param {number} props.y The y position of the chart on the slide (in inches)
 * @param {number} props.width The width of the chart (in inches)
 * @param {number} props.height The height of the chart (in inches)
 * @param {boolean} props.showValue Whether to show values
 * @param {boolean} props.showPercent Whether to show percentages
 * @param {boolean} props.showLeaderLines Whether to show leader lines
 * @param {number} props.holeSize Size of the hole (for doughnut charts, 0-100)
 */
function PieChart(props) {
  const { data, showValue = false, showPercent = true, showLeaderLines = true, holeSize } = props;
  
  return (
    <React.Fragment>
      {({ slide }) => {
        // Get base chart options
        const options = getBaseChartOptions(props);
        
        // Add pie-specific options
        options.showValue = showValue;
        options.showPercent = showPercent;
        options.showLeaderLines = showLeaderLines;
        
        // Add hole size for doughnut charts if specified
        if (holeSize !== undefined) {
          options.holeSize = holeSize;
        }
        
        // Format data for pptxgenjs
        const chartData = data.map(point => ({
          name: point.name,
          labels: [point.name],
          values: [point.value],
          ...(point.color && { color: point.color }),
          ...(point.dataLabel && { dataLabel: point.dataLabel }),
          ...(point.explode !== undefined && { explode: point.explode }),
        }));
        
        // Add the chart to the slide
        slide.addChart(holeSize !== undefined ? 'doughnut' : 'pie', chartData, options);
        
        return null;
      }}
    </React.Fragment>
  );
}

/**
 * DoughnutChart component - a convenience wrapper around PieChart with holeSize
 */
function DoughnutChart(props) {
  return <PieChart {...props} holeSize={props.holeSize || 50} />;
}

module.exports = {
  PieChart,
  DoughnutChart
}; 