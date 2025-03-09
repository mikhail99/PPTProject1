// InfoGraphic.jsx
// A component for creating visually appealing data presentations

const React = require('react');
const { Text, Shape } = require('react-pptx');

/**
 * InfoGraphic component for creating visually appealing data presentations
 * @param {Object} props
 * @param {Array} props.items - Array of item objects with {value, label, description, color, icon}
 * @param {number} props.x - X position of the infographic
 * @param {number} props.y - Y position of the infographic
 * @param {number} props.width - Width of the infographic
 * @param {number} props.height - Height of the infographic
 * @param {number} props.columns - Number of columns
 * @param {Object} props.style - Style object for the infographic
 */
function InfoGraphic({
  items = [],
  x = 1,
  y = 1,
  width = 8,
  height = 4,
  columns = 2,
  style = {}
}) {
  if (!items || items.length === 0) {
    return null;
  }

  // Calculate layout
  const rows = Math.ceil(items.length / columns);
  const itemWidth = width / columns;
  const itemHeight = height / rows;
  
  // Default styles
  const defaultStyle = {
    value: { fontSize: 36, bold: true, color: '#333333' },
    label: { fontSize: 16, bold: true, color: '#666666' },
    description: { fontSize: 12, color: '#333333' },
    shape: { 
      type: 'roundRect', 
      fill: '#f5f5f5',
      line: { color: '#cccccc', width: 1 }
    }
  };
  
  // Merge with provided styles
  const mergedStyle = {
    ...defaultStyle,
    ...style
  };

  // Ensure x and y are at least 0.5 inches to avoid top-left corner
  const safeX = Math.max(x, 0.5);
  const safeY = Math.max(y, 0.5);

  return (
    <>
      {items.map((item, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;
        
        const itemX = safeX + (col * itemWidth);
        const itemY = safeY + (row * itemHeight);
        
        const color = item.color || '#0066CC';
        const shapeType = item.icon?.type || mergedStyle.shape.type;
        
        // Calculate center positions for value and label
        const centerX = itemX + (itemWidth / 2) - 1; // Adjust for text width
        
        return (
          <React.Fragment key={index}>
            {/* Background shape */}
            <Shape
              type="rect"
              x={itemX + 0.2}
              y={itemY + 0.2}
              w={itemWidth - 0.4}
              h={itemHeight - 0.4}
              style={{
                fill: { color: mergedStyle.shape.fill },
                line: {
                  color: item.color || mergedStyle.shape.line.color,
                  width: mergedStyle.shape.line.width
                }
              }}
            />
            
            {/* Icon (simplified as a colored shape) */}
            {item.icon && (
              <Shape
                type={shapeType}
                x={itemX + 0.5}
                y={itemY + 0.5}
                w={0.5}
                h={0.5}
                style={{ 
                  fill: { color: color },
                  line: { color: color, width: 1 }
                }}
              />
            )}
            
            {/* Value */}
            <Text
              x={centerX}
              y={itemY + 0.7}
              w={2}
              h={0.5}
              style={{
                ...mergedStyle.value,
                color: color,
                align: 'center'
              }}
            >
              {item.value}
            </Text>
            
            {/* Label */}
            <Text
              x={centerX}
              y={itemY + 1.3}
              w={2}
              h={0.3}
              style={{
                ...mergedStyle.label,
                align: 'center'
              }}
            >
              {item.label}
            </Text>
            
            {/* Description */}
            {item.description && (
              <Text
                x={itemX + 0.4}
                y={itemY + 1.7}
                w={itemWidth - 0.8}
                h={0.5}
                style={{
                  ...mergedStyle.description,
                  align: 'center'
                }}
              >
                {item.description}
              </Text>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

module.exports = InfoGraphic; 