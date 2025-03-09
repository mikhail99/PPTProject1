const React = require('react');
const { getBaseChartOptions } = require('./BaseChart');

/**
 * BarChart component for creating bar charts in PowerPoint presentations
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
 */
function BarChart(props) {
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
  } = props;
  
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
        
        // Add the chart to the slide
        slide.addChart(barDir === 'bar' ? 'bar' : 'column', data, options);
        
        return null;
      }}
    </React.Fragment>
  );
}

/**
 * ColumnChart component - a convenience wrapper around BarChart with barDir='col'
 */
function ColumnChart(props) {
  return <BarChart {...props} barDir="col" />;
}

module.exports = {
  BarChart,
  ColumnChart
}; 