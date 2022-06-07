module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      main: '#324d67',
      bannerContainer: '#dcdcdc',
      primary: '#f02d34',
      descriptionColor: '#5f5f5f',
      layoutColor: '#f02d34',
      productbgColor: '#ebebeb'
      },
      height:{
        '128': '32rem',
        '128': '28rem'
      }
    },
  },
  plugins: [],
}