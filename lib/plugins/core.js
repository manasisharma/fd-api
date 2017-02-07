'use strict';

const Glob = require('glob');
const CamelCase = require('camelcase');
const Path = require('path');
const Async = require('async');
const _ = require('lodash');

const internals = {};

internals.register = module.exports = (server, options, next) => {

    Async.auto({
        handlers: (callback) => {

            if (!options.handlers) {
                return callback(null, false);
            }

            return internals.registerHandlers(server, options.handlers, callback);
        },
        routes: ['handlers', (data, callback) => {

            if (!options.routes) {
                return callback(null, false);
            }

            return internals.registerRoutes(server, options.routes, callback);
        }]
    }, (err, res) => {

        if (err) {
            return next(err);
        }

        server.log(['info', internals.register.attributes.pkg.name], 'core plugin loaded successfully.');

        return next();
    });
};

internals.register.attributes = {
    multi: false,
    pkg: require('../../package.json')
};

const loadFiles = (pattern, options) => {

    const files = Glob.sync(pattern, options);

    return _.map(files, (file) => {

        const filePath = `${options.cwd}/${file}`;
        return filePath;
    });
};

internals.registerHandlers = (server, options, callback) => {

    _.map(loadFiles(options.pattern, options.glob), (file) => {

        const handlerName = CamelCase(Path.basename(file).replace(/.js/, ''));
        const handlerFile = require(file);
        server.handler(handlerName, handlerFile);

        server.log(['info', 'registerHandlers'], `registered handler in file ${handlerName}`);
    });

    return callback(null, true);
};

internals.registerRoutes = (server, options, callback) => {

    _.map(loadFiles(options.pattern, options.glob), (file) => {

        const routeFileName = CamelCase(Path.basename(file).replace(/.js/, ''));
        const router = require(file);
        router(server);

        server.log(['info', 'registerRoutes'], `registered routes in file ${routeFileName}`);
    });

    return callback(null, true);
};
