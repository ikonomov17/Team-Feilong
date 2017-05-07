import * as data from '../data/data.js';
import { toUpperHb } from '../handlebars_helpers.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../filter.js';
import { template } from '../template.js';
import { sideBarMenu } from './homepage/right-side-bar.js';
import $ from 'jquery';


const tableController = {
    get() {
        // console.log('Yeey!');

        Promise.all([
                template.get('table'),
                data.getData()
            ])
            .then(([template, data]) => {
                // console.log(template);
                // console.log(data);

                // Call toUpperHb so that it register the handlebars helper
                toUpperHb();

                // Wrap the data in an object so that the handlebars template could work
                data = { obj: data };

                $('#main').html(template(data));
                attachTableFilterToInput();
                // jQuery plugin to make the table sortable
                $(function() { $("#main-table").tablesorter(); });

                sideBarMenu.get();
            })
    }
};

export { tableController };