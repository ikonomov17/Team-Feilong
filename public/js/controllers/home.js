import $ from 'jquery';
import { templater } from '../utils/templater.js';
import { sideBarController } from './sidebar.js';


const homeController = {
    get() {
        sideBarController.getSideContent();
        templater.get('home')
            .then(template => {
                $('#contents').html(template());
                toastr.success("Welcome home!");
            })
    }
};

export { homeController };