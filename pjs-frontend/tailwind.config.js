module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      {
        light: {
          primary: "#1C59A9",
          secondary: "#F69B39",
          neutral: "#444",
          "neutral-content": "#757872",
          "base-100": "#fff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
