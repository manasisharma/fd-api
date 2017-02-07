'use strict';

const _ = require('underscore');
const Boom = require('boom');

const Network = function () {

    this.vertices = {};
    this.neighbors = {};
};

Network.prototype.addHost = function (newHost) {

    if (_.has(this.vertices, newHost)) {

        return Boom.conflict('Host already exists. You pressed the key twice maybe, did you?');
    }
    this.vertices[newHost] = [];
    this.neighbors[newHost] = [];
};

Network.prototype.getHosts = function () {

    return _.keys(this.vertices);
};

Network.prototype.createLink = function (source, dest, description) {

    if (!_.has(this.vertices, source) || !_.has(this.vertices, dest)) {

        return Boom.notFound('Host does not exists. Uh Oh!');
    }
    const routeExists = _.filter(this.vertices[source], function (i) {

        return (i.dest === dest) && (i.description === description);
    });
    if ( !_.isEmpty(routeExists)) {

        return Boom.conflict('Link already exists. You pressed the key twice maybe, did you?');
    }
    this.vertices[source].push({ description , dest });
    this.neighbors[source].push(dest);
    return true;
};

Network.prototype.getLinks = function () {

    return this.vertices;
};

Network.prototype.getPath = function (source, dest) {

    if (_.isEmpty(this.vertices)) {
        return [];
    }
    let previous = {},
        queue = [source],
        visited = { source: true };
    for (let rear = 0; rear < queue.length; rear++) {

        let curVertice = queue[rear],
            neighbors = this.neighbors[curVertice];
        for (let i = 0; i < neighbors.length; i++) {

            if (visited[neighbors[i]]) continue;
            visited[neighbors[i]] = true;
            if (neighbors[i] === dest) {

                let path = [neighbors[i]];
                while (curVertice !== source) {

                    path.push(curVertice);
                    curVertice = previous[curVertice];
                }
                path.push(curVertice);
                return this.getPathOutput(path);
            }
            queue.push(neighbors[i]);
            previous[neighbors[i]] = curVertice;
        }
    }
    return [];
};

Network.prototype.getPathOutput = function (link) {

    if (_.isEmpty(link)) {
        return link;
    }
    let response = [],
        currentNetwork = this,
        route = {};
    link.reverse();
    link.forEach(function (source, value) {

        if (value !== link.length - 1) {

            route.source = source;
            route.description = _.chain(currentNetwork.vertices[source])
                .values()
                .filter(function (route) {
                    return route.dest === link[value + 1];
                })
                .pluck('description').toString();
            route.dest = link[value + 1];
            response.push(route);
        }
    });
    return response;
};

module.exports = new Network();
