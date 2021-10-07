let authorized = false;

exports.authCheck = (req, res, next = (f) => f) => {
    if (authorized) {
        next();
    } else {
        throw new Error('Unauthorized');
    }
};
