const React = require('react');
const { Text } = require('react-pptx');

/**
 * BulletList component for creating bullet point lists
 * @param {Object} props Component props
 * @param {Array} props.items Array of strings to display as bullet points
 * @param {number} props.startY Starting Y position (in inches)
 * @param {number} props.x X position (in inches)
 * @param {number} props.spacing Vertical spacing between items (in inches)
 * @param {Object} props.style Additional styling for the text elements
 */
function BulletList({ 
  items = [], 
  startY = 1.8, 
  x = 1, 
  spacing = 0.7,
  style = {} 
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <>
      {items.map((item, index) => (
        <Text
          key={index}
          style={{
            x: x,
            y: startY + (index * spacing),
            w: 8,
            h: 0.5,
            fontSize: 24,
            bullet: true,
            ...style
          }}
        >
          {item}
        </Text>
      ))}
    </>
  );
}

module.exports = BulletList; 