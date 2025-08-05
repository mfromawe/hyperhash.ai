const fs = require('fs');

// Simple favicon generator using HTML5 Canvas in Node.js
// We'll create a base64 encoded favicon

function generateHashFavicon() {
  const size = 32;
  
  // SVG content for the hash favicon
  const svgContent = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="16" cy="16" r="15" fill="url(#hashGradient)" stroke="#1E40AF" stroke-width="1"/>
      
      <!-- Hash symbol (#) -->
      <g fill="white" stroke="white" stroke-width="0.5">
        <!-- Vertical lines -->
        <rect x="10" y="8" width="2.5" height="16" rx="1"/>
        <rect x="19.5" y="8" width="2.5" height="16" rx="1"/>
        
        <!-- Horizontal lines -->
        <rect x="6" y="12" width="20" height="2.5" rx="1"/>
        <rect x="6" y="17.5" width="20" height="2.5" rx="1"/>
      </g>
    </svg>
  `;

  return svgContent;
}

// Generate different sizes for favicon
const sizes = [16, 32, 48, 64];
const faviconDir = './public';

sizes.forEach(size => {
  const svgContent = `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background circle -->
      <circle cx="16" cy="16" r="15" fill="url(#hashGradient)" stroke="#1E40AF" stroke-width="1"/>
      
      <!-- Hash symbol (#) -->
      <g fill="white" stroke="white" stroke-width="0.5">
        <!-- Vertical lines -->
        <rect x="10" y="8" width="2.5" height="16" rx="1"/>
        <rect x="19.5" y="8" width="2.5" height="16" rx="1"/>
        
        <!-- Horizontal lines -->
        <rect x="6" y="12" width="20" height="2.5" rx="1"/>
        <rect x="6" y="17.5" width="20" height="2.5" rx="1"/>
      </g>
    </svg>
  `;
  
  fs.writeFileSync(`${faviconDir}/favicon-${size}x${size}.svg`, svgContent);
});

console.log('✅ Favicon SVG files generated successfully!');
console.log('Generated files:');
sizes.forEach(size => {
  console.log(`  - favicon-${size}x${size}.svg`);
});
