module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString ? arrayAsString.split(',').map(el => el.trim()) : [];
}
