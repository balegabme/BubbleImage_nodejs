module.exports = function (objectRepository) {
    return function (req, res, next) {
        objectRepository.ImageModel.countDocuments().exec(function (err, count) {
            let pictureNumber = Math.floor(Math.random() * count);
          
            objectRepository.ImageModel.findOne().skip(pictureNumber).exec((err, image) => {
                res.locals.imagepath = image.path;
                res.locals.imagename = image.name;

                return next();
              })
          })
    };
  };