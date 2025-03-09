// Timeline.jsx
// A component for visualizing chronological events

const React = require('react');
const { Text, Shape } = require('react-pptx');

/**
 * Timeline component for visualizing chronological events
 * @param {Object} props
 * @param {Array} props.events - Array of event objects with {date, title, description, color}
 * @param {number} props.x - X position of the timeline
 * @param {number} props.y - Y position of the timeline
 * @param {number} props.width - Width of the timeline
 * @param {string} props.orientation - 'horizontal' or 'vertical'
 * @param {Object} props.style - Style object for the timeline
 * @param {string} props.lineColor - Color of the timeline line
 * @param {number} props.lineWidth - Width of the timeline line
 */
function Timeline({
  events = [],
  x = 1,
  y = 1,
  width = 8,
  orientation = 'horizontal',
  style = {},
  lineColor = '#333333',
  lineWidth = 0.05
}) {
  if (!events || events.length === 0) {
    return null;
  }

  const isHorizontal = orientation === 'horizontal';
  const timelineLength = isHorizontal ? width : 5; // Default height for vertical timeline
  
  // Calculate spacing between events
  const spacing = events.length > 1 ? timelineLength / (events.length - 1) : timelineLength;
  
  // Default styles
  const defaultStyle = {
    title: { fontSize: 14, bold: true },
    date: { fontSize: 12, color: '#666666' },
    description: { fontSize: 10, color: '#333333' },
    point: { w: 0.2, h: 0.2 }
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
      {/* Main timeline line */}
      <Shape
        type="line"
        x={safeX}
        y={safeY}
        w={isHorizontal ? timelineLength : 0}
        h={isHorizontal ? 0 : timelineLength}
        style={{
          line: {
            color: lineColor,
            width: lineWidth,
            dashType: style.dashType || 'solid'
          }
        }}
      />

      {/* Event points and labels */}
      {events.map((event, index) => {
        const position = index * spacing;
        const pointX = isHorizontal ? safeX + position : safeX;
        const pointY = isHorizontal ? safeY : safeY + position;
        const color = event.color || '#0066CC';
        
        // Alternate sides for text in horizontal timeline
        // For horizontal timelines, even indices go above, odd indices go below
        // For vertical timelines, all text goes to the right
        const textSide = isHorizontal 
          ? (index % 2 === 0 ? -1 : 1) 
          : 1;
        
        // Calculate text position
        // For horizontal timeline: alternate above/below the line
        // For vertical timeline: always to the right of the line
        const textX = isHorizontal 
          ? pointX - (textSide < 0 ? 1 : 0) 
          : pointX + 0.3;
          
        const textY = isHorizontal 
          ? pointY + (textSide * 0.3) 
          : pointY - 0.1;
        
        return (
          <React.Fragment key={index}>
            {/* Event point */}
            <Shape
              type="ellipse"
              x={pointX - (mergedStyle.point.w / 2)}
              y={pointY - (mergedStyle.point.h / 2)}
              w={mergedStyle.point.w}
              h={mergedStyle.point.h}
              style={{ 
                fill: { color: color },
                line: { color: color, width: 1 }
              }}
            />
            
            {/* Date */}
            <Text
              x={textX}
              y={textY}
              w={2}
              h={0.25}
              style={{
                ...mergedStyle.date,
                align: isHorizontal ? (textSide < 0 ? 'right' : 'left') : 'left'
              }}
            >
              {event.date}
            </Text>
            
            {/* Title */}
            <Text
              x={textX}
              y={textY + 0.25}
              w={2}
              h={0.25}
              style={{
                ...mergedStyle.title,
                align: isHorizontal ? (textSide < 0 ? 'right' : 'left') : 'left',
                color: event.color || mergedStyle.title.color
              }}
            >
              {event.title}
            </Text>
            
            {/* Description */}
            {event.description && (
              <Text
                x={textX}
                y={textY + 0.5}
                w={2}
                h={0.5}
                style={{
                  ...mergedStyle.description,
                  align: isHorizontal ? (textSide < 0 ? 'right' : 'left') : 'left'
                }}
              >
                {event.description}
              </Text>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

module.exports = Timeline; 