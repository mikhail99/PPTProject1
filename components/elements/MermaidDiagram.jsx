// MermaidDiagram.jsx
// A component for rendering Mermaid diagrams in PowerPoint slides

const React = require('react');
const { Text, Image, Shape } = require('react-pptx');
const path = require('path');
const fs = require('fs');

// Cache for storing generated diagram images
const diagramCache = {};
// Cache for storing image dimensions
const dimensionCache = {};

/**
 * Determine the diagram type from the Mermaid code
 * @param {string} code - Mermaid diagram code
 * @returns {string} - The diagram type (flowchart, sequence, class, gantt)
 */
function getDiagramType(code) {
  const trimmedCode = code.trim().toLowerCase();
  
  if (trimmedCode.startsWith('graph') || trimmedCode.startsWith('flowchart')) {
    return 'flowchart';
  } else if (trimmedCode.startsWith('sequencediagram')) {
    return 'sequence';
  } else if (trimmedCode.startsWith('classdiagram')) {
    return 'class';
  } else if (trimmedCode.startsWith('gantt')) {
    return 'gantt';
  }
  
  // Default to flowchart if we can't determine the type
  return 'flowchart';
}

/**
 * Calculate dimensions that preserve aspect ratio
 * @param {number} originalWidth - Original width of the image
 * @param {number} originalHeight - Original height of the image
 * @param {number} maxWidth - Maximum width available
 * @param {number} maxHeight - Maximum height available
 * @returns {Object} - Object with width and height properties
 */
function calculateDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
  // Calculate aspect ratio
  const aspectRatio = originalWidth / originalHeight;
  
  // Start with maximum dimensions
  let width = maxWidth;
  let height = maxHeight;
  
  // Adjust dimensions to preserve aspect ratio
  if (width / height > aspectRatio) {
    // Available space is wider than needed
    width = height * aspectRatio;
  } else {
    // Available space is taller than needed
    height = width / aspectRatio;
  }
  
  return { width, height };
}

/**
 * Get image dimensions from a file
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<Object>} - Promise that resolves to an object with width and height properties
 */
function getImageDimensions(imagePath) {
  // Check if we have cached dimensions
  if (dimensionCache[imagePath]) {
    return dimensionCache[imagePath];
  }
  
  // For PNG files, we can't easily get dimensions without additional libraries
  // For simplicity, we'll use some reasonable defaults based on diagram type
  const filename = path.basename(imagePath).toLowerCase();
  let dimensions = { width: 800, height: 600 }; // Default dimensions
  
  if (filename.includes('flowchart')) {
    dimensions = { width: 800, height: 600 };
  } else if (filename.includes('sequence')) {
    dimensions = { width: 800, height: 800 };
  } else if (filename.includes('class')) {
    dimensions = { width: 800, height: 600 };
  } else if (filename.includes('gantt')) {
    dimensions = { width: 1000, height: 500 };
  }
  
  // Cache the dimensions
  dimensionCache[imagePath] = dimensions;
  return dimensions;
}

/**
 * MermaidDiagram component for rendering Mermaid diagrams in PowerPoint
 * 
 * @param {Object} props
 * @param {string} props.code - Mermaid diagram code
 * @param {number} props.x - X position of the diagram
 * @param {number} props.y - Y position of the diagram
 * @param {number} props.width - Width of the diagram
 * @param {number} props.height - Height of the diagram
 * @param {string} props.theme - Theme for the diagram ('default', 'forest', 'dark', 'neutral')
 * @param {Object} props.style - Additional styling for the diagram
 * @param {string} props.id - Optional ID for the diagram (used for caching)
 * @param {boolean} props.showCode - Whether to show the Mermaid code (defaults to false)
 * @param {boolean} props.preserveAspectRatio - Whether to preserve the aspect ratio (defaults to true)
 */
