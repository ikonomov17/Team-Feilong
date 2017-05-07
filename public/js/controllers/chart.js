import { template } from '../template.js';
import $ from 'jquery';


const chartController = {
    get() {
        template.get('chart')
            .then(template => {
                $('#contents').html(template());
                toastr.success("Chart loaded!");
            });
    }
};

export { chartController };