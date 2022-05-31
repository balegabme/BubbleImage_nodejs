module.exports = function (objectRepository) {
  return function (req, res, next) {
      objectRepository.PlayerModel.deleteOne({ name: req.body.name.toLowerCase() }).exec((err, player) => {

          return next();
      })
  };
};