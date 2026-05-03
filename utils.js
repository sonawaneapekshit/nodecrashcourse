function generateRandomNumbers() {
  return Math.floor(Math.random()* 100) + 1;
}

function celiusToFahrenheit(temprature) {
  return ((parseFloat(temprature) * 9 ) / 5 ) + 32;
}

module.exports = {
  generateRandomNumbers,
  celiusToFahrenheit
};