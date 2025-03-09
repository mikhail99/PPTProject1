// templates/index.js
// Template gallery management

const fs = require('fs');
const path = require('path');

// Template directory
const TEMPLATES_DIR = path.join(__dirname);

/**
 * Template metadata structure
 * @typedef {Object} TemplateMetadata
 * @property {string} id - Unique identifier for the template
 * @property {string} name - Display name of the template
 * @property {string} description - Description of the template
 * @property {string} category - Category of the template (e.g., 'business', 'education', 'marketing')
 * @property {string} thumbnail - Path to the thumbnail image
 * @property {string} file - Path to the template file
 * @property {string[]} tags - Array of tags for the template
 * @property {string} author - Author of the template
 * @property {string} created - Creation date of the template
 * @property {string} modified - Last modified date of the template
 */

/**
 * Get all available templates
 * @returns {TemplateMetadata[]} - Array of template metadata objects
 */
function getAllTemplates() {
  try {
    // Read the templates directory
    const templateFiles = fs.readdirSync(TEMPLATES_DIR)
      .filter(file => file.endsWith('.json') && file !== 'index.json');
    
    // Parse each template metadata file
    const templates = templateFiles.map(file => {
      try {
        const templatePath = path.join(TEMPLATES_DIR, file);
        const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
        return templateData;
      } catch (error) {
        console.error(`Error parsing template metadata file ${file}:`, error);
        return null;
      }
    }).filter(template => template !== null);
    
    return templates;
  } catch (error) {
    console.error('Error reading templates directory:', error);
    return [];
  }
}

/**
 * Get a template by ID
 * @param {string} id - ID of the template to retrieve
 * @returns {TemplateMetadata|null} - Template metadata object or null if not found
 */
function getTemplateById(id) {
  const templates = getAllTemplates();
  return templates.find(template => template.id === id) || null;
}

/**
 * Get templates by category
 * @param {string} category - Category to filter by
 * @returns {TemplateMetadata[]} - Array of template metadata objects in the specified category
 */
function getTemplatesByCategory(category) {
  const templates = getAllTemplates();
  return templates.filter(template => template.category === category);
}

/**
 * Get templates by tag
 * @param {string} tag - Tag to filter by
 * @returns {TemplateMetadata[]} - Array of template metadata objects with the specified tag
 */
function getTemplatesByTag(tag) {
  const templates = getAllTemplates();
  return templates.filter(template => template.tags.includes(tag));
}

/**
 * Create a new presentation from a template
 * @param {string} templateId - ID of the template to use
 * @param {string} outputPath - Path to save the new presentation
 * @param {Object} data - Data to populate the template with
 * @returns {Promise<string>} - Promise resolving to the path of the generated presentation
 */
async function createFromTemplate(templateId, outputPath, data = {}) {
  try {
    // Get the template metadata
    const template = getTemplateById(templateId);
    if (!template) {
      throw new Error(`Template with ID ${templateId} not found`);
    }
    
    // Check if the template file exists
    const templateFilePath = path.join(TEMPLATES_DIR, template.file);
    if (!fs.existsSync(templateFilePath)) {
      throw new Error(`Template file ${templateFilePath} not found`);
    }
    
    // Import the template module
    const templateModule = require(templateFilePath);
    
    // Generate the presentation
    if (typeof templateModule.generatePresentation !== 'function') {
      throw new Error(`Template ${templateId} does not export a generatePresentation function`);
    }
    
    // Call the template's generatePresentation function with the output path and data
    await templateModule.generatePresentation(outputPath, data);
    
    return outputPath;
  } catch (error) {
    console.error(`Error creating presentation from template ${templateId}:`, error);
    throw error;
  }
}

module.exports = {
  getAllTemplates,
  getTemplateById,
  getTemplatesByCategory,
  getTemplatesByTag,
  createFromTemplate
}; 