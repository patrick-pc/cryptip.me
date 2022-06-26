module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
}
