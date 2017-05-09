import $ from 'jquery';
import 'tablesorter';
import { Data } from 'data';
import { template } from '../template.js';
import { sideBarController } from './sidebar.js';
import { toUpperHb } from '../handlebars_helpers.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../filter.js';

const tableController = {
    get() {
        sideBarController.getSideContent();

        Promise.all([
                template.get('table'),
                Data.getTableData()
            ])
            .then(([template, data]) => {
                // Call toUpperHb so that it register the handlebars helper
                toUpperHb();

                // Wrap the data in an object so that the handlebars template could work
                data = { obj: data };

                $('#contents').html(template(data));
                attachTableFilterToInput();
                // jQuery plugin to make the table sortable
                $(function() { $("#main-table").tablesorter(); });
            })
    }
};

export { tableController };