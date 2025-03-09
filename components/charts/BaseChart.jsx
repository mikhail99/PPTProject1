const React = require('react');

/**
 * BaseChart component that provides common functionality for all chart types.
 * This is an abstract component that shouldn't be used directly.
 */
function BaseChart({
  x = 1,
  y = 1,
  width = 5,
  height = 3,
  title = '',
  showTitle = true,
  showLegend = true,
  legendPosition = 'right',
  chartColors,
  dataLabelFormatCode,
  border = false,
  layout,
  shadow,
}) {
  // This is an abstract component, so it doesn't render anything directly
  return null;
}

/**
 * Prepares common chart options from props
 * @param {Object} props Base chart properties
 * @returns {Object} Object with common chart options
 */
function getBaseChartOptions(props) {
  const {
    x = 1,
    y = 1,
    width = 5,
    height = 3,
    title = '',
    showTitle = true,
    showLegend = true,
    legendPosition = 'right',
    chartColors,
    dataLabelFormatCode,
    border = false,
    layout,
    shadow,
  } = props;

  const options = {
    x,
    y,
    w: width,
    h: height,
    showTitle,
    title,
    showLegend,
    legendPos: legendPosition,
  };

  if (chartColors) {
    options.chartColors = chartColors;
  }

  if (dataLabelFormatCode) {
    options.dataLabelFormatCode = dataLabelFormatCode;
  }

  if (border) {
    options.border = { pt: 1, color: '000000' };
  }

  if (layout) {
    options.layout = layout;
  }

  if (shadow) {
    options.shadow = shadow;
  }

  return options;
}

module.exports = {
  BaseChart,
  getBaseChartOptions
}; 