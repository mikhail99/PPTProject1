// html-renderer.jsx
// A React component to render the presentation components as HTML

const React = require('react');
const ReactDOM = require('react-dom');
const fs = require('fs');
const path = require('path');

// HTML versions of our components
const HTMLTimeline = ({ events, orientation = 'horizontal' }) => {
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div className={`timeline ${isHorizontal ? 'horizontal' : 'vertical'}`}>
      <div className="timeline-line"></div>
      {events.map((event, index) => (
        <div 
          key={index} 
          className="timeline-event"
          style={{ 
            [isHorizontal ? 'left' : 'top']: `${(index / (events.length - 1)) * 100}%`,
            [isHorizontal ? 'top' : 'left']: `${index % 2 === 0 ? -50 : 50}px`
          }}
        >
          <div 
            className="timeline-point" 
            style={{ backgroundColor: event.color || '#0066CC' }}
          ></div>
          <div className="timeline-content">
            <div className="timeline-date">{event.date}</div>
            <div className="timeline-title" style={{ color: event.color || '#0066CC' }}>
              {event.title}
            </div>
            {event.description && (
              <div className="timeline-description">{event.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const HTMLInfoGraphic = ({ items, columns = 2 }) => {
  return (
    <div className="infographic" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {items.map((item, index) => (
        <div key={index} className="infographic-item">
          <div className="infographic-header" style={{ borderColor: item.color || '#0066CC' }}>
            {item.icon && (
              <div 
                className={`infographic-icon ${item.icon.type}`}
                style={{ backgroundColor: item.color || '#0066CC' }}
              ></div>
            )}
            <div className="infographic-value" style={{ color: item.color || '#0066CC' }}>
              {item.value}
            </div>
          </div>
          <div className="infographic-label">{item.label}</div>
          {item.description && (
            <div className="infographic-description">{item.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};

const HTMLComparisonTable = ({ headers, rows, columnColors = [] }) => {
  return (
    <table className="comparison-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th 
              key={index} 
              style={{ 
                backgroundColor: index === 0 
                  ? '#333333' 
                  : (columnColors[index - 1] || '#0066CC'),
                color: '#FFFFFF'
              }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even' : 'odd'}>
            <td className="feature-cell">{row.feature}</td>
            {row.values.map((value, colIndex) => (
              <td key={colIndex} className="value-cell">
                {value === true ? (
                  <span className="checkmark" style={{ color: columnColors[colIndex] || '#0066CC' }}>✓</span>
                ) : value === false ? (
                  <span className="xmark">✗</span>
                ) : (
                  value
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const HTMLQuoteBlock = ({ quote, author, source, theme = 'blue', style = 'modern' }) => {
  const themes = {
    blue: { primary: '#0066CC', secondary: '#E6F0FF' },
    green: { primary: '#33CC33', secondary: '#E6FFE6' },
    orange: { primary: '#FF9900', secondary: '#FFF6E6' },
    red: { primary: '#CC3333', secondary: '#FFE6E6' },
    purple: { primary: '#9933CC', secondary: '#F2E6FF' }
  };
  
  const themeColors = themes[theme] || themes.blue;
  
  return (
    <div className={`quote-block ${style}`} style={{ backgroundColor: themeColors.secondary }}>
      {style === 'modern' && (
        <div className="quote-accent" style={{ backgroundColor: themeColors.primary }}></div>
      )}
      <div className="quote-content">
        {style !== 'minimal' && <span className="quote-mark open">"</span>}
        <p className="quote-text">{quote}</p>
        {style !== 'minimal' && <span className="quote-mark close">"</span>}
      </div>
      {author && (
        <div className="quote-attribution">
          — {author}{source ? `, ${source}` : ''}
        </div>
      )}
    </div>
  );
};

// Main HTML presentation component
const HTMLPresentation = () => {
  return (
    <div className="html-presentation">
      <div className="slide title-slide">
        <h1>Visual Components Showcase</h1>
        <h2>Demonstrating the power of component-based presentations</h2>
        <p className="date">{new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="slide content-slide">
        <h2>Project Timeline</h2>
        <HTMLTimeline events={timelineEvents} orientation="horizontal" />
      </div>
      
      <div className="slide content-slide">
        <h2>Key Performance Indicators</h2>
        <HTMLInfoGraphic items={infographicItems} columns={2} />
      </div>
      
      <div className="slide content-slide">
        <h2>Feature Comparison</h2>
        <HTMLComparisonTable 
          headers={comparisonHeaders}
          rows={comparisonRows}
          columnColors={['#0066CC', '#33CC33', '#FF9900']}
        />
      </div>
      
      <div className="slide content-slide">
        <h2>Customer Testimonials</h2>
        <div className="quotes-container">
          <HTMLQuoteBlock 
            quote={quotes[0].quote}
            author={quotes[0].author}
            source={quotes[0].source}
            theme={quotes[0].theme}
            style={quotes[0].style}
          />
          <HTMLQuoteBlock 
            quote={quotes[1].quote}
            author={quotes[1].author}
            source={quotes[1].source}
            theme={quotes[1].theme}
            style={quotes[1].style}
          />
        </div>
      </div>
      
      <div className="slide template-slide">
        <div className="header-bar"></div>
        <h2>Combined Components</h2>
        <div className="combined-layout">
          <div className="column">
            <HTMLTimeline 
              events={timelineEvents.slice(0, 3)} 
              orientation="vertical" 
            />
            <HTMLQuoteBlock 
              quote={quotes[2].quote}
              author={quotes[2].author}
              source={quotes[2].source}
              theme={quotes[2].theme}
              style={quotes[2].style}
            />
          </div>
          <div className="column">
            <HTMLInfoGraphic 
              items={infographicItems.slice(0, 2)}
              columns={1}
            />
          </div>
        </div>
        <div className="footer-bar"></div>
      </div>
    </div>
  );
};

// CSS styles for the HTML components
const styles = `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
  }
  
  .html-presentation {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .slide {
    margin: 40px 0;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .title-slide {
    text-align: center;
    padding: 50px 20px;
  }
  
  .title-slide h1 {
    color: #0066CC;
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  .title-slide h2 {
    color: #666;
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .title-slide .date {
    color: #888;
    font-size: 16px;
  }
  
  .content-slide h2 {
    color: #0066CC;
    font-size: 28px;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  
  /* Timeline styles */
  .timeline {
    position: relative;
    margin: 50px 0;
  }
  
  .timeline.horizontal {
    height: 200px;
  }
  
  .timeline.vertical {
    height: 400px;
    width: 200px;
    margin-left: 50px;
  }
  
  .timeline-line {
    position: absolute;
    background-color: #0066CC;
    height: 3px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .timeline.vertical .timeline-line {
    width: 3px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  
  .timeline-event {
    position: absolute;
    transform: translate(-50%, -50%);
  }
  
  .timeline.vertical .timeline-event {
    transform: translate(0, -50%);
  }
  
  .timeline-point {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #0066CC;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  
  .timeline-content {
    position: absolute;
    width: 150px;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .timeline.horizontal .timeline-event:nth-child(odd) .timeline-content {
    top: 30px;
  }
  
  .timeline.vertical .timeline-content {
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .timeline-date {
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
  }
  
  .timeline-title {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .timeline-description {
    font-size: 12px;
  }
  
  /* InfoGraphic styles */
  .infographic {
    display: grid;
    grid-gap: 20px;
    margin: 30px 0;
  }
  
  .infographic-item {
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .infographic-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 2px solid;
    padding-bottom: 10px;
  }
  
  .infographic-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  
  .infographic-icon.ellipse {
    border-radius: 50%;
  }
  
  .infographic-icon.rect {
    border-radius: 0;
  }
  
  .infographic-icon.roundRect {
    border-radius: 5px;
  }
  
  .infographic-value {
    font-size: 32px;
    font-weight: bold;
  }
  
  .infographic-label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .infographic-description {
    font-size: 14px;
    color: #666;
  }
  
  /* Comparison Table styles */
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 30px 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .comparison-table th, .comparison-table td {
    padding: 12px 15px;
    text-align: center;
  }
  
  .comparison-table th {
    background-color: #0066CC;
    color: white;
  }
  
  .comparison-table th:first-child {
    text-align: left;
  }
  
  .comparison-table tr.even {
    background-color: #f9f9f9;
  }
  
  .comparison-table tr.odd {
    background-color: #fff;
  }
  
  .comparison-table .feature-cell {
    font-weight: bold;
    text-align: left;
    background-color: #f5f5f5;
  }
  
  .comparison-table .checkmark {
    color: #33CC33;
    font-size: 18px;
    font-weight: bold;
  }
  
  .comparison-table .xmark {
    color: #CC3333;
    font-size: 18px;
    font-weight: bold;
  }
  
  /* Quote Block styles */
  .quote-block {
    position: relative;
    padding: 20px;
    margin: 20px 0;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .quote-block.modern {
    padding-left: 30px;
  }
  
  .quote-accent {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 10px;
    border-radius: 5px 0 0 5px;
  }
  
  .quote-content {
    position: relative;
    font-style: italic;
  }
  
  .quote-mark {
    font-size: 48px;
    line-height: 0;
    position: relative;
    color: #ccc;
  }
  
  .quote-mark.open {
    top: 15px;
    margin-right: 5px;
  }
  
  .quote-mark.close {
    bottom: -15px;
    margin-left: 5px;
  }
  
  .quote-text {
    display: inline;
    font-size: 16px;
  }
  
  .quote-attribution {
    text-align: right;
    margin-top: 15px;
    font-size: 14px;
    color: #666;
  }
  
  .quotes-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  /* Template slide styles */
  .template-slide {
    position: relative;
    padding-top: 60px;
    padding-bottom: 60px;
  }
  
  .header-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background-color: #0066CC;
  }
  
  .footer-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background-color: #E6F0FF;
  }
  
  .template-slide h2 {
    margin-top: 0;
    color: #333;
  }
  
  .combined-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin: 20px 0;
  }
  
  .column {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

// Function to generate HTML file
function generateHTML(inputFilePath, outputFilePath) {
  try {
    console.log('Generating HTML version of the presentation...');
    
    // Import data from the specified example
    let timelineEvents, infographicItems, comparisonHeaders, comparisonRows, quotes;
    
    try {
      // Try to find a data file with the same name as the input file
      const dataFilePath = path.join(path.dirname(inputFilePath), `${path.basename(inputFilePath, '.jsx')}-data.js`);
      const dataModule = require(dataFilePath);
      timelineEvents = dataModule.timelineEvents || [];
      infographicItems = dataModule.infographicItems || [];
      comparisonHeaders = dataModule.comparisonHeaders || [];
      comparisonRows = dataModule.comparisonRows || [];
      quotes = dataModule.quotes || [];
    } catch (error) {
      console.error(`Error loading data for ${path.basename(inputFilePath, '.jsx')}:`, error);
      // Fallback to visual-showcase data if the specified example data doesn't exist
      const fallbackData = require('../jsx/visual-showcase-data');
      timelineEvents = fallbackData.timelineEvents || [];
      infographicItems = fallbackData.infographicItems || [];
      comparisonHeaders = fallbackData.comparisonHeaders || [];
      comparisonRows = fallbackData.comparisonRows || [];
      quotes = fallbackData.quotes || [];
    }
    
    // Create the HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${path.basename(inputFilePath, '.jsx').charAt(0).toUpperCase() + path.basename(inputFilePath, '.jsx').slice(1).replace(/-/g, ' ')} HTML Showcase</title>
  <style>${styles}</style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    // Data
    const timelineEvents = ${JSON.stringify(timelineEvents)};
    const infographicItems = ${JSON.stringify(infographicItems)};
    const comparisonHeaders = ${JSON.stringify(comparisonHeaders)};
    const comparisonRows = ${JSON.stringify(comparisonRows)};
    const quotes = ${JSON.stringify(quotes)};
    
    // Timeline component
    const HTMLTimeline = ({ events, orientation = 'horizontal' }) => {
      const isHorizontal = orientation === 'horizontal';
      
      return (
        <div className={\`timeline \${isHorizontal ? 'horizontal' : 'vertical'}\`}>
          <div className="timeline-line"></div>
          {events.map((event, index) => (
            <div 
              key={index} 
              className="timeline-event"
              style={{ 
                [isHorizontal ? 'left' : 'top']: \`\${(index / (events.length - 1)) * 100}%\`,
                [isHorizontal ? 'top' : 'left']: \`\${index % 2 === 0 ? -50 : 50}px\`
              }}
            >
              <div 
                className="timeline-point" 
                style={{ backgroundColor: event.color || '#0066CC' }}
              ></div>
              <div className="timeline-content">
                <div className="timeline-date">{event.date}</div>
                <div className="timeline-title" style={{ color: event.color || '#0066CC' }}>
                  {event.title}
                </div>
                {event.description && (
                  <div className="timeline-description">{event.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    };

    // InfoGraphic component
    const HTMLInfoGraphic = ({ items, columns = 2 }) => {
      return (
        <div className="infographic" style={{ gridTemplateColumns: \`repeat(\${columns}, 1fr)\` }}>
          {items.map((item, index) => (
            <div key={index} className="infographic-item">
              <div className="infographic-header" style={{ borderColor: item.color || '#0066CC' }}>
                {item.icon && (
                  <div 
                    className={\`infographic-icon \${item.icon.type}\`}
                    style={{ backgroundColor: item.color || '#0066CC' }}
                  ></div>
                )}
                <div className="infographic-value" style={{ color: item.color || '#0066CC' }}>
                  {item.value}
                </div>
              </div>
              <div className="infographic-label">{item.label}</div>
              {item.description && (
                <div className="infographic-description">{item.description}</div>
              )}
            </div>
          ))}
        </div>
      );
    };

    // ComparisonTable component
    const HTMLComparisonTable = ({ headers, rows, columnColors = [] }) => {
      return (
        <table className="comparison-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  style={{ 
                    backgroundColor: index === 0 
                      ? '#333333' 
                      : (columnColors[index - 1] || '#0066CC'),
                    color: '#FFFFFF'
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even' : 'odd'}>
                <td className="feature-cell">{row.feature}</td>
                {row.values.map((value, colIndex) => (
                  <td key={colIndex} className="value-cell">
                    {value === true ? (
                      <span className="checkmark" style={{ color: columnColors[colIndex] || '#0066CC' }}>✓</span>
                    ) : value === false ? (
                      <span className="xmark">✗</span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

    // QuoteBlock component
    const HTMLQuoteBlock = ({ quote, author, source, theme = 'blue', style = 'modern' }) => {
      const themes = {
        blue: { primary: '#0066CC', secondary: '#E6F0FF' },
        green: { primary: '#33CC33', secondary: '#E6FFE6' },
        orange: { primary: '#FF9900', secondary: '#FFF6E6' },
        red: { primary: '#CC3333', secondary: '#FFE6E6' },
        purple: { primary: '#9933CC', secondary: '#F2E6FF' }
      };
      
      const themeColors = themes[theme] || themes.blue;
      
      return (
        <div className={\`quote-block \${style}\`} style={{ backgroundColor: themeColors.secondary }}>
          {style === 'modern' && (
            <div className="quote-accent" style={{ backgroundColor: themeColors.primary }}></div>
          )}
          <div className="quote-content">
            {style !== 'minimal' && <span className="quote-mark open">"</span>}
            <p className="quote-text">{quote}</p>
            {style !== 'minimal' && <span className="quote-mark close">"</span>}
          </div>
          {author && (
            <div className="quote-attribution">
              — {author}{source ? \`, \${source}\` : ''}
            </div>
          )}
        </div>
      );
    };

    // Main presentation component
    const HTMLPresentation = () => {
      return (
        <div className="html-presentation">
          <div className="slide title-slide">
            <h1>Visual Components Showcase</h1>
            <h2>Demonstrating the power of component-based presentations</h2>
            <p className="date">{new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="slide content-slide">
            <h2>Project Timeline</h2>
            <HTMLTimeline events={timelineEvents} orientation="horizontal" />
          </div>
          
          <div className="slide content-slide">
            <h2>Key Performance Indicators</h2>
            <HTMLInfoGraphic items={infographicItems} columns={2} />
          </div>
          
          <div className="slide content-slide">
            <h2>Feature Comparison</h2>
            <HTMLComparisonTable 
              headers={comparisonHeaders}
              rows={comparisonRows}
              columnColors={['#0066CC', '#33CC33', '#FF9900']}
            />
          </div>
          
          <div className="slide content-slide">
            <h2>Customer Testimonials</h2>
            <div className="quotes-container">
              <HTMLQuoteBlock 
                quote={quotes[0].quote}
                author={quotes[0].author}
                source={quotes[0].source}
                theme={quotes[0].theme}
                style={quotes[0].style}
              />
              <HTMLQuoteBlock 
                quote={quotes[1].quote}
                author={quotes[1].author}
                source={quotes[1].source}
                theme={quotes[1].theme}
                style={quotes[1].style}
              />
            </div>
          </div>
          
          <div className="slide template-slide">
            <div className="header-bar"></div>
            <h2>Combined Components</h2>
            <div className="combined-layout">
              <div className="column">
                <HTMLTimeline 
                  events={timelineEvents.slice(0, 3)} 
                  orientation="vertical" 
                />
                <HTMLQuoteBlock 
                  quote={quotes[2].quote}
                  author={quotes[2].author}
                  source={quotes[2].source}
                  theme={quotes[2].theme}
                  style={quotes[2].style}
                />
              </div>
              <div className="column">
                <HTMLInfoGraphic 
                  items={infographicItems.slice(0, 2)}
                  columns={1}
                />
              </div>
            </div>
            <div className="footer-bar"></div>
          </div>
        </div>
      );
    };
    
    // Render the presentation
    ReactDOM.render(
      <HTMLPresentation />,
      document.getElementById('root')
    );
  </script>
</body>
</html>
    `;
    
    // Ensure the output directory exists
    const outputDir = path.dirname(outputFilePath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write the HTML file
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log(`HTML presentation created successfully: ${outputFilePath}`);
  } catch (error) {
    console.error('Error generating HTML presentation:', error);
  }
}

// Export the function to be called
module.exports = { generateHTML }; 