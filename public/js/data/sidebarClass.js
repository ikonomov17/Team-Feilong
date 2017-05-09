import { template } from '../template.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../filter.js';
import { Data } from 'data';
import $ from 'jquery';
import * as requester from '../requester.js';
import Bloodhound from 'bloodhound';
import { typehead } from 'typeahead';
import { createCompleteChart } from '../chartPainter.js';
import { database } from '../data/database.js';

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
            .then(([templ]) => {
                $('#side-bar-bottom').html(templ());
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

                $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
                    const separator = ' - ';
                    const ticker = suggestion.split(separator)[0];
                    const period = { number: 5, type: 'd' };

                    database.addFavorite(ticker);

                    let svg = $('svg');

                    if (svg.length != 0) {
                        svg.remove();
                    }

                    Data.getData('chart', ticker, period).then((data) => {
                        template.get('chartHeader').then(template => {
                            $('#company-info').html(template(data.infoData));
                        });
                        createCompleteChart(data.historicalData);
                        toastr.success("Chart loaded!");
                    }).catch(() => {
                        $('#company-info').html($('<h3/>').text('No company with this index! Try another one..').addClass('text-center'));
                    });
                })
            })
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