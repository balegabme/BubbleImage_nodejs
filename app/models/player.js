const Schema = require('mongoose').Schema
const db = require('../config/db')

const Player = db.model('Player', {

    name: String,
    password: String,
    highscore: Number,
    gamesplayed: Number,
    averagescore: Number,
    
})

module.exports = Player