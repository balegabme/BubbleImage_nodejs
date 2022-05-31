/* const PlayerModel = require('./app/models/player');
const ImageModel = require('./app/models/image');

let testPlayer = new PlayerModel();
testPlayer.name='aasd';
testPlayer.password='kenyer';
testPlayer.highscore=0;
testPlayer.save((err) => {
    console.log(err);

    let testImage = new ImageModel();
    testImage.name='Dr House';
    testImage._highscorer = testPlayer;
    testImage.save((err) => {
        console.log(err);
    });
}); */

const express = require('express');
const app = express();
const route = require('./app/routes/routes');
const bodyParser = require('body-parser')
const session = require('express-session');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    })
);

route(app);

var server = app.listen(3000, function(){
    console.log("On :3000")
});