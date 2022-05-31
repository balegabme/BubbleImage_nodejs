const authMw = require('./../middlewares/authMw')
const checkAuthMw = require('./../middlewares/checkAuthMw')
const generatePasswordMw = require('./../middlewares/generatePasswordMw')
const loginMw = require('./../middlewares/loginMw')
const logoutMw = require('./../middlewares/logoutMw')
const registerUsernameMw = require('../middlewares/registerUsernameMw')
const registerPasswordMw = require('../middlewares/registerPasswordMw')
const registerEditPasswordMw = require('../middlewares/registerEditPasswordMw')
const renderMw = require('./../middlewares/renderMw')
const savePlayerMw = require('./../middlewares/savePlayerMw')
const editPlayerMw = require('./../middlewares/editPlayerMw')
const deletePlayerMw = require('./../middlewares/deletePlayerMw')
const getPlayerMw = require('./../middlewares/getPlayerMw')
const fogrottenpasswordCheckUsernameMw = require('./../middlewares/fogrottenpasswordCheckUsernameMw')
const leaderboardMw = require('./../middlewares/leaderboardMw')
const bubbleimageMw = require('../middlewares/bubbleimageMw')
const imageGetterMw = require('../middlewares/imageGetterMw')

const PlayerModel = require('../models/player')
const ImageModel = require('../models/image')

module.exports = function (app) {

    const objectRepository = {
        PlayerModel: PlayerModel,
        ImageModel: ImageModel
    }

    app.get('/login',
        checkAuthMw(objectRepository),
        renderMw(objectRepository, 'login')
    )

    app.post('/login',
        checkAuthMw(objectRepository),
        loginMw(objectRepository),
        renderMw(objectRepository, 'login')
    )

    app.get('/register',
        checkAuthMw(objectRepository),
        renderMw(objectRepository, 'register')
    )

    app.post('/register',
        checkAuthMw(objectRepository),
        registerUsernameMw(objectRepository),
        registerPasswordMw(objectRepository),
        savePlayerMw(objectRepository),
        renderMw(objectRepository, 'register')
    )

    app.get('/forgottenpassword',
        checkAuthMw(objectRepository),
        renderMw(objectRepository, 'forgottenpassword')
    )

    app.post('/forgottenpassword',
        checkAuthMw(objectRepository),
        fogrottenpasswordCheckUsernameMw(objectRepository),
        generatePasswordMw(objectRepository),
        renderMw(objectRepository, 'forgottenpassword')
    )

    app.use('/logout',
        authMw(objectRepository),
        logoutMw(objectRepository)
    )

    app.use('/mainmenu/play',
        authMw(objectRepository),
        renderMw(objectRepository, 'play')
    )

    app.use('/mainmenu/manageimage',
        authMw(objectRepository),
        renderMw(objectRepository, 'manageimage')
    )

    app.use('/mainmenu',
        authMw(objectRepository),
        renderMw(objectRepository, 'mainmenu')
    )

    app.get('/leaderboard',
        authMw(objectRepository),
        leaderboardMw(objectRepository),
        renderMw(objectRepository, 'leaderboard')
    )

    app.get('/profile/edit:playername',
        authMw(objectRepository),
        renderMw(objectRepository, 'editprofile')
    )

    app.post('/profile/edit:playername',
        authMw(objectRepository),
        getPlayerMw(objectRepository),
        registerUsernameMw(objectRepository),
        registerEditPasswordMw(objectRepository),
        editPlayerMw(objectRepository),
        renderMw(objectRepository, 'editprofile')
    )

    app.use('/profile',
        authMw(objectRepository),
        getPlayerMw(objectRepository),
        renderMw(objectRepository, 'profile')
    )

    app.post('/delete',
        authMw(objectRepository),
        deletePlayerMw(objectRepository),
        logoutMw(objectRepository)
    )

    app.get('/bubbleimage',
        authMw(objectRepository),
        imageGetterMw(objectRepository),
        renderMw(objectRepository, 'bubbleimage')
    )

    app.post('/bubbleimage',
        authMw(objectRepository),
        imageGetterMw(objectRepository),
        bubbleimageMw(objectRepository),
        renderMw(objectRepository, 'bubbleimage')
    )

    app.get('/imagegetter',
        authMw(objectRepository),
    )

    app.get('/',
        checkAuthMw(objectRepository),
        renderMw(objectRepository, 'mainmenu')
    )
}