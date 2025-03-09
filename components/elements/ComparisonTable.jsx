// ComparisonTable.jsx
// A component for creating side-by-side comparisons

const React = require('react');
const { Text, Shape } = require('react-pptx');

/**
 * ComparisonTable component for creating side-by-side comparisons
 * @param {Object} props
 * @param {Array} props.headers - Array of column headers
 * @param {Array} props.rows - Array of row objects with {feature, values: []}
 * @param {number} props.x - X position of the table
 * @param {number} props.y - Y position of the table
 * @param {number} props.width - Width of the table
 * @param {Object} props.style - Style object for the table
 * @param {Array} props.columnColors - Array of colors for each column
 */
function ComparisonTable({
  headers = [],
  rows = [],
  x = 1,
  y = 1,
  width = 8,
  style = {},
  columnColors = []
}) {
  if (!headers || headers.length === 0 || !rows || rows.length === 0) {
    return null;
  }

  // Calculate layout
  const columnCount = headers.length;
  const columnWidth = width / columnCount;
  const rowHeight = 0.5;
  const headerHeight = 0.7;
  
  // Default styles
  const defaultStyle = {
    header: { fontSize: 14, bold: true, color: '#ffffff' },
    featureCell: { fontSize: 12, bold: true, color: '#333333' },
    valueCell: { fontSize: 12, color: '#333333' },
    headerFill: '#333333',
    featureFill: '#f5f5f5',
    valueFill: '#ffffff',
    altValueFill: '#f9f9f9',
    border: { color: '#cccccc', width: 1 }
  };
  
  // Merge with provided styles
  const mergedStyle = {
    ...defaultStyle,
    ...style
  };

  // Default column colors if not provided
  const defaultColumnColors = ['#0066CC', '#33CC33', '#FF9900', '#CC3333', '#9933CC'];
  const colors = columnColors.length > 0 ? columnColors : defaultColumnColors;

  // Ensure x and y are at least 0.5 inches to avoid top-left corner
  const safeX = Math.max(x, 0.5);
  const safeY = Math.max(y, 0.5);

  return (
    <>
      {/* Headers */}
      {headers.map((header, colIndex) => {
        const cellX = safeX + (colIndex * columnWidth);
        const color = colors[colIndex % colors.length];
        
        return (
          <React.Fragment key={`header-${colIndex}`}>
            {/* Header background */}
            <Shape
              type="rect"
              x={cellX}
              y={safeY}
              w={columnWidth}
              h={headerHeight}
              style={{
                fill: { color: colIndex === 0 ? mergedStyle.headerFill : color },
                line: {
                  color: mergedStyle.border.color,
                  width: mergedStyle.border.width
                }
              }}
            />
            
            {/* Header text */}
            <Text
              x={cellX + 0.1}
              y={safeY + 0.1}
              w={columnWidth - 0.2}
              h={headerHeight - 0.2}
              style={{
                ...mergedStyle.header,
                align: 'center',
                verticalAlign: 'middle'
              }}
            >
              {header}
            </Text>
          </React.Fragment>
        );
      })}
      
      {/* Rows */}
      {rows.map((row, rowIndex) => {
        const rowY = safeY + headerHeight + (rowIndex * rowHeight);
        const isAltRow = rowIndex % 2 === 1;
        
        return (
          <React.Fragment key={`row-${rowIndex}`}>
            {/* Feature cell (first column) */}
            <Shape
              type="rect"
              x={safeX}
              y={rowY}
              w={columnWidth}
              h={rowHeight}
              style={{
                fill: { color: mergedStyle.featureFill },
                line: {
                  color: mergedStyle.border.color,
                  width: mergedStyle.border.width
                }
              }}
            />
            
            <Text
              x={safeX + 0.1}
              y={rowY + 0.1}
              w={columnWidth - 0.2}
              h={rowHeight - 0.2}
              style={{
                ...mergedStyle.featureCell,
                align: 'left',
                verticalAlign: 'middle'
              }}
            >
              {row.feature}
            </Text>
            
            {/* Value cells */}
            {row.values.map((value, colIndex) => {
              const cellX = safeX + ((colIndex + 1) * columnWidth);
              const color = colors[(colIndex + 1) % colors.length];
              
              return (
                <React.Fragment key={`cell-${rowIndex}-${colIndex}`}>
                  {/* Cell background */}
                  <Shape
                    type="rect"
                    x={cellX}
                    y={rowY}
                    w={columnWidth}
                    h={rowHeight}
                    style={{
                      fill: { color: isAltRow ? mergedStyle.altValueFill : mergedStyle.valueFill },
                      line: {
                        color: mergedStyle.border.color,
                        width: mergedStyle.border.width
                      }
                    }}
                  />
                  
                  {/* Cell text or checkmark */}
                  {value === true ? (
                    // Checkmark (simplified as a colored text)
                    <Text
                      x={cellX + 0.1}
                      y={rowY + 0.1}
                      w={columnWidth - 0.2}
                      h={rowHeight - 0.2}
                      style={{
                        fontSize: 16,
                        bold: true,
                        color: color,
                        align: 'center',
                        verticalAlign: 'middle'
                      }}
                    >
                      ✓
                    </Text>
                  ) : value === false ? (
                    // X mark
                    <Text
                      x={cellX + 0.1}
                      y={rowY + 0.1}
                      w={columnWidth - 0.2}
                      h={rowHeight - 0.2}
                      style={{
                        fontSize: 16,
                        bold: true,
                        color: '#CC3333',
                        align: 'center',
                        verticalAlign: 'middle'
                      }}
                    >
                      ✗
                    </Text>
                  ) : (
                    // Regular text
                    <Text
                      x={cellX + 0.1}
                      y={rowY + 0.1}
                      w={columnWidth - 0.2}
                      h={rowHeight - 0.2}
                      style={{
                        ...mergedStyle.valueCell,
                        align: 'center',
                        verticalAlign: 'middle'
                      }}
                    >
                      {value}
                    </Text>
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}

module.exports = ComparisonTable; 