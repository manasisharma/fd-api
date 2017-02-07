'use strict';

const Network = require('../model/network');

const internals = module.exports = (route, options) => {

    return function (request, reply) {

        return internals[options.method](request, reply);
    };
};
