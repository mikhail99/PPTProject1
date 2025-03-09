// QuoteBlock.jsx
// A component for highlighting important quotes

const React = require('react');
const { Text, Shape } = require('react-pptx');

/**
 * QuoteBlock component for highlighting important quotes
 * @param {Object} props
 * @param {string} props.quote - The quote text
 * @param {string} props.author - The author of the quote
 * @param {string} props.source - The source of the quote
 * @param {number} props.x - X position of the quote block
 * @param {number} props.y - Y position of the quote block
 * @param {number} props.width - Width of the quote block
 * @param {string} props.theme - Color theme ('blue', 'green', 'orange', 'red', 'purple')
 * @param {string} props.style - Style of the quote block ('modern', 'classic', 'minimal')
 */
function QuoteBlock({
  quote = '',
  author = '',
  source = '',
  x = 1,
  y = 1,
  width = 8,
  theme = 'blue',
  style = 'modern'
}) {
  if (!quote) {
    return null;
  }

  // Theme colors
  const themes = {
    blue: { primary: '#0066CC', secondary: '#E6F0FF' },
    green: { primary: '#33CC33', secondary: '#E6FFE6' },
    orange: { primary: '#FF9900', secondary: '#FFF6E6' },
    red: { primary: '#CC3333', secondary: '#FFE6E6' },
    purple: { primary: '#9933CC', secondary: '#F2E6FF' }
  };
  
  const themeColors = themes[theme] || themes.blue;
  
  // Style configurations
  const styles = {
    modern: {
      quoteMarks: true,
      background: true,
      border: false,
      fontSize: 24,
      authorStyle: { fontSize: 14, italic: true }
    },
    classic: {
      quoteMarks: true,
      background: false,
      border: true,
      fontSize: 20,
      authorStyle: { fontSize: 12, italic: true }
    },
    minimal: {
      quoteMarks: false,
      background: false,
      border: false,
      fontSize: 28,
      authorStyle: { fontSize: 16, italic: false }
    }
  };
  
  const styleConfig = styles[style] || styles.modern;
  
  // Calculate dimensions
  const padding = 0.5;
  const quoteHeight = 2;
  const authorHeight = 0.5;
  const totalHeight = quoteHeight + (author ? authorHeight : 0) + (padding * 2);
  
  // Ensure x and y are at least 0.5 inches to avoid top-left corner
  const safeX = Math.max(x, 0.5);
  const safeY = Math.max(y, 0.5);
  
  return (
    <>
      {/* Background */}
      {styleConfig.background && (
        <Shape
          type="roundRect"
          x={safeX}
          y={safeY}
          w={width}
          h={totalHeight}
          style={{
            fill: { color: themeColors.secondary },
            line: styleConfig.border ? {
              color: themeColors.primary,
              width: 2
            } : { width: 0 }
          }}
        />
      )}
      
      {/* Left quote mark */}
      {styleConfig.quoteMarks && (
        <Text
          x={safeX + padding}
          y={safeY + padding - 0.2}
          w={0.5}
          h={0.5}
          style={{
            fontSize: styleConfig.fontSize * 2,
            color: themeColors.primary,
            bold: true
          }}
        >
          "
        </Text>
      )}
      
      {/* Quote text */}
      <Text
        x={safeX + padding + (styleConfig.quoteMarks ? 0.5 : 0)}
        y={safeY + padding}
        w={width - (padding * 2) - (styleConfig.quoteMarks ? 1 : 0)}
        h={quoteHeight}
        style={{
          fontSize: styleConfig.fontSize,
          color: '#333333',
          italic: true,
          align: 'center'
        }}
      >
        {quote}
      </Text>
      
      {/* Right quote mark */}
      {styleConfig.quoteMarks && (
        <Text
          x={safeX + width - padding - 0.5}
          y={safeY + padding + quoteHeight - 0.5}
          w={0.5}
          h={0.5}
          style={{
            fontSize: styleConfig.fontSize * 2,
            color: themeColors.primary,
            bold: true,
            align: 'right'
          }}
        >
          "
        </Text>
      )}
      
      {/* Author and source */}
      {author && (
        <Text
          x={safeX + padding}
          y={safeY + padding + quoteHeight}
          w={width - (padding * 2)}
          h={authorHeight}
          style={{
            ...styleConfig.authorStyle,
            color: '#666666',
            align: 'right'
          }}
        >
          {`— ${author}${source ? `, ${source}` : ''}`}
        </Text>
      )}
      
      {/* Accent line */}
      {style === 'modern' && (
        <Shape
          type="rect"
          x={safeX}
          y={safeY}
          w={0.2}
          h={totalHeight}
          style={{
            fill: { color: themeColors.primary }
          }}
        />
      )}
    </>
  );
}

module.exports = QuoteBlock; 