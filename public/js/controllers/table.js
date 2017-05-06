import * as data from '../data/data.js';
import { toUpperHb } from '../handlebars_helpers.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../filter.js';
import { template } from '../template.js';
import { sideBarMenu } from './homepage/right-side-bar.js';
import $ from 'jquery';


const tableController = {
    get() {
        // console.log('Yeey!');

        data.getData().then(function(data) {

            template.get('table').then(function(html) {
                // console.log(html);
                // console.log(data);
                const template = Handlebars.compile(html);

                // Call toUpperHb so that it register the handlebars helper
                toUpperHb();

                // Wrap the data in an object so that the handlebars template could work
                data = { obj: data };

                $('#main').html(template(data));
                attachTableFilterToInput();
                // jQuery plugin to make the table sortable
                $(function() { $("#main-table").tablesorter(); });
            });
            sideBarMenu.get();
        })
    }
};

export { tableController };