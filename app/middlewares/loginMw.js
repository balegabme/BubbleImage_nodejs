module.exports = function(objectRepository) {
  return function(req, res, next) {

      if (typeof req.body.username === undefined || typeof req.body.password === undefined) {
          res.locals.error = "Please give a username and password."
          return next()
      }

      objectRepository.PlayerModel.findOne({name: req.body.username.toLowerCase(), password: req.body.password}).exec((err, player) => {
          
          if (typeof player !== undefined && player !== null) {

              player.save().then((player) => {

                  req.session.logged = true
                  res.locals.logged = true
                  req.session.player = player
                  return res.redirect('/mainmenu')

              })
  
          } else {
  
              res.locals.error = "Username with this password was not found."
              return next()
  
          }

      })

  };
}; 
