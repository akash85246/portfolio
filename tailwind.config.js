/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
     fontFamily: {
        orbitron: ['Orbitron', 'serif'],
        michroma: ['Michroma', 'sans-serif'],
      },
      colors: {
        primary: '#ff6363',
        secondary: '#3a3a3a',
        accent: '#f0f0f0',
      },
      fontSize: {
        xxs: "0.625rem",
        xxxs: "0.5rem",
        xxxxs: "0.35rem",
        xxxxxs: "0.25rem",
        xxxxxxs: "0.15rem",
        xxxxxxxs: "0.1rem",
        xxxxxxxxs: "0.05rem",
        xxxxxxxxxs: "0.08rem",
        xxxxxxxxxxs: "0.05rem",
      },

    },
  },
  plugins: [],
};
