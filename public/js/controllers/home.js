import $ from 'jquery';
import * as data from '../data/data.js';
import { template } from '../template.js';
import { sideBarController } from './sidebar.js';

const homeController = {
    get() {
        sideBarController.getSideContent();
        template.get('home')
            .then(template => {
                $('#contents').html(template());
                toastr.success("Welcome home!");
            })
    }
};

export { homeController };