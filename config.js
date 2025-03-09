// config.js
// Central configuration for the PPT generator

const path = require('path');

// Default directories - can be overridden by environment variables
const config = {
  // Base directories
  outputDir: process.env.PPT_OUTPUT_DIR || 'ppt',
  analysisDir: process.env.PPT_ANALYSIS_DIR || 'analysis',
  
  // Full paths (relative to workspace root)
  get outputPath() {
    return path.join(__dirname, 'examples', this.outputDir);
  },
  
  get analysisPath() {
    return path.join(__dirname, 'examples', this.analysisDir);
  },
  
  // Helper function to resolve paths
  resolvePath: function(basePath, fileName) {
    return path.join(basePath, fileName);
  }
};

module.exports = config; 