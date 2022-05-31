const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kopfxa', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

module.exports = mongoose;