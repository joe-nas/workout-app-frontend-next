/** @type {import('tailwindcss').Config} */

const ironDeliriumTheme = {
  'iron-delirium': {                          // Custom theme name
    'primary': '#ff5722',                     // A strong accent color for CTAs
    'primary-focus': '#e64a19',               // A darker shade for hover or focus states
    'primary-content': '#ffffff',             // Text color for primary elements

    'secondary': '#5e5e5e',                   // A neutral, muted tone for secondary elements
    'secondary-focus': '#424242',             // A slightly darker shade for secondary hover states
    'secondary-content': '#ffffff',           // Text color for secondary elements

    'accent': '#4caf50',                      // A contrasting color for accents
    'accent-focus': '#388e3c',                // A darker shade of the accent color
    'accent-content': '#ffffff',              // Text color for accent elements

    'neutral': '#121212',                     // A very dark shade for neutral backgrounds
    'neutral-focus': '#1c1c1c',               // A slightly lighter dark shade for focus states
    'neutral-content': '#e0e0e0',             // A lighter text color for high readability on dark backgrounds

    'base-100': '#202020',                    // The base color of UI elements like cards or modals
    'base-200': '#1a1a1a',                    // A shade darker than base-100
    'base-300': '#131313',                    // A shade even darker than base-200
    'base-content': '#e0e0e0',                // Base text and icon color

    'info': '#2196f3',                        // Color for informational messages or states
    'success': '#4caf50',                     // Color for success messages or states
    'warning': '#ff9800',                     // Color for warning messages or states
    'error': '#f44336',                       // Color for error messages or states

    // Optional: Depending on your need, you can also customize the following:
    // 'info-content', 'success-content', 'warning-content', 'error-content'

    // You may also want to add custom colors for specific parts of your UI like:
    'button': '#ff5722',                      // Custom color for buttons
    'button-focus': '#e64a19',                // Custom color for buttons when focused
    'button-content': '#ffffff',              // Text color for buttons

    // If your app has status indicators or unique elements, consider adding:
    // 'status-new', 'status-in-progress', 'status-complete', 'status-urgent'

    // Ensure you have contrasts, hover, and focus colors as necessary:
    // 'border', 'border-focus', 'border-hover'

    // If you need to style form elements:
    // 'input', 'input-focus', 'input-content', 'input-error'
  },
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

    },
  },
  daisyui: {
    themes: [
      {
        "iron-delirium": {
          'primary': '#d64161',   /* Vibrant pink */
          'secondary': '#6b7d7d', /* Muted teal */
          'accent': '#5e2129',    /* Custom color for accents */
          'neutral': '#3c3f41',   /* Dark gray */
          'base': '#f1f1f1',      /* Very light gray */
          'info': '#31708f',      /* Soft blue */
          'success': '#3c763d',   /* Calming green */
          'warning': '#8a6d3b',   /* Warm amber */
          'error': '#a94442',     /* Strong red */
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