function MermaidDiagram({
  code,
  x = 1,
  y = 1,
  width = 8,
  height = 4,
  theme = 'default',
  style = {},
  id,
  showCode = false,
  preserveAspectRatio = true
}) {
  // If no code is provided, return null
  if (!code) {
    return null;
  }

  // Determine the diagram type from the code
  const diagramType = id || getDiagramType(code);
  
  // Check if we have a cached image for this diagram
  const cacheKey = `${diagramType}-${theme}`;
  
  // Try to get the image from the cache or find the file
  let imageData = null;
  let imagePath = null;
  
  try {
    // Check if we have a cached image
    if (diagramCache[cacheKey]) {
      imageData = diagramCache[cacheKey];
    } else {
      // Check for the preprocessed image file
      const tempDir = path.join(__dirname, '..', '..', 'examples', 'temp');
      
      // Try different possible filenames with PNG extension
      const possibleFilenames = [
        `mermaid-${diagramType}-${theme}.png`,
        `mermaid-${diagramType.toLowerCase()}-${theme}.png`
      ];
      
      for (const filename of possibleFilenames) {
        const fullPath = path.join(tempDir, filename);
        if (fs.existsSync(fullPath)) {
          imagePath = fullPath;
          break;
        }
      }
      
      if (imagePath) {
        // Read the image file
        const buffer = fs.readFileSync(imagePath);
        imageData = `data:image/png;base64,${buffer.toString('base64')}`;
        diagramCache[cacheKey] = imageData;
        console.log(`Found and loaded Mermaid diagram: ${imagePath}`);
      } else {
        console.log(`Could not find Mermaid diagram for ${diagramType} with theme ${theme}`);
      }
    }
  } catch (error) {
    console.error('Error loading Mermaid diagram:', error);
  }
  
  // If we have image data, render the image
  if (imageData) {
    // Calculate dimensions that preserve aspect ratio if requested
    let finalWidth = width;
    let finalHeight = height;
    let finalX = x;
    let finalY = y;
    
    if (preserveAspectRatio && imagePath) {
      const originalDimensions = getImageDimensions(imagePath);
      const newDimensions = calculateDimensions(
        originalDimensions.width, 
        originalDimensions.height, 
        width, 
        height
      );
      
      finalWidth = newDimensions.width;
      finalHeight = newDimensions.height;
      
      // Center the image in the available space
      finalX = x + (width - finalWidth) / 2;
      finalY = y + (height - finalHeight) / 2;
    }
    
    return (
      <React.Fragment>
        <Image
          src={{
            kind: 'data',
            data: imageData
          }}
          style={{
            x: finalX,
            y: finalY,
            w: finalWidth,
            h: finalHeight,
            ...style
          }}
        />
        
        {/* Optionally show the code below the diagram */}
        {showCode && (
          <Text
            style={{
              x: x,
              y: y + height + 0.2,
              w: width,
              h: 1,
              fontSize: 8,
              color: '#666666',
              align: 'left'
            }}
          >
            {code}
          </Text>
        )}
      </React.Fragment>
    );
  }
  
  // If we don't have image data, render a placeholder
  return (
    <React.Fragment>
      {/* Background rectangle */}
      <Shape
        type="rect"
        style={{
          x: x,
          y: y,
          w: width,
          h: height,
          fill: { color: '#f5f5f5' },
          line: { color: '#cccccc', width: 1 }
        }}
      />
      
      {/* Title */}
      <Text
        style={{
          x: x + 0.2,
          y: y + 0.2,
          w: width - 0.4,
          h: 0.5,
          fontSize: 14,
          bold: true,
          color: '#333333',
          align: 'left'
        }}
      >
        {`Mermaid Diagram (${diagramType}, ${theme} theme)`}
      </Text>
      
      {/* Code */}
      <Text
        style={{
          x: x + 0.2,
          y: y + 0.8,
          w: width - 0.4,
          h: height - 1,
          fontSize: 10,
          color: '#666666',
          align: 'left',
          verticalAlign: 'top'
        }}
      >
        {code}
      </Text>
      
      {/* Note about preprocessing */}
      <Text
        style={{
          x: x + 0.2,
          y: y + height - 0.5,
          w: width - 0.4,
          h: 0.3,
          fontSize: 8,
          italic: true,
          color: '#999999',
          align: 'center'
        }}
      >
        Note: Run the mermaid-preprocessor.js script to generate diagram images
      </Text>
    </React.Fragment>
  );
}

module.exports = MermaidDiagram;

/**
 * Note: To fully implement Mermaid diagrams in PowerPoint, you would need to:
 * 
 * 1. Pre-generate the diagram images using a service like mermaid.ink or a local Mermaid CLI
 * 2. Save the images to a temporary location or convert them to base64
 * 3. Include the images in the presentation using the Image component
 * 
 * This would typically be done in a preprocessing step before generating the presentation,
 * as react-pptx doesn't support asynchronous rendering during the presentation generation.
 * 
 * Example implementation for preprocessing:
 * 
 * ```javascript
 * // In a preprocessing script
 * const mermaidDiagrams = [];
 * 
 * // Find all Mermaid diagrams in your presentation data
 * for (const slide of presentationData.slides) {
 *   for (const element of slide.elements) {
 *     if (element.type === 'mermaid') {
 *       // Generate the diagram image
 *       const imageData = await generateMermaidImage(element.code, element.theme);
 *       
 *       // Store the image data
 *       mermaidDiagrams.push({
 *         id: element.id,
 *         imageData
 *       });
 *     }
 *   }
 * }
 * 
 * // Then in your presentation JSX, use the pre-generated images
 * ```
 */ 