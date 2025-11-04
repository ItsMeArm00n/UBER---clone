const fareModel = require('../models/fare.model');

// Haversine formula to calculate distance between two points
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

module.exports.getFareEstimate = async (req, res) => {
    try {
        const { pickupLat, pickupLng, dropoffLat, dropoffLng } = req.body || {};

        // Ensure all values are finite numbers (avoid false negatives like 0)
        const pLat = Number(pickupLat);
        const pLng = Number(pickupLng);
        const dLat = Number(dropoffLat);
        const dLng = Number(dropoffLng);

        if (!Number.isFinite(pLat) || !Number.isFinite(pLng) || !Number.isFinite(dLat) || !Number.isFinite(dLng)) {
            return res.status(400).json({ message: 'Invalid or missing coordinates' });
        }

        const distance = getDistance(pLat, pLng, dLat, dLng);

        // Base fare: ₹50, rate: ₹10 per km
        const baseFare = 50;
        const ratePerKm = 10;
        const estimatedFare = baseFare + (distance * ratePerKm);

        res.status(200).json({
            baseFare,
            ratePerKm,
            distance: Math.round(distance * 100) / 100, // km, 2 decimals
            estimatedFare: Math.round(estimatedFare)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
