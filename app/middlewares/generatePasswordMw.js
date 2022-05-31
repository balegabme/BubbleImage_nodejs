module.exports = function (objectRepository) {
  return function (req, res, next) {

    const generate = function (length) {
      var result = ''
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    }

    if (typeof res.locals.player !== 'undefined' && res.locals.player !== null) {
      res.locals.player.password = generate(9)
      res.locals.player.save()
      res.locals.newpassword = res.locals.player.password
      console.log("New password for " + res.locals.player.name + " is " + res.locals.newpassword)
      return res.redirect('/login')
    } else {
      res.locals.newpassword = "Cannot generate new password to this account."
    }
    return next();
  };
}; 