// GridLayout.jsx
// A component for creating grid layouts in PowerPoint slides

const React = require('react');

/**
 * GridLayout component for creating grid-based layouts on slides
 * @param {Object} props Component props
 * @param {Array} props.children Child elements to position in the grid
 * @param {number} props.columns Number of columns in the grid
 * @param {number} props.startX Starting X position of the grid (in inches)
 * @param {number} props.startY Starting Y position of the grid (in inches)
 * @param {number} props.width Total width of the grid (in inches)
 * @param {number} props.height Total height of the grid (in inches)
 * @param {number} props.columnGap Gap between columns (in inches)
 * @param {number} props.rowGap Gap between rows (in inches)
 * @param {boolean} props.autoFlow Whether to automatically flow items (true) or use explicit positioning (false)
 * @param {Object} props.style Additional styling for the grid
 */
function GridLayout({ 
  children,
  columns = 2,
  startX = 0.5,
  startY = 1.5,
  width = 9,
  height = 5,
  columnGap = 0.5,
  rowGap = 0.5,
  autoFlow = true,
  style = {}
}) {
  // Convert children to array if it's not already
  const childrenArray = React.Children.toArray(children);
  
  if (childrenArray.length === 0) {
    return null;
  }
  
  // Calculate the number of rows needed
  const rows = Math.ceil(childrenArray.length / columns);
  
  // Calculate cell dimensions
  const cellWidth = (width - (columnGap * (columns - 1))) / columns;
  const cellHeight = (height - (rowGap * (rows - 1))) / rows;
  
  // Position each child in the grid
  return childrenArray.map((child, index) => {
    if (!child) return null;
    
    let gridColumn, gridRow;
    
    if (autoFlow) {
      // Auto flow positioning (left-to-right, top-to-bottom)
      gridColumn = index % columns;
      gridRow = Math.floor(index / columns);
    } else {
      // Use explicit positioning if provided in the child's props
      const childProps = child.props || {};
      gridColumn = childProps.gridColumn !== undefined ? childProps.gridColumn : index % columns;
      gridRow = childProps.gridRow !== undefined ? childProps.gridRow : Math.floor(index / columns);
    }
    
    // Calculate position
    const x = startX + (gridColumn * (cellWidth + columnGap));
    const y = startY + (gridRow * (cellHeight + rowGap));
    
    // Clone the child with updated position
    return React.cloneElement(child, {
      key: index,
      style: {
        ...(child.props.style || {}),
        x,
        y,
        w: cellWidth,
        h: cellHeight,
        ...style
      }
    });
  });
}

/**
 * GridItem component for positioning items within a GridLayout
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child element to render
 * @param {number} props.gridColumn Column position (0-based)
 * @param {number} props.gridRow Row position (0-based)
 * @param {number} props.colSpan Number of columns this item spans
 * @param {number} props.rowSpan Number of rows this item spans
 * @param {Object} props.style Additional styling for the item
 */
function GridItem({
  children,
  gridColumn,
  gridRow,
  colSpan = 1,
  rowSpan = 1,
  style = {}
}) {
  // This component is mainly a wrapper to pass grid positioning props
  // The actual positioning is handled by the GridLayout component
  return React.cloneElement(React.Children.only(children), {
    gridColumn,
    gridRow,
    colSpan,
    rowSpan,
    style: {
      ...(children.props.style || {}),
      ...style
    }
  });
}

// Export both components
module.exports = {
  GridLayout,
  GridItem
}; 