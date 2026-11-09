/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sikoni: {
          navy: '#142a43',
          navy2: '#1d3a59',
          teal: '#168b8b',
          teal2: '#e8f5f4',
          gold: '#d7ac57',
          gold2: '#f7f0df',
          ink: '#1c2938',
          muted: '#718096',
          line: '#e7ebf0',
          bg: '#f4f6f9',
          red: '#d95b5b',
          green: '#23846d',
          amber: '#b77a1d',
        },
      },
      borderRadius: {
        sikoni: '15px',
      },
      boxShadow: {
        sikoni: '0 10px 28px rgba(24,41,62,.07)',
      },
    },
  },
  plugins: [],
};

