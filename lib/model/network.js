'use strict';

const _ = require('underscore');
const Boom = require('boom');

const Network = function () {

    this.vertices = {};
    this.neighbors = {};
};
