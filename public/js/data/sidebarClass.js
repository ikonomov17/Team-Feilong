import { template } from '../template.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../filter.js';
import * as data from './data.js';
import $ from 'jquery';
import * as requester from '../requester.js';
import Bloodhound from 'bloodhound';
import { typehead } from 'typeahead';

class SideBar {

    callFavorites(params) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-favorites', params)
            .then(() => {
                $('#side-bar-bottom').html('');

                SideBar.coloriseTable();

                //Select fist favorite by default
                $('.ticket-list-table').children("tr").eq(0).addClass('info');

                $('.favorites-list-table').on('click', () => {
                    const $selectedEl = $(event.target).parent();
                    $('.info').removeClass('info');
                    $selectedEl.addClass('info');
                });
            });

    }

    callSearch(params) {
        // To make it work with templateCompile()
        Promise.all([
                template.get('sidebar-search')
            ])
            .then(([template]) => {
                $('#side-bar-bottom').html(template());
                console.log(data);
                var symbolsAndNames = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    prefetch: './symbolsAndNames.json'
                });
                // passing in `null` for the `options` arguments will result in the default
                // options being used
                $('#company-search').typeahead(null, {
                    name: 'symbolsAndNames',
                    source: symbolsAndNames
                });
                
            })
            .catch(error => toastr.error(error.message));
    }

    callTopTen(params) {

        let arr = params.slice(0);

        SideBar.sortByKey(arr, 'fScore', -1);

        SideBar.templateCompile('#side-bar-top', 'sidebar-top-ten', arr)
            .then(() => {
                $('#side-bar-bottom').html('');
                SideBar.coloriseTable();

                $('.ticket-list-table').on('click', () => {
                    const $selectedEl = $(event.target).parent();
                    $('.info').removeClass('info');
                    $selectedEl.addClass('info');
                });
            });
    }

    callBottomTen(params) {
        let arr = params.slice(0);

        SideBar.sortByKey(arr, 'fScore', 1);

        SideBar.templateCompile('#side-bar-top', 'sidebar-bottom-ten', arr)
            .then(() => {
                $('#side-bar-bottom').html('');
                SideBar.coloriseTable();
                $('.tickets-list-table').on('click', () => {
                    const $selectedEl = $(event.target).parent();
                    $('.info').removeClass('info');
                    $selectedEl.addClass('info');
                });
            });
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

    static coloriseTable() {
        //Colorise table according to FScore
        $('.ticket-fscore').each((i, val) => {
            const fScore = $(val);
            if (fScore.html() > 0) {
                fScore.parent().addClass('list-group-item-success');
            } else {
                fScore.parent().addClass('list-group-item-danger');
            }
        });
    }

    static sortByKey(array, key, descending) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return (((x < y) ? -1 : ((x > y) ? 1 : 0)) * (descending));
        });
    }
}
export { SideBar }