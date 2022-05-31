module.exports = function (objectRepository) {
  return function (req, res, next) {
    if(typeof req.session.player !== 'undefined'){
      req.session.logged = false;
      req.session.player = null;
    }
    res.redirect('/login');
  }
}; 