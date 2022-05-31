module.exports = function (objectRepository) {
    return function (req, res, next) {
        objectRepository.PlayerModel.findOne({ name: req.session.player.name.toLowerCase() }).exec((err, player) => {

            if (typeof player !== 'undefined' && player !== null) {
                player.name = req.body.username;
                player.password = req.body.password;
                res.locals.player = player;
                return player.save()
                    .then((player) => {
                        res.redirect('/profile')
                    })
                    .catch((err) => {
                        return next(err)
                    })
            }
            return next();
        })
    };
};