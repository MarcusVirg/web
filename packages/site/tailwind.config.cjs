module.exports = {
  content: ['./src/app.html', './src/**/*.{ts,svelte}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#030b15',
          blue: '#192d50',
          'light-blue': '#397F99',
          gray: '#4f6073',
          white: '#f7f6f7',
          cream: '#dfceba'
        }
      }
    },
    plugins: []
  }
}
