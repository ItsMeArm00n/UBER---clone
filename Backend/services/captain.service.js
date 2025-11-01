const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType
}) => {
    if (!firstname || !lastname || !email || !password ||
        !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

   const captain = await captainModel.create({
    fullname: {
        firstname,
        lastname
    },
    email,
    password,
    vehicle: {
        color,
        plate,
        capacity,
        vehicleType
    }
});


    return captain;
};

module.exports.updateCaptainStatus = async (captainId, status) => {
    if (!captainId || !status) {
        throw new Error('Captain ID and status are required');
    }

    const validStatuses = ['online', 'offline', 'on-trip'];
    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status. Must be one of: online, offline, on-trip');
    }

    const captain = await captainModel.findByIdAndUpdate(
        captainId,
        { status },
        { new: true }
    );

    if (!captain) {
        throw new Error('Captain not found');
    }

    return captain;
};
