import * as data from '../../data/data.js';
import { template } from '../../template.js';
import { Index } from '../../data/indexClass.js';
import $ from 'jquery';

class SideBar {

    callFavorites(data) {
        SideBar.templateCompile('sidebar-favorites', data)
    }

    callTopTen(data) {
        SideBar.templateCompile('sidebar-top-ten', data)
    }

    callBottomTen(data) {
        SideBar.templateCompile('sidebar-bottom-ten', data)
    }

    callNews(data) {
        SideBar.templateCompile('sidebar-news', data)
    }

    static templateCompile(templateName, data) {
        template.get(templateName).then(template => {

            $('#side-bar').html(template(data));

            $('.sidebar-nav').on('click', (event) => {
                const $selectedEl = $(event.target).parent();
                $('.active').removeClass('active')
                $selectedEl.addClass('active');

                // hash changing:
                let hash = location.hash.split(':');
                location.hash = hash[0].split('/')[0] + '/:' + $selectedEl.attr('id');
            });
        });
    }
}
export { SideBar }