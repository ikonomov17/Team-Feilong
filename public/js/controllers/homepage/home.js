import * as data from '../../data/data.js';
import { template } from '../../template.js';
import { sideBarContent } from './sidebar-router.js';
import $ from 'jquery';


const homeController = {
    get() {

        Promise.all([
                template.get('home'),
                template.get('sidebar-favorites'),
                template.get('side-menu')
            ])
            .then(([homeT, sideBarT, sideMenuT]) => {
                $('#contents').html(homeT());
                $('#side-bar').html(sideBarT());
                $('#side-menu').html(sideMenuT());
                toastr.success("Welcome home!");
            });
        sideBarContent.get({ sideBarContent: ':favorites' });
    }
};

export { homeController };