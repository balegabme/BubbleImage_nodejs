const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Image = db.model('Image', {
    name: String,
    path: String,
});

var names = [
    { name: 'Diego Maradona', id: 1, _id: "5fc1668439fd0e56000ceaf1" },
    { name: 'Christiano Ronaldo', id: 2 , _id: "5fc1668439fd0e56000ceaf2"},
    { name: 'Lionel Messi', id: 3, _id: "5fc1668439fd0e56000ceaf3" },
    { name: 'Ronaldo', id: 4, _id: "5fc1668439fd0e56000ceaf4" },
    { name: 'Ronaldinho', id: 5, _id: "5fc1668439fd0e56000ceaf5" },
    { name: 'Zenedine Zidane', id: 6, _id: "5fc1668439fd0e56000ceaf6" },
    { name: 'Luka Modric', id: 7, _id : "5fc1668439fd0e56000ceaf7" },
    { name: 'Buffon', id: 8, _id: "5fc1668439fd0e56000ceaf8" },
    { name: 'David Beckham', id: 9, _id: "5fc1668439fd0e56000ceaf9" },
    { name: 'Dr. House', id: 10, _id: "5fc1668439fd0e56000ceafa" }
]

for (var i = 0; i < names.length; i++) {

    const newImage = new Image()
    newImage.name = names[i].name
    newImage.path = names[i].id + ".jpg"
    newImage._id = names[i]._id

    newImage.save()
        .then((newImage) => {
            console.log("Done")
        })
        .catch((err) => {
        })
}

module.exports = Image;