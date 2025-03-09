// themed-presentation.jsx
// An example demonstrating the enhanced theme system

const React = require('react');
const { Presentation, Slide, Text, Shape, render } = require('react-pptx');
const fs = require('fs');
const path = require('path');
const config = require('../../config');
const themeManager = require('../../themes');

// Import components
const {
  TitleSlide,
  ContentSlide
} = require('../../components');

// Function to generate a themed presentation
async function generatePresentation(customOutputPath) {
  try {
    console.log('Starting themed PowerPoint generation...');
    
    // Get the theme
    const themeName = 'corporate'; // Try different themes: blue, green, dark, light, corporate, modern
    const theme = themeManager.getTheme(themeName);
    console.log(`Using theme: ${theme.name}`);
    
    // Create a custom theme based on the selected theme
    const customTheme = themeManager.createCustomTheme(themeName, {
      colors: {
        accent: '#FF5500' // Override the accent color
      }
    });
    
    // Generate the presentation
    console.log('Creating presentation...');
    const pres = await render(
      <Presentation>
        {/* Title Slide */}
        <Slide>
          {/* Background */}
          <Shape
            type="rect"
            style={{
              x: 0, y: 0, w: 10, h: 7.5,
              fill: theme.colors.background.primary
            }}
          />
          
          {/* Header */}
          <Shape
            type="rect"
            style={{
              x: 0, y: 0, w: 10, h: 1.5,
              fill: theme.colors.primary
            }}
          />
          
          {/* Title */}
          <Text 
            style={{
              x: 0.5, y: 0.5, w: 9, h: 0.8,
              fontSize: theme.fonts.sizes.title,
              bold: true,
              color: theme.colors.text.light,
              fontFace: theme.fonts.heading
            }}
          >
            Enhanced Theme System
          </Text>
          
          {/* Subtitle */}
          <Text
            style={{
              x: 0.5, y: 2, w: 9, h: 0.6,
              fontSize: theme.fonts.sizes.subtitle,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.body
            }}
          >
            Creating consistent, beautiful presentations
          </Text>
          
          {/* Accent line */}
          <Shape
            type="rect"
            style={{
              x: 0.5, y: 3, w: 9, h: 0.1,
              fill: customTheme.colors.accent
            }}
          />
          
          {/* Date */}
          <Text
            style={{
              x: 0.5, y: 6.5, w: 9, h: 0.4,
              fontSize: theme.fonts.sizes.caption,
              color: theme.colors.text.secondary,
              align: "right",
              fontFace: theme.fonts.body
            }}
          >
            {new Date().toLocaleDateString()}
          </Text>
        </Slide>
        
        {/* Content Slide */}
        <Slide>
          {/* Background */}
          <Shape
            type="rect"
            style={{
              x: 0, y: 0, w: 10, h: 7.5,
              fill: theme.colors.background.primary
            }}
          />
          
          {/* Header */}
          <Shape
            type="rect"
            style={{
              x: 0, y: 0, w: 10, h: 0.8,
              fill: theme.colors.primary
            }}
          />
          
          {/* Title */}
          <Text 
            style={{
              x: 0.5, y: 0.15, w: 9, h: 0.5,
              fontSize: theme.fonts.sizes.heading,
              bold: true,
              color: theme.colors.text.light,
              fontFace: theme.fonts.heading
            }}
          >
            Theme Features
          </Text>
          
          {/* Content */}
          <Text
            style={{
              x: 0.5, y: 1.2, w: 9, h: 0.5,
              fontSize: theme.fonts.sizes.subheading,
              bold: true,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.heading
            }}
          >
            Consistent Design Elements
          </Text>
          
          {/* Bullet points */}
          <Text
            style={{
              x: 1, y: 2, w: 8, h: 0.4,
              fontSize: theme.fonts.sizes.body,
              bullet: true,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.body
            }}
          >
            Color schemes with primary, secondary, and accent colors
          </Text>
          
          <Text
            style={{
              x: 1, y: 2.5, w: 8, h: 0.4,
              fontSize: theme.fonts.sizes.body,
              bullet: true,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.body
            }}
          >
            Typography with consistent font families and sizes
          </Text>
          
          <Text
            style={{
              x: 1, y: 3, w: 8, h: 0.4,
              fontSize: theme.fonts.sizes.body,
              bullet: true,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.body
            }}
          >
            Shape styling with consistent border radius and line width
          </Text>
          
          <Text
            style={{
              x: 1, y: 3.5, w: 8, h: 0.4,
              fontSize: theme.fonts.sizes.body,
              bullet: true,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.body
            }}
          >
            Background and text color combinations for readability
          </Text>
          
          {/* Footer */}
          <Shape
            type="rect"
            style={{
              x: 0, y: 7, w: 10, h: 0.5,
              fill: theme.colors.secondary
            }}
          />
          
          <Text
            style={{
              x: 0.5, y: 7.05, w: 9, h: 0.4,
              fontSize: theme.fonts.sizes.caption,
              color: theme.colors.text.secondary,
              align: "right",
              fontFace: theme.fonts.body
            }}
          >
            Enhanced Theme System | Page 2
          </Text>
        </Slide>
        
        {/* Custom Theme Slide */}
        <Slide>
          {/* Background */}
          <Shape
            type="rect"
            style={{
              x: 0, y: 0, w: 10, h: 7.5,
              fill: theme.colors.background.primary
            }}
          />
          
          {/* Header */}
          <Shape
            type="rect"
            style={{
              x: 0, y: 0, w: 10, h: 0.8,
              fill: theme.colors.primary
            }}
          />
          
          {/* Title */}
          <Text 
            style={{
              x: 0.5, y: 0.15, w: 9, h: 0.5,
              fontSize: theme.fonts.sizes.heading,
              bold: true,
              color: theme.colors.text.light,
              fontFace: theme.fonts.heading
            }}
          >
            Custom Themes
          </Text>
          
          {/* Content */}
          <Text
            style={{
              x: 0.5, y: 1.2, w: 9, h: 0.5,
              fontSize: theme.fonts.sizes.subheading,
              bold: true,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.heading
            }}
          >
            Extending Base Themes
          </Text>
          
          {/* Standard accent color */}
          <Shape
            type="rect"
            style={{
              x: 1, y: 2, w: 3, h: 0.5,
              fill: theme.colors.accent
            }}
          />
          
          <Text
            style={{
              x: 4.5, y: 2.05, w: 4, h: 0.4,
              fontSize: theme.fonts.sizes.body,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.body
            }}
          >
            Standard Accent Color
          </Text>
          
          {/* Custom accent color */}
          <Shape
            type="rect"
            style={{
              x: 1, y: 3, w: 3, h: 0.5,
              fill: customTheme.colors.accent
            }}
          />
          
          <Text
            style={{
              x: 4.5, y: 3.05, w: 4, h: 0.4,
              fontSize: theme.fonts.sizes.body,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.body
            }}
          >
            Custom Accent Color
          </Text>
          
          {/* Theme info */}
          <Text
            style={{
              x: 1, y: 4.5, w: 8, h: 0.4,
              fontSize: theme.fonts.sizes.body,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.body
            }}
          >
            {`Current Theme: ${theme.name}`}
          </Text>
          
          <Text
            style={{
              x: 1, y: 5, w: 8, h: 0.4,
              fontSize: theme.fonts.sizes.body,
              color: theme.colors.text.primary,
              fontFace: theme.fonts.body
            }}
          >
            {`Available Themes: ${themeManager.getThemeNames().join(', ')}`}
          </Text>
          
          {/* Footer */}
          <Shape
            type="rect"
            style={{
              x: 0, y: 7, w: 10, h: 0.5,
              fill: theme.colors.secondary
            }}
          />
          
          <Text
            style={{
              x: 0.5, y: 7.05, w: 9, h: 0.4,
              fontSize: theme.fonts.sizes.caption,
              color: theme.colors.text.secondary,
              align: "right",
              fontFace: theme.fonts.body
            }}
          >
            Enhanced Theme System | Page 3
          </Text>
        </Slide>
      </Presentation>
    );
    
    // Write the presentation to a file
    const outputPath = customOutputPath || path.join(__dirname, '..', config.outputDir, 'themed-presentation.pptx');
    fs.writeFileSync(outputPath, pres);
    console.log(`Presentation created successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error generating presentation:', error);
  }
}

// Export the function to be called by the generate-ppt.js script
module.exports = { generatePresentation }; 