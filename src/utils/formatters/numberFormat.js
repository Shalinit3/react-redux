// function to convert string to number and fix it to 2 decimal places
const numberFormat = (num) => {
  return num ? parseFloat((Math.round(parseFloat(num) * 100) / 100).toFixed(2)) : null
}

export default numberFormat
