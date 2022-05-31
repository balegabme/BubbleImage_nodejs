const expect = require('chai').expect
const logoutMw = require('../../../middlewares/logoutMw')

describe('logout middleware', function() {
    it('there is player', function(done) {

        var req = {session : {logged: true, player: NaN}}
        var res = {redirect: (to)=>{
            expect(to).to.be.eql('/login');
            expect(req.session.logged).to.be.eql(false)
            expect(req.session.player).to.be.eql(null)
            done();
        }}
        const mw = logoutMw({})

        mw(req, res, (err) => {
            expect(0).to.be.eql(1);
        })
    })

    it('there is no player', function(done) {

        var req = {session : {logged: false, player: undefined}}
        var res = {redirect: (to)=>{
            expect(to).to.be.eql('/login');
            expect(req.session.player).to.be.eql(undefined)
            expect(req.session.logged).to.be.eql(false)
            done();
        }}
        const mw = logoutMw({})

        mw(req, res, (err) => {
            expect(0).to.be.eql(1);
        })
    })
})