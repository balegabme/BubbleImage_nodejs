module.exports = function (objectRepository) {
    return function (req, res, next) {

        objectRepository.PlayerModel.findOne({ name: req.body.username.toLowerCase() }).exec((err, player) => {

            if (typeof player !== 'undefined' && player !== null) {
                res.locals.player = player
            }else{
                res.locals.error = 'Username not found!'
            }

            return next();

        })

    };
};