const React = require('react');
const { Slide, Text, Shape } = require('react-pptx');

/**
 * TitleSlide component for creating title slides
 * @param {Object} props Component props
 * @param {string} props.title Main title text
 * @param {string} props.subtitle Subtitle text
 * @param {string} props.date Optional date text
 * @param {Object} props.titleStyle Additional styling for the title
 * @param {Object} props.subtitleStyle Additional styling for the subtitle
 * @param {Object} props.dateStyle Additional styling for the date
 * @param {React.ReactNode} props.background Optional background element
 */
function TitleSlide({ 
  title, 
  subtitle, 
  date,
  titleStyle = {},
  subtitleStyle = {},
  dateStyle = {},
  background
}) {
  return (
    <Slide>
      {/* Render background if provided */}
      {background}
      
      <Text 
        style={{
          x: 1, y: 1, w: 8, h: 1.5,
          fontSize: 44,
          bold: true,
          align: "center",
          color: "#0066CC",
          ...titleStyle
        }}
      >
        {title}
      </Text>
      
      <Shape
        type="rect"
        style={{
          x: 3, y: 2.5, w: 4, h: 0.2,
          backgroundColor: "#FF0000"
        }}
      />
      
      <Text
        style={{
          x: 1, y: 3, w: 8, h: 1,
          fontSize: 28,
          align: "center",
          color: "#666666",
          ...subtitleStyle
        }}
      >
        {subtitle}
      </Text>
      
      {date && (
        <Text
          style={{
            x: 1, y: 5, w: 8, h: 0.5,
            fontSize: 16,
            align: "center",
            color: "#888888",
            ...dateStyle
          }}
        >
          {date}
        </Text>
      )}
    </Slide>
  );
}

module.exports = TitleSlide; 