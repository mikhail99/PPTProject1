// BarChart.jsx
const React = require('react');
const { Shape, Text } = require('react-pptx');

/**
 * BarChart component for creating bar charts
 * @param {Object} props Component props
 * @param {Array} props.data Array of data objects with label and value properties
 * @param {string} props.title Optional chart title
 * @param {number} props.x X position (in inches)
 * @param {number} props.y Y position (in inches)
 * @param {number} props.width Chart width (in inches)
 * @param {number} props.height Chart height (in inches)
 * @param {Object} props.titleStyle Additional styling for the title
 * @param {Object} props.labelStyle Additional styling for the labels
 * @param {Object} props.valueStyle Additional styling for the values
 */
function BarChart({ 
  data = [], 
  title, 
  x = 1, 
  y = 2, 
  width = 8, 
  height = 3,
  titleStyle = {},
  labelStyle = {},
  valueStyle = {}
}) {
  if (!data || data.length === 0) {
    return null;
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = width / data.length - 0.5;
  
  return (
    <>
      {/* Chart title */}
      {title && (
        <Text
          style={{
            x: x + width/2 - 2,
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
      
      {/* Bars, labels and values */}
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * height;
        const barX = x + index * (barWidth + 0.5);
        
        return [
          // Bar
          <Shape
            key={`bar-${index}`}
            type="rect"
            style={{
              x: barX, 
              y: y + height - barHeight,
              w: barWidth, 
              h: barHeight,
              backgroundColor: item.color || "#0066CC"
            }}
          />,
          
          // Label
          <Text
            key={`label-${index}`}
            style={{
              x: barX, 
              y: y + height + 0.2, 
              w: barWidth, 
              h: 0.3,
              fontSize: 14,
              align: "center",
              ...labelStyle
            }}
          >
            {item.label}
          </Text>,
          
          // Value
          <Text
            key={`value-${index}`}
            style={{
              x: barX, 
              y: y + height - barHeight - 0.3, 
              w: barWidth, 
              h: 0.3,
              fontSize: 12,
              align: "center",
              color: "#FFFFFF",
              bold: true,
              ...valueStyle
            }}
          >
            {item.value}
          </Text>
        ];
      }).flat()}
    </>
  );
}

module.exports = BarChart; 