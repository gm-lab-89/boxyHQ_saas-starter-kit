module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  daisyui: {
    themes: [
            {
        light: {"primary": "#4db936",   
                "secondary": "#b7e3ae",    
                "accent": "#65a30d", 
                "neutral": "#060300",   
                "base-100": "#ffffff",  
                "info": "#00b5df",
                "success": "#009830",
                "warning": "#fac500",   
                "error": "#dc2626"
        },
          dark: {"primary": "#4db936",   
                "secondary": "#b7e3ae",    
                "accent": "#65a30d", 
                "neutral": "#ffffff",   
                "base-100": "#060300",  
                "info": "#00b5df",
                "success": "#009830",
                "warning": "#fac500",   
                "error": "#dc2626"
              }
}
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
