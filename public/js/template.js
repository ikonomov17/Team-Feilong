import 'jquery';
import {get as getRequest } from './requester.js';

const cached = {};

const template = {
    get(name) {

        if (cached[name]) {
            return Promise.resolve(cached[name]);
        }

        return getRequest(`../templates/${name}.handlebars`)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);
                return Promise.resolve(compiledTemplate);
            });
    }
}

export { template };