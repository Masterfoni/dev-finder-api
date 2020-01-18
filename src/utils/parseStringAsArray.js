module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(el => el.trim());
}
