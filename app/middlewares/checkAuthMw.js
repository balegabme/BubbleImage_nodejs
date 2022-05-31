module.exports = function(objectRepository) {
    return function(req, res, next) {
        if (typeof req.session.logged !== 'undefined' && req.session.logged === true) {
            res.locals.logged = true;
            return res.redirect('/mainmenu');
        }
        res.locals.logged = false;
        return next();
    };
};