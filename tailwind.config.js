/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ffeeb7",
          
          "secondary": "#bbe7ec",
                   
          "accent": "#e0d3f7",
                   
          "neutral": "#e2ecff",
                   
          "base-100": "#f7f9ff",
                   
          "info": "#77addf",
                   
          "success": "#1fad79",
                   
          "warning": "#e39f16",
                   
          "error": "#e05a42",

          "--rounded-btn": "6rem", // border radius rounded-btn utility class, used in buttons and similar element
        },
      },
    ],
  },
}

