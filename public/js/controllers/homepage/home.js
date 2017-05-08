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
                $('#side-bar-top').html(sideBarT());
                $('#side-menu').html(sideMenuT());
                toastr.success("Welcome home!");
            })
            .then(() => {
                sideBarContent.get({ sideBarContent: ':favorites' });
            })
            .then(() => {
                $('.sidebar-nav').on('click', (event) => {
                    const $selectedEl = $(event.target).parent();
                    $('.active').removeClass('active')
                    $selectedEl.addClass('active');

                    // hash changing:
                    let hash = location.hash.split(':');
                    location.hash = hash[0].split('/')[0] + '/:' + $selectedEl.attr('id');
                });
            })
    }
};

export { homeController };