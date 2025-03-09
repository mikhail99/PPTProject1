// components/charts/index.js
// Export all chart components

const { BaseChart, getBaseChartOptions } = require('./BaseChart');
const { PieChart, DoughnutChart } = require('./PieChart');
const { BarChart, ColumnChart } = require('./BarChart');
const { ExcelBarChart, ExcelColumnChart } = require('./ExcelBarChart');

module.exports = {
  BaseChart,
  getBaseChartOptions,
  PieChart,
  DoughnutChart,
  BarChart,
  ColumnChart,
  ExcelBarChart,
  ExcelColumnChart
}; 