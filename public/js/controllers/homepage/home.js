import * as data from '../../data/data.js';
import { template } from '../../template.js';
import { sideBarMenu } from './right-side-bar.js';
import $ from 'jquery';


const homeController = {
    get() {
        // console.log('Yeey!');

        //data.getData().then(function(data) {

        template.get('home').then(function(html) {
            // console.log(html);
            // console.log(data);
            const template = Handlebars.compile(html);

            $('#main').html(template);
            toastr.success("Welcome!");
        });
        sideBarMenu.get();
        //})
    }
};

export { homeController };