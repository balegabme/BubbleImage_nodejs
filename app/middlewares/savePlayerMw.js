module.exports = function (objectRepository) {
    return function (req, res, next) {


        if (typeof res.locals.error !== 'undefined' || res.locals.error)
            return next();
        

        const player = new objectRepository.PlayerModel()
        player.name = req.body.username
        player.password = req.body.password
        player.highscore = 0
        player.averagescore = 0
        player.gamesplayed = 0

        player.save()
            .then((player) => {
                res.redirect('/mainmenu')
            })
            .catch((err) => {
                return next(err)
            })

    };

}; 
