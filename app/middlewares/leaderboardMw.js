module.exports = function (objectRepository) {
    return function (req, res, next) {

        objectRepository.PlayerModel.find().sort({highscore: 1}).exec((err,bestlist) => {
            res.locals.highscores = JSON.parse(JSON.stringify(bestlist));
            return next();
        });
    };

    
};