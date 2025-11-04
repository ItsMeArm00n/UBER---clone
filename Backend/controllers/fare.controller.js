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
        const { pickupLat, pickupLng, dropoffLat, dropoffLng } = req.body;

        if (!pickupLat || !pickupLng || !dropoffLat || !dropoffLng) {
            return res.status(400).json({ message: 'Missing coordinates' });
        }

        const distance = getDistance(pickupLat, pickupLng, dropoffLat, dropoffLng);

        // Base fare: ₹50, rate: ₹10 per km
        const baseFare = 50;
        const ratePerKm = 10;
        const estimatedFare = baseFare + (distance * ratePerKm);

        res.status(200).json({
            distance: Math.round(distance * 100) / 100, // round to 2 decimals
            estimatedFare: Math.round(estimatedFare)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
