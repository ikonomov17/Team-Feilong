import $ from 'jquery';
import 'tablesorter';
import { Data } from 'data';
import { sideBarController } from './sidebar.js';
import { templater } from '../utils/templater.js';
import { upperizer } from '../utils/upperizer.js';
import { TableFilter } from '../utils/filter.js';

const tableController = {
    get() {
        sideBarController.getSideContent();

        Promise.all([
                templater.get('table'),
                Data.getTableData()
            ])
            .then(([template, data]) => {
                // Call toUpperHb so that it register the handlebars helper
                upperizer.do();

                // Wrap the data in an object so that the handlebars template could work
                data = { obj: data };

                $('#contents').html(template(data));
                TableFilter.attachTableFilterToInput('#table-input');
                // jQuery plugin to make the table sortable
                $(function() { $("#main-table").tablesorter(); });
            })
    }
};

export { tableController };