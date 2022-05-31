module.exports = function(objectRepository) {
    return function(req, res, next) {
        if (typeof req.body.password === 'undefined' || !req.body.password || req.body.password === '') {
            res.locals.error = 'Password cannot be empty!'
        } else if (req.body.password.length < 4) {
            res.locals.error = 'Too short password!'
        }
        return next();
    };
}; 
