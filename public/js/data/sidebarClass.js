import $ from 'jquery';
import { Data } from '../data/data.js';
import { Database } from '../data/database.js';
import * as requester from '../utils/requester.js';
import { templater } from '../utils/templater.js';
import { TableFilter } from '../utils/filter.js';
import { chartPainter } from '../utils/chartPainter.js';
import Bloodhound from 'bloodhound';
import { typeahead } from 'typeahead';

class SideBar {
    callFavorites(params) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-favorites', params)
            .then(() => {
                $('#side-bar-bottom').html('');
                SideBar.coloriseTable();

                //Select fist favorite by default
                $('.favorites-list-table').children("tr").eq(0).addClass('info');

                $('.favorites-list-table').on('click', () => {
                    const $selectedEl = $(event.target).parent();
                    $('.info').removeClass('info');
                    $selectedEl.addClass('info');
                });
            });

        Database.app.auth().onAuthStateChanged(user => {
            if (user !== null) {
                Database.getFavorites()
                    .then((favs) => {
                        // console.log(favs);

                        let indices = [];

                        favs.forEach((x) => {
                            // console.log(x);
                            let prom = new Promise((resolve) => {
                                const dataIndex = Data.getIndex(x);
                                dataIndex.then((dataIndex) => {
                                    // console.log('hereEee');
                                    // console.log(dataIndex);
                                    resolve(dataIndex);
                                });
                            });
                            prom.then((indexData) => {
                                    console.log(indexData);
                                    indices.push(indexData);
                                })
                                .then(() => {
                                    SideBar.templateCompile('#side-bar-top', 'sidebar-favorites', indices)
                                        .then(() => {
                                            SideBar.coloriseTable();
                                        });
                                    //
                                });

                        });
                    });
            }
        });
    }



    callSearch(params) {
        // To make it work with templateCompile()
        Promise.all([
                templater.get('sidebar-search')
            ])
            .then(([templ]) => {
                $('#side-bar-bottom').html(templ());

                /* Search engine */
                var symbolsAndNames = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    prefetch: '../../json/symbolsAndNames.json'
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

                    Database.addFavorite(ticker);

                    let svg = $('svg');

                    if (svg.length != 0) {
                        svg.remove();
                    }

                    Data.getChartData(ticker, period).then((data) => {
                        templater.get('chartHeader').then(template => {
                            $('#contents').html(template(data.infoData));
                            chartPainter.createCompleteChart(data.historicalData);
                            toastr.success("Chart loaded!");
                        });
                    }).then((data) => {

                    }).catch(() => {
                        $('#contents').html($('<h3/>').text('No company with this index! Try another one..').addClass('text-center'));
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
                    $('.info').removeClass('info');
                    const $selectedEl = $(event.target).parent();
                    $selectedEl.addClass('info');
                });
            });
    }

    callNews(params) {
        SideBar.templateCompile('#side-bar-top', 'sidebar-news', params)
    }

    static templateCompile(attachTo, templateName, params) {

        return new Promise((resolve, reject) => {

                resolve(templater.get(templateName))
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