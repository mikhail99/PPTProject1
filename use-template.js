// use-template.js
// Script to list and use templates

const fs = require('fs');
const path = require('path');
const config = require('./config');
const templateManager = require('./templates');

// Parse command line arguments
function parseArgs() {
  const args = {
    list: false,
    category: null,
    tag: null,
    id: null,
    output: null,
    data: null
  };

  // Check for flags
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === '--list' || process.argv[i] === '-l') {
      args.list = true;
    } else if (process.argv[i] === '--category' || process.argv[i] === '-c') {
      args.category = process.argv[i + 1];
      i++; // Skip the next argument as it's the value
    } else if (process.argv[i] === '--tag' || process.argv[i] === '-t') {
      args.tag = process.argv[i + 1];
      i++; // Skip the next argument as it's the value
    } else if (process.argv[i] === '--id' || process.argv[i] === '-i') {
      args.id = process.argv[i + 1];
      i++; // Skip the next argument as it's the value
    } else if (process.argv[i] === '--output' || process.argv[i] === '-o') {
      args.output = process.argv[i + 1];
      i++; // Skip the next argument as it's the value
    } else if (process.argv[i] === '--data' || process.argv[i] === '-d') {
      args.data = process.argv[i + 1];
      i++; // Skip the next argument as it's the value
    }
  }

  return args;
}

// Format template for display
function formatTemplate(template) {
  return `
  ID: ${template.id}
  Name: ${template.name}
  Description: ${template.description}
  Category: ${template.category}
  Tags: ${template.tags.join(', ')}
  Author: ${template.author}
  Created: ${template.created}
  Modified: ${template.modified}
  `;
}

// List templates
function listTemplates(category = null, tag = null) {
  let templates;
  
  if (category) {
    templates = templateManager.getTemplatesByCategory(category);
    console.log(`Templates in category '${category}':`);
  } else if (tag) {
    templates = templateManager.getTemplatesByTag(tag);
    console.log(`Templates with tag '${tag}':`);
  } else {
    templates = templateManager.getAllTemplates();
    console.log('All available templates:');
  }
  
  if (templates.length === 0) {
    console.log('No templates found.');
    return;
  }
  
  templates.forEach(template => {
    console.log(formatTemplate(template));
  });
  
  console.log(`Total: ${templates.length} template(s)`);
}

// Use a template to create a presentation
async function useTemplate(templateId, outputPath, dataPath = null) {
  try {
    // Get the template
    const template = templateManager.getTemplateById(templateId);
    if (!template) {
      console.error(`Template with ID '${templateId}' not found.`);
      process.exit(1);
    }
    
    console.log(`Using template: ${template.name}`);
    
    // Load data if provided
    let data = {};
    if (dataPath) {
      try {
        const dataContent = fs.readFileSync(dataPath, 'utf8');
        data = JSON.parse(dataContent);
        console.log(`Loaded data from ${dataPath}`);
      } catch (error) {
        console.error(`Error loading data from ${dataPath}:`, error);
        process.exit(1);
      }
    }
    
    // Determine output path
    const finalOutputPath = outputPath || path.join(__dirname, 'examples', config.outputDir, `${templateId}.pptx`);
    
    // Create the output directory if it doesn't exist
    const outputDir = path.dirname(finalOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Create the presentation from the template
    console.log(`Creating presentation at ${finalOutputPath}`);
    await templateManager.createFromTemplate(templateId, finalOutputPath, data);
    
    console.log(`Presentation created successfully: ${finalOutputPath}`);
  } catch (error) {
    console.error('Error using template:', error);
    process.exit(1);
  }
}

// Main function
async function main() {
  const args = parseArgs();
  
  // List templates
  if (args.list) {
    listTemplates(args.category, args.tag);
    return;
  }
  
  // Use a template
  if (args.id) {
    await useTemplate(args.id, args.output, args.data);
    return;
  }
  
  // Show usage if no valid arguments
  console.log('Usage:');
  console.log('  List templates:');
  console.log('    node use-template.js --list');
  console.log('    node use-template.js --list --category business');
  console.log('    node use-template.js --list --tag financial');
  console.log('');
  console.log('  Use a template:');
  console.log('    node use-template.js --id business-quarterly --output ./my-report.pptx');
  console.log('    node use-template.js --id business-quarterly --output ./my-report.pptx --data ./my-data.json');
}

// Run the main function
main(); 