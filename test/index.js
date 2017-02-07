'use strict';

const nodePackage = require('../package');
const Composer = require('../lib/bootstrap');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const before = lab.before;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const randNumber = function (num) {
    const x = Math.floor(Math.random() * 20);
    return  (x === num) ? randNumber(num) : x;
};
describe(nodePackage.name + ' main service application.', function () {

    let _server = null;
    const alphabet = 'abcdefghijklmnopqrst'.split('');

    before((done) => {

        Composer((err, server) => {
            _server = server;
            done();
        });
    });

    it('should create host', function (done) {

        for (let i = 0; i <= 19; i++) {

            const options = {
                method: 'POST',
                url: '/host',
                payload: {
                    "host": alphabet[i]
                }
            };

            _server.inject(options, function (res) {

                expect(res.statusCode).to.equal(200);
            });
            if (i == 19)  return done();
        }
    });

    it('should get all hosts', function (done) {

        const options = {
            method: 'GET',
            url: '/hosts'
        };

        _server.inject(options, function (res) {
            expect(res.statusCode).to.equal(200);
            expect(res.payload).to.include('a');
            expect(res.payload).to.include('t');
            return done();
        });
    });

    it('should create links', function (done) {

        const description = [
            "ftp",
            "scp",
            "rsync",
            "samba"
        ];

        for (let i = 0; i <= 39; i++) {

            const options = {
                method: 'POST',
                url: '/link',
                payload: {
                    "source": alphabet[randNumber()],
                    "description": description[Math.floor(Math.random() * 4)],
                    "dest": alphabet[randNumber(i)]
                }
            };

            _server.inject(options, function (res) {

                expect(res.statusCode).to.equal(200);
                return done();
            });
            if (i == 39)  return done();
        }
    });
});
