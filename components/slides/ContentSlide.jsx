const React = require('react');
const { Slide, Text } = require('react-pptx');

/**
 * ContentSlide component for creating content slides with a title
 * @param {Object} props Component props
 * @param {string} props.title Slide title
 * @param {React.ReactNode} props.children Slide content
 * @param {Object} props.titleStyle Additional styling for the title
 * @param {React.ReactNode} props.background Optional background element
 */
function ContentSlide({ 
  title, 
  children,
  titleStyle = {},
  background
}) {
  return (
    <Slide>
      {/* Render background if provided */}
      {background}
      
      <Text 
        style={{
          x: 0.5, y: 0.5, w: 9, h: 0.8,
          fontSize: 32,
          bold: true,
          color: "#0066CC",
          ...titleStyle
        }}
      >
        {title}
      </Text>
      
      {children}
    </Slide>
  );
}

module.exports = ContentSlide; 