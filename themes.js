// themes.js
// Enhanced theme management system

/**
 * Theme definitions for presentations
 * Each theme includes color schemes, fonts, and styling options
 */
const themes = {
  // Blue theme
  blue: {
    name: 'Blue',
    colors: {
      primary: '#0066CC',
      secondary: '#E6F0FF',
      accent: '#FF9900',
      text: {
        primary: '#333333',
        secondary: '#666666',
        light: '#FFFFFF'
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F5F9FF',
        dark: '#0A4F9C'
      }
    },
    fonts: {
      heading: 'Arial',
      body: 'Arial',
      sizes: {
        title: 44,
        subtitle: 28,
        heading: 32,
        subheading: 24,
        body: 18,
        caption: 14
      }
    },
    shapes: {
      borderRadius: 0.1,
      lineWidth: 1
    }
  },
  
  // Green theme
  green: {
    name: 'Green',
    colors: {
      primary: '#33CC33',
      secondary: '#E6FFE6',
      accent: '#FF6600',
      text: {
        primary: '#333333',
        secondary: '#666666',
        light: '#FFFFFF'
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F5FFF5',
        dark: '#1A991A'
      }
    },
    fonts: {
      heading: 'Arial',
      body: 'Arial',
      sizes: {
        title: 44,
        subtitle: 28,
        heading: 32,
        subheading: 24,
        body: 18,
        caption: 14
      }
    },
    shapes: {
      borderRadius: 0.1,
      lineWidth: 1
    }
  },
  
  // Dark theme
  dark: {
    name: 'Dark',
    colors: {
      primary: '#333333',
      secondary: '#555555',
      accent: '#00CCFF',
      text: {
        primary: '#FFFFFF',
        secondary: '#CCCCCC',
        light: '#FFFFFF'
      },
      background: {
        primary: '#222222',
        secondary: '#333333',
        dark: '#111111'
      }
    },
    fonts: {
      heading: 'Arial',
      body: 'Arial',
      sizes: {
        title: 44,
        subtitle: 28,
        heading: 32,
        subheading: 24,
        body: 18,
        caption: 14
      }
    },
    shapes: {
      borderRadius: 0.1,
      lineWidth: 1
    }
  },
  
  // Light theme
  light: {
    name: 'Light',
    colors: {
      primary: '#F2F2F2',
      secondary: '#FFFFFF',
      accent: '#0066CC',
      text: {
        primary: '#333333',
        secondary: '#666666',
        light: '#999999'
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F9F9F9',
        dark: '#EEEEEE'
      }
    },
    fonts: {
      heading: 'Arial',
      body: 'Arial',
      sizes: {
        title: 44,
        subtitle: 28,
        heading: 32,
        subheading: 24,
        body: 18,
        caption: 14
      }
    },
    shapes: {
      borderRadius: 0.1,
      lineWidth: 1
    }
  },
  
  // Corporate theme
  corporate: {
    name: 'Corporate',
    colors: {
      primary: '#003366',
      secondary: '#E6EEF5',
      accent: '#CC0000',
      text: {
        primary: '#333333',
        secondary: '#666666',
        light: '#FFFFFF'
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F5F8FC',
        dark: '#002244'
      }
    },
    fonts: {
      heading: 'Arial',
      body: 'Arial',
      sizes: {
        title: 40,
        subtitle: 26,
        heading: 30,
        subheading: 22,
        body: 16,
        caption: 12
      }
    },
    shapes: {
      borderRadius: 0,
      lineWidth: 1
    }
  },
  
  // Modern theme
  modern: {
    name: 'Modern',
    colors: {
      primary: '#2D3E50',
      secondary: '#ECF0F1',
      accent: '#E74C3C',
      text: {
        primary: '#2D3E50',
        secondary: '#7F8C8D',
        light: '#FFFFFF'
      },
      background: {
        primary: '#FFFFFF',
        secondary: '#F9FAFB',
        dark: '#1A242F'
      }
    },
    fonts: {
      heading: 'Arial',
      body: 'Arial',
      sizes: {
        title: 48,
        subtitle: 30,
        heading: 36,
        subheading: 24,
        body: 18,
        caption: 14
      }
    },
    shapes: {
      borderRadius: 0.2,
      lineWidth: 2
    }
  }
};

/**
 * Get a theme by name
 * @param {string} themeName - Name of the theme to retrieve
 * @returns {Object} - Theme object or default theme if not found
 */
function getTheme(themeName) {
  return themes[themeName] || themes.blue;
}

/**
 * Get all available themes
 * @returns {Object} - Object containing all themes
 */
function getAllThemes() {
  return themes;
}

/**
 * Get a list of theme names
 * @returns {Array} - Array of theme names
 */
function getThemeNames() {
  return Object.keys(themes);
}

/**
 * Create a custom theme by extending an existing theme
 * @param {string} baseThemeName - Name of the base theme to extend
 * @param {Object} customizations - Custom theme properties to override
 * @returns {Object} - New theme object
 */
function createCustomTheme(baseThemeName, customizations) {
  const baseTheme = getTheme(baseThemeName);
  
  // Deep merge the base theme with customizations
  return deepMerge(baseTheme, customizations);
}

/**
 * Helper function to deep merge objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} - Merged object
 */
function deepMerge(target, source) {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  
  return output;
}

/**
 * Helper function to check if a value is an object
 * @param {*} item - Value to check
 * @returns {boolean} - True if the value is an object
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

module.exports = {
  getTheme,
  getAllThemes,
  getThemeNames,
  createCustomTheme
}; 