module.exports = function (objectRepository) {
  return function (req, res, next) {
    let player;

    if (typeof req.body.player !== 'undefined' && req.body.player !== null)
      player = req.body.player;
    else if (typeof res.locals.player !== 'undefined' && res.locals.player !== null)
      player = res.locals.player;
    else
      return next();

    objectRepository.PlayerModel.findOne({ _id: player._id }).exec(function (err, player) {

      if (typeof player !== 'undefined' && player !== null) {
        res.locals.player = player;
      }

      return next();

    })
  }
}; 