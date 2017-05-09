import $ from 'jquery';
import { Data } from 'data';
import { sideBarController } from './sidebar.js';
import { templater } from '../utils/templater.js';
import { chartPainter } from '../utils/chartPainter.js';
import Bloodhound from 'bloodhound';
import { typehead } from 'typeahead';

const chartController = {
    get() {
        sideBarController.getSideContent();
        templater.get('chart')
            .then(templ => {
                $('#contents').html(templ());

                var symbols = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.whitespace,
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    prefetch: './symbols.json'
                });
                // passing in `null` for the `options` arguments will result in the default
                // options being used
                $('#prefetch .typeahead').typeahead(null, {
                    name: 'symbols',
                    source: symbols
                });

                $('#search-button').on('click', () => {
                    const ticker = $("#ticker").val().toLowerCase();
                    const number = $("#period").val();
                    const type = $('input[name=periodType]:checked').val();
                    const period = {
                        number: +number,
                        type: type
                    }

                    let svg = $('svg');

                    if (svg.length != 0) {
                        svg.remove();
                    }

                    // TODO: add validation (all input required)!
                    Data.getChartData(ticker, period)
                        .then((data) => {
                            templater.get('chartHeader').then(template => {
                                $('#company-info').html(template(data.infoData));
                            })
                            chartPainter.createCompleteChart(data.historicalData);

                            toastr.success("Chart loaded!");
                        }).catch(() => {
                            $('#company-info').html($('<h3/>').text('No company with this index! Try another one..').addClass('text-center'));
                        });
                })

            })
    }
}

export { chartController };