'use strict';

const Network = require('../model/network');

const internals = module.exports = (route, options) => {

    return function (request, reply) {

        return internals[options.method](request, reply);
    };
};

internals.createHost = (request, reply) => {

    const result = Network.addHost(request.payload.host);
    return reply(result);
};

internals.fetchHosts = (request, reply) => {

    const result = Network.getHosts();
    return reply(result);
};

internals.createLink = (request, reply) => {

    const result = Network.createLink(request.payload.source, request.payload.dest, request.payload.description);
    return reply(result);
};

internals.fetchLinks = (request, reply) => {

    const result = Network.getLinks();
    return reply(result);
};

internals.fetchPath = (request, reply) => {

    const result = Network.getPath(request.params.A, request.params.B);
    return reply(result);
};
