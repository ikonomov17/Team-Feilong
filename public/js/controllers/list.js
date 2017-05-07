import * as data from '../data/data.js';
import { toUpperHb } from '../handlebars_helpers.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../filter.js';
import { template } from '../template.js';
import $ from 'jquery';

const listController = {
    get() {
        // console.log('Zemi si');

        Promise.all([
                template.get('list'),
                data.getOnlyNames()
            ])
            .then(([template, data]) => {
                data = { name: data }
                $('#contents').html(template(data));
                attachListFilterToInput();
                //$('#right-side-bar').html('');
            })
            .catch(error => toastr.error(error.message));
    }
}

export { listController };