// data-loader.js
// Utility for loading data from various sources

const fs = require('fs');
const path = require('path');
const config = require('./config');

/**
 * Load data from a CSV file
 * @param {string} filePath - Path to the CSV file
 * @param {Object} options - Options for parsing
 * @returns {Promise<Array>} - Promise resolving to array of data objects
 */
function loadCSVData(filePath, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      // Read the file
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Split by lines
      const lines = fileContent.split('\n').filter(line => line.trim());
      
      // Get headers from first line
      const headers = lines[0].split(',').map(header => header.trim());
      
      // Parse data rows
      const results = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(value => value.trim());
        
        // Skip if values length doesn't match headers
        if (values.length !== headers.length) continue;
        
        // Create object from headers and values
        const obj = {};
        headers.forEach((header, index) => {
          // Try to convert to number if possible
          const value = values[index];
          obj[header] = isNaN(value) ? value : Number(value);
        });
        
        results.push(obj);
      }
      
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Load data from a JSON file
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<Object|Array>} - Promise resolving to parsed JSON data
 */
function loadJSONData(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Transform data for chart components
 * @param {Array} data - Array of data objects
 * @param {string} labelField - Field to use for labels
 * @param {string} valueField - Field to use for values
 * @param {string} colorField - Optional field to use for colors
 * @param {string} defaultColor - Default color if colorField is not provided
 * @returns {Array} - Transformed data for chart components
 */
function transformChartData(data, labelField, valueField, colorField = null, defaultColor = '#0066CC') {
  return data.map(item => ({
    label: item[labelField],
    value: item[valueField],
    color: colorField && item[colorField] ? item[colorField] : defaultColor
  }));
}

module.exports = {
  loadCSVData,
  loadJSONData,
  transformChartData
}; 