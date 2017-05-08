import { template } from '../template.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../filter.js';
import * as data from './data.js';
import $ from 'jquery';

class SideBar {

    callFavorites(params) {
        const promise = new Promise((resolve) => {
            resolve(SideBar.templateCompile('#side-bar-top', 'sidebar-favorites', params))
        }).then(() => { // Still cannot make this event work...
            $('#favorites-list-table').on('click', () => {
                // Add adequate classes to rows
                // https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_table_contextual&stacked=h
                console.log('WORKES'); //But now it does not work for some reason...
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

        // SideBar.templateCompile('#contents', 'sidebar-search', { name: data.getOnlyNames() })
        // console.log(data.getOnlyNames());
    }

    callTopTen(params) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-top-ten', params)
    }

    callBottomTen(params) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-bottom-ten', params)
    }

    callNews(params) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-news', params)
    }

    static templateCompile(attachTo, templateName, params) {

        let promise = new Promise((resolve, reject) => {

                resolve(template.get(templateName))
            })
            .then(template => {

                $(attachTo).html(template(params));

            })
            .catch(error => toastr.error(error.message));

    }
}
export { SideBar }