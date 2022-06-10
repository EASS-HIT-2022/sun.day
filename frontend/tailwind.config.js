module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: "Assistant",
      serif: "Noto Sans Hebrew",
      display: "Assistant",
      body: "Assistant",
    },
    extend: {
      colors: {
        primary: "#FABB18",
        secondary: "#000000",
        graybg: "#F0F0F0",
      },
    },
  },
  plugins: [],
};
