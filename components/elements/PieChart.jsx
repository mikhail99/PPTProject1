const React = require('react');
const { Shape, Text } = require('react-pptx');

/**
 * PieChart component for creating pie charts
 * Note: This is a simplified pie chart simulation using shapes
 * For a real pie chart, you would need to use the Chart component from PptxGenJS
 * 
 * @param {Object} props Component props
 * @param {Array} props.data Array of data objects with label and value properties
 * @param {string} props.title Optional chart title
 * @param {number} props.x X position (in inches)
 * @param {number} props.y Y position (in inches)
 * @param {number} props.size Chart size (diameter in inches)
 * @param {Object} props.titleStyle Additional styling for the title
 * @param {boolean} props.showLegend Whether to show the legend
 * @param {number} props.legendX X position of the legend (in inches)
 * @param {number} props.legendY Y position of the legend (in inches)
 */
function PieChart({ 
  data = [], 
  title, 
  x = 2, 
  y = 2, 
  size = 3,
  titleStyle = {},
  showLegend = true,
  legendX,
  legendY
}) {
  if (!data || data.length === 0) {
    return null;
  }

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Define colors if not provided
  const defaultColors = [
    "#0066CC", "#FF9900", "#33CC33", "#FF3333", 
    "#9933CC", "#00CCCC", "#FF6600", "#999999"
  ];
  
  // Set legend position if not provided
  const actualLegendX = legendX !== undefined ? legendX : x + size + 0.5;
  const actualLegendY = legendY !== undefined ? legendY : y;
  
  // Since we can't create actual pie charts with react-pptx directly,
  // we'll create a circle with a label to represent the concept
  return (
    <>
      {/* Chart title */}
      {title && (
        <Text
          style={{
            x: x + size/2 - 2,
            y: y - 0.7,
            w: 4,
            h: 0.5,
            fontSize: 20,
            align: "center",
            ...titleStyle
          }}
        >
          {title}
        </Text>
      )}
      
      {/* Pie chart placeholder (circle) */}
      <Shape
        type="ellipse"
        style={{
          x: x,
          y: y,
          w: size,
          h: size,
          backgroundColor: "#CCCCCC"
        }}
      />
      
      {/* Center text showing it's a placeholder */}
      <Text
        style={{
          x: x + size/2 - 1.5,
          y: y + size/2 - 0.25,
          w: 3,
          h: 0.5,
          fontSize: 12,
          align: "center",
          color: "#666666"
        }}
      >
        Pie Chart Placeholder
      </Text>
      
      {/* Legend */}
      {showLegend && data.map((item, index) => {
        const itemColor = item.color || defaultColors[index % defaultColors.length];
        const percentage = Math.round((item.value / total) * 100);
        
        return [
          // Color box
          <Shape
            key={`legend-box-${index}`}
            type="rect"
            style={{
              x: actualLegendX,
              y: actualLegendY + (index * 0.4),
              w: 0.2,
              h: 0.2,
              backgroundColor: itemColor
            }}
          />,
          
          // Label and percentage
          <Text
            key={`legend-text-${index}`}
            style={{
              x: actualLegendX + 0.3,
              y: actualLegendY + (index * 0.4) - 0.05,
              w: 3,
              h: 0.3,
              fontSize: 12
            }}
          >
            {`${item.label}: ${percentage}%`}
          </Text>
        ];
      }).flat()}
    </>
  );
}

module.exports = PieChart; 