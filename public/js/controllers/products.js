import * as data from '../data/data.js';
import { toUpperHb } from '../handlebars_helpers.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../filter.js';
import { template } from '../template.js';
import $ from 'jquery';

const productsController = {
    get() {
        // console.log('Zemi si');

        data.getOnlyNames().then(function(namesData) {
            template.get('buttons').then(function(html) {
                //console.log(html);
                const buttonTemplate = Handlebars.compile(html);
                //let name = ['a','b','c'];
                //console.log(namesData);
                $('#main').html(buttonTemplate({ name: namesData }));
                attachListFilterToInput();
                $('#right-side-bar').html('');
            })
        })

    }
}

export { productsController };