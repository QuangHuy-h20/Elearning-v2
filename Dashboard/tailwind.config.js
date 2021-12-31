module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    corePlugins: {
      borderColor: theme =>({
        DEFAULT: theme('border.gray.300', 'currentColor'),
        'primary': 'rgba(12, 8, 8, 0.5)',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
