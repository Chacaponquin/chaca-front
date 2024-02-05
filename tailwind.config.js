/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "red-1": "#f57674",
        "red-2": "#eb4d4b",
        "red-3": "#d72d2b",

        "purple-1": "#f3f2ff",
        "purple-2": "#e9e8ff",
        "purple-3": "#d6d4ff",
        "purple-4": "#b9b1ff",
        "purple-5": "#9685ff",
        "purple-6": "#7d5fff",
        "purple-7": "#6230f7",
        "purple-8": "#541ee3",
        "purple-9": "#4518bf",
        "purple-10": "#3a169c",
        "purple-11": "#220b6a",

        "scale-1": "#161616",
        "scale-2": "#1c1c1c",
        "scale-3": "#232323",
        "scale-4": "#282828",
        "scale-5": "#2e2e2e",
        "scale-6": "#343434",
        "scale-7": "#3e3e3e",
        "scale-8": "#505050",
        "scale-9": "#707070",
        "scale-10": "#7e7e7e",
        "scale-11": "#bbb",
        "scale-12": "#e7e7e7",
        "scale-13": "#f6f6f6",

        "code-dark": "#011627",
      },
      fontFamily: {
        fontBold: "Poppins Bold",
        fontSemiBold: "Poppins Semi Bold",
        fontTitle: "Poppins Extra Bold",
        fontLight: "Poppins Light",
        fontMedium: "Poppins Medium",
        fontExtraBold: "Poppins Extra Bold",
        fontCode: "JetBrains Mono Regular",
        fontCodeMedium: "JetBrains Mono Medium",
        fontCodeBold: "JetBrains Mono Bold",
        fontDoc: "Poppins Regular",
      },
      backgroundImage: {
        "first-bg": 'url("./assets/images/first-bg.svg")',
        "second-bg": 'url("./assets/images/second-bg.svg")',
        "third-bg": 'url("./assets/images/third-bg.svg")',
      },
      screens: {
        exsm: { max: "400px" },
        esm: { max: "640px" },
        "2xl": { min: "1400px" },
      },
      boxShadow: {
        input: "0 0 0 0.2rem",
      },
    },
  },
  plugins: [],
}
