const React = require('react');
const { Slide, Text, Image, Shape } = require('react-pptx');

/**
 * TemplateSlide component for creating slides with a consistent template
 * @param {Object} props Component props
 * @param {string} props.title Slide title
 * @param {React.ReactNode} props.children Slide content
 * @param {string} props.logoData Base64 encoded logo image data
 * @param {string} props.theme Color theme ('blue', 'green', 'red', 'orange', 'purple', 'dark', 'light')
 * @param {Object} props.titleStyle Additional styling for the title
 * @param {React.ReactNode} props.background Optional background element
 */
function TemplateSlide({ 
  title, 
  children,
  logoData,
  theme = 'blue',
  titleStyle = {},
  background
}) {
  // Theme colors
  const themes = {
    blue: { primary: '#0066CC', secondary: '#E6F0FF', text: '#0066CC' },
    green: { primary: '#33CC33', secondary: '#E6FFE6', text: '#33CC33' },
    red: { primary: '#CC3333', secondary: '#FFE6E6', text: '#CC3333' },
    orange: { primary: '#FF9900', secondary: '#FFF6E6', text: '#FF9900' },
    purple: { primary: '#9933CC', secondary: '#F2E6FF', text: '#9933CC' },
    dark: { primary: '#333333', secondary: '#F2F2F2', text: '#FFFFFF' },
    light: { primary: '#F2F2F2', secondary: '#FFFFFF', text: '#333333' }
  };
  
  const colors = themes[theme] || themes.blue;
  
  return (
    <Slide>
      {/* Render background if provided */}
      {background}
      
      {/* Header bar */}
      <Shape
        type="rect"
        style={{
          x: 0, y: 0, w: 10, h: 1,
          fill: colors.primary,
          line: { width: 0 }
        }}
      />
      
      {/* Title */}
      <Text 
        style={{
          x: 0.5, y: 0.25, w: 9, h: 0.5,
          fontSize: 28,
          bold: true,
          color: theme === 'dark' ? '#FFFFFF' : colors.text,
          ...titleStyle
        }}
      >
        {title}
      </Text>
      
      {/* Logo (if provided) */}
      {logoData && (
        <Image
          src={{
            kind: 'data',
            data: logoData
          }}
          style={{
            x: 9, y: 0.1, w: 0.8, h: 0.8
          }}
        />
      )}
      
      {/* Footer bar */}
      <Shape
        type="rect"
        style={{
          x: 0, y: 7, w: 10, h: 0.5,
          fill: colors.secondary,
          line: { width: 0 }
        }}
      />
      
      {/* Content area */}
      {children}
    </Slide>
  );
}

module.exports = TemplateSlide; 