const expect = require('chai').expect
const savePlayerMw = require('../../../middlewares/savePlayerMw')

describe('player saver middleware', function() {
    it('should register the player', function(done) {
        
        const savedPlayer = {
            name: 'test1',
            password: 'passw',
            highscore: 0,
            averagescore: 0,
            gamesplayed: 0
        }

        const mw = savePlayerMw({
            PlayerModel: function(){
                this.save = () => {

                    expect(this.name).to.be.eql(savedPlayer.name)
                    expect(this.password).to.be.eql(savedPlayer.password)
                    expect(this.highscore).to.be.eql(savedPlayer.highscore)
                    expect(this.averagescore).to.be.eql(savedPlayer.averagescore)
                    expect(this.gamesplayed).to.be.eql(savedPlayer.gamesplayed)

                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                          resolve(this);
                        }, 10)
                    })

                }

            }

        })

        const req = {
            body: {
                username: 'test1',
                password: 'passw'
            }
        }

        const res = {
            locals: {
            },
            redirect: (to) => {
                expect(to).to.be.eql('/mainmenu')
                done()
            }
        } 

        mw(req, res, (err) => {
            expect(0).to.be.eql(1);
        })

    })

    it('saving failed because of database error', function(done) {
        
        const savedPlayer = {
            name: 'test1',
            password: 'passw',
            highscore: 0,
            averagescore: 0,
            gamesplayed: 0
        }

        const mw = savePlayerMw({
            PlayerModel: function(){
                this.save = () => {

                    expect(this.name).to.be.eql(savedPlayer.name)
                    expect(this.password).to.be.eql(savedPlayer.password)
                    expect(this.highscore).to.be.eql(savedPlayer.highscore)
                    expect(this.averagescore).to.be.eql(savedPlayer.averagescore)
                    expect(this.gamesplayed).to.be.eql(savedPlayer.gamesplayed)
                    
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                          reject(new Error('Database error!'));
                        }, 10)
                    })

                }

            }

        })

        const req = {
            body: {
                username: 'test1',
                password: 'passw'
            }
        }

        const res = {
            locals: {
            },
            redirect: (to) => {
                expect(to).to.be.eql('/mainmenu')
                done()
            }
        } 

        mw(req, res, (err) => {
            expect(err).to.be.an('error')
            done()
        })

    })

    it('there was an error before', function(done) {

        const mw = savePlayerMw({
            PlayerModel: {
                save: () => {

                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                          resolve();
                        }, 10)
                    })

                }

            }

        })

        const req = {
            body: {
                username: 'test1',
                password: 'passw'
            }
        }

        const res = {
            locals: {
                error: 'Too short password!'
            },
            redirect: (to) => {
                expect(1).to.be.eql(0);
            }
        } 

        mw(req, res, (err) => {
            expect(err).to.be.an('undefined');
            expect(res.locals.error).to.be.eql('Too short password!');
            done()
        })
    })
})
