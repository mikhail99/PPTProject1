const React = require('react');
const { getBaseChartOptions } = require('./BaseChart');
const os = require('os');

/**
 * ExcelBarChart component for creating bar charts in PowerPoint presentations using native Excel charts
 * @param {Object} props Component props
 * @param {Array} props.data The data to be displayed in the chart
 * @param {string} props.title The title of the chart
 * @param {number} props.x The x position of the chart on the slide (in inches)
 * @param {number} props.y The y position of the chart on the slide (in inches)
 * @param {number} props.width The width of the chart (in inches)
 * @param {number} props.height The height of the chart (in inches)
 * @param {string} props.barDir Direction of the bars ('bar' or 'col')
 * @param {string} props.barGrouping How to group bars ('clustered', 'stacked', 'percentStacked')
 * @param {string} props.dataLabelPosition Position of data labels ('ctr', 'inEnd', 'inBase', 'outEnd')
 * @param {boolean} props.showValue Whether to show values
 * @param {string} props.catAxisTitle Title for the category axis
 * @param {string} props.valAxisTitle Title for the value axis
 * @param {boolean} props.forceFallback Force using the fallback non-Excel chart implementation
 */
function ExcelBarChart(props) {
  const {
    data,
    barDir = 'bar',
    barGrouping = 'clustered',
    dataLabelPosition = 'outEnd',
    showValue = true,
    catAxisTitle,
    valAxisTitle,
    catAxisOrientation,
    valAxisOrientation,
    valAxisMaxVal,
    valAxisMinVal,
    valAxisMajorUnit,
    forceFallback = false,
  } = props;
  
  // Detect if we're on macOS
  const isMacOS = os.platform() === 'darwin';
  
  // Determine if we should use Excel charts or fallback to standard charts
  // Use fallback if explicitly requested or if on macOS (which has compatibility issues)
  const useFallback = forceFallback || isMacOS;
  
  return (
    <React.Fragment>
      {({ slide }) => {
        // Get base chart options
        const options = getBaseChartOptions(props);
        
        // Add bar-specific options
        options.barDir = barDir;
        options.barGrouping = barGrouping;
        options.dataLabelPosition = dataLabelPosition;
        options.showValue = showValue;
        
        // Add axis options if specified
        if (catAxisTitle) {
          options.catAxisTitle = catAxisTitle;
        }
        
        if (valAxisTitle) {
          options.valAxisTitle = valAxisTitle;
        }
        
        if (catAxisOrientation) {
          options.catAxisOrientation = catAxisOrientation;
        }
        
        if (valAxisOrientation) {
          options.valAxisOrientation = valAxisOrientation;
        }
        
        if (valAxisMaxVal !== undefined) {
          options.valAxisMaxVal = valAxisMaxVal;
        }
        
        if (valAxisMinVal !== undefined) {
          options.valAxisMinVal = valAxisMinVal;
        }
        
        if (valAxisMajorUnit !== undefined) {
          options.valAxisMajorUnit = valAxisMajorUnit;
        }
        
        // Only add Excel-specific options if not using fallback
        if (!useFallback) {
          // Add Excel-specific options
          options.chartType = barDir === 'bar' ? 'barChart' : 'columnChart';
          options.useExcelChart = true;
          options.excelChartOptions = {
            // Excel-specific chart options
            seriesType: barDir === 'bar' ? 'bar' : 'column',
            grouping: barGrouping,
            dataLabels: {
              showValue: showValue,
              position: dataLabelPosition
            },
            axisOptions: {
              primaryCategoryAxis: {
                title: catAxisTitle,
                orientation: catAxisOrientation
              },
              primaryValueAxis: {
                title: valAxisTitle,
                orientation: valAxisOrientation,
                min: valAxisMinVal,
                max: valAxisMaxVal,
                majorUnit: valAxisMajorUnit
              }
            }
          };
        } else {
          // For macOS or when fallback is forced, ensure we're using standard charts
          // by not setting Excel-specific options
          console.log(`Using standard chart fallback for ${barDir === 'bar' ? 'bar' : 'column'} chart (${isMacOS ? 'macOS detected' : 'fallback forced'})`);
        }
        
        // Add the chart to the slide
        slide.addChart(barDir === 'bar' ? 'bar' : 'column', data, options);
        
        return null;
      }}
    </React.Fragment>
  );
}

/**
 * ExcelColumnChart component - a convenience wrapper around ExcelBarChart with barDir='col'
 */
function ExcelColumnChart(props) {
  return <ExcelBarChart {...props} barDir="col" />;
}

module.exports = {
  ExcelBarChart,
  ExcelColumnChart
}; 