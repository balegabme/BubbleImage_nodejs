module.exports = function (objectRepository) {
    return function (req, res, next) {
        let points = req.body.bubbleArrayLength;
        objectRepository.PlayerModel.findOne({ name: req.session.player.name.toLowerCase() }).exec((err, player) => {

            if (typeof player !== 'undefined' && player !== null) {
                player.gamesplayed ++;
                player.averagescore = ((req.session.player.averagescore) * (player.gamesplayed - 1) + points)/player.gamesplayed;
                player.highscore = (player.highscore < points) ? points : player.highscore; 
                player.save().then()
                .catch(err => {
                    return next(err);
                })

            }
        
        })
        return next();
    };
};