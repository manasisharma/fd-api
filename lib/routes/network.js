'use strict';

const Joi = require('joi');

module.exports = (server) => {

    server.route([
        {
            method: 'GET',
            path: '/hosts',
            config: {
                description: 'List hosts',
                notes: 'To get a listing of all hosts.',
                tags: ['api'],
                handler: { network: { method: 'fetchHosts' } }
            }
        },
        {
            method: 'POST',
            path: '/host',
            config: {
                description: 'Create new host',
                notes: 'To create a new host. Hosts need a name.',
                tags: ['api'],
                handler: { network: { method: 'createHost' } },
                validate: {
                    payload: {
                        host: Joi.string().required()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/links',
            config: {
                description: 'List links',
                notes: 'To get a listing of all links.',
                tags: ['api'],
                handler: { network: { method: 'fetchLinks' } }
            }
        },
        {
            method: 'POST',
            path: '/link',
            config: {
                description: 'Create new link',
                notes: 'To create a link between two hosts.',
                tags: ['api'],
                handler: { network: { method: 'createLink' } },
                validate: {
                    payload: {
                        source: Joi.string().required(),
                        dest: Joi.string().required(),
                        description: Joi.string().only('scp', 'ftp', 'rsync', 'samba').required()
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/path/{A}/to/{B}',
            config: {
                description: 'List shortest path between two hosts',
                notes: 'To retrieve the easiest way to transfer a file between two hosts.',
                tags: ['api'],
                handler: { network: { method: 'fetchPath' } },
                validate: {
                    params: {
                        A: Joi.string().required(),
                        B: Joi.string().required()
                    }
                }
            }
        }
    ]);
};
