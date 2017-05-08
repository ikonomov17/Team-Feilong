import { template } from '../template.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../filter.js';
import * as data from './data.js';
import $ from 'jquery';

class SideBar {

    callFavorites(params) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-favorites', params)
            .then(() => {
                $('#side-bar-bottom').html('');

                //Colorise favorites according to FScore
                $('.fscore-favorite').each((i, val) => {
                    const fScore = $(val);
                    if (fScore.html() > 0) {
                        fScore.parent().addClass('list-group-item-success');
                    } else {
                        fScore.parent().addClass('list-group-item-danger');
                    }
                })

                //Select fist favorite by default
                $('#favorites-list-table').children("tr").eq(0).addClass('info');

                $('#favorites-list-table').on('click', () => {
                    const $selectedEl = $(event.target).parent();
                    $('.info').removeClass('info')
                    $selectedEl.addClass('info');
                });
            });

    }

    callSearch(params) {
        // To make it work with templateCompile()
        Promise.all([
                template.get('sidebar-search'),
                data.getOnlyNames()
            ])
            .then(([template, data]) => {
                console.log(data);
                data = { name: data }
                console.log(data);
                $('#side-bar-bottom').html(template(data));
                attachListFilterToInput();
                //$('#right-side-bar').html('');
            })
            .catch(error => toastr.error(error.message));
    }

    callTopTen(params) {
        // console.log(params);
        SideBar.templateCompile('#side-bar-top', 'sidebar-top-ten', params)
    }

    callBottomTen(params) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-bottom-ten', params)
    }

    callNews(params) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-news', params)
    }

    static templateCompile(attachTo, templateName, params) {

        return new Promise((resolve, reject) => {

                resolve(template.get(templateName))
            })
            .then(template => {

                $(attachTo).html(template(params));

            })
            .catch(error => toastr.error(error.message));

    }
}
export { SideBar }