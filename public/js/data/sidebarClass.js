import { template } from '../template.js';
import * as data from './data.js';
import $ from 'jquery';

class SideBar {

    callFavorites(data) {
        const promise = new Promise((resolve) => {
            resolve(SideBar.templateCompile('#side-bar-top', 'sidebar-favorites', data))
        }).then(() => { // Still cannot make this event work...
            $('#favorites-list-table').on('click', () => {
                // Add adequate classes to rows
                // https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_table_contextual&stacked=h
                console.log('WORKES'); //But now it does not work for some reason...
            });
        });

    }

    callSearch(data) {

        SideBar.templateCompile('#side-bar-bottom', 'sidebar-search', data.getOnlyNames())
    }

    callTopTen(data) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-top-ten', data)
    }

    callBottomTen(data) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-bottom-ten', data)
    }

    callNews(data) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-news', data)
    }

    static templateCompile(attachTo, templateName, data) {

        let promise = new Promise((resolve, reject) => {

                resolve(template.get(templateName))
            })
            .then(template => {

                $(attachTo).html(template(data));

            })
            .catch(error => toastr.error(error.message));

    }
}
export { SideBar }