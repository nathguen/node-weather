function cToF(celsius) {
  var cTemp = celsius;
  var cToFahr = (cTemp * 9) / 5 + 32;
  return cToFahr.toFixed(1);
}

module.exports = {
  cToF,
};
