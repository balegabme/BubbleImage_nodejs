module.exports = function (objectRepository) {
    return function (req, res, next) {

        const checkValidChars = function (str) {

            const validChars = 'abcdefghijklmnopqrstuwvxyz0123456789_'
            for (let i = 0; i < str.length; ++i)
                if (validChars.includes(str[i]) === false) return false;
            return true;

        }

        if (typeof req.body.username === undefined || !req.body.username || !req.body.username === '') {
            res.locals.error = 'Please give a username!'
        } else if (!checkValidChars(req.body.username)) {
            res.locals.error = 'Invalid characters in username!'
        }

        objectRepository.PlayerModel.findOne({ name: req.body.username.toLowerCase() }).exec((err, player) => {

            if (typeof player !== undefined && player !== null) {
                res.locals.error = 'Username already exists!'
                res.locals.player = player
            }

            return next();

        })

    };
};