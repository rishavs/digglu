module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {            
      colors: {
        primary: {
            base: "#1B5790",
            light: "#5f89b1",
            dark: "#12395E"
        },
        secondary: {
            base: "#1c927c",
            light: "#49DCC1",
            dark: "#125E50"
        },
        accent: {
          base: "#1c927c",
          light: "#49DCC1",
          dark: "#125E50"
        },
        danger: {
            base: "#1B5790",
            light: "#FFFFFF",
            dark: "#CCCCCC"
        },
        background: {
            base: "#FAFAFA",
            light: "#FFFFFF",
            dark: "#E5E5E5"
        },
        fontcolor: {
            base: "#1B5790",
            light: "#FFFFFF",
            dark: "#CCCCCC"
        },

    }
  },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
