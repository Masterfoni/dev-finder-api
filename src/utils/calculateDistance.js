function deg2rad(deg) {
    return deg = (Math.PI/180);
}

module.exports = function getDistanceFromLatLonInKm(centerCoordinates, pointCoordinates) {
    const radius = 6371;

    const { latitude: centerLat, longitude: centerLong } = centerCoordinates;
    const { latitude: pointLat, longitude: pointLong } = pointCoordinates;

    const dLat = deg2rad(pointLat - centerLat);
    const dLong = deg2rad(pointLong - centerLong);

    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(centerLat)) * Math.cos(deg2rad(pointLat)) *
        Math.sin(dLong/2) * Math.sin(dLong/2)
    ;

    const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return radius * center;
}