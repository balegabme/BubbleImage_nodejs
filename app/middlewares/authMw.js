module.exports = function(objectRepository) {
  return function(req, res, next) {
      if (typeof req.session.logged === undefined || req.session.logged !== true) {
        res.locals.logged = false;
        return res.redirect('/login');
      }
      res.locals.logged = true
      
      res.locals.player = req.session.player;

      return next();
  };
}; 