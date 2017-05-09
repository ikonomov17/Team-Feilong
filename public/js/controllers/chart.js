import $ from 'jquery';
import { template } from '../template.js';
import { sideBarController } from './sidebar.js';
import { Data } from 'data';
import { createCompleteChart } from '../chartPainter.js';
import Bloodhound from 'bloodhound';
import { typehead } from 'typeahead';

const chartController = {
    get() {
        sideBarController.getSideContent();
        template.get('chart')
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
                    Data.getData('chart',ticker,period)
                    .then((data) => {
                        template.get('chartHeader').then(template => {
                            $('#company-info').html(template(data.infoData));
                        })
                        createCompleteChart(data.historicalData);
                        toastr.success("Chart loaded!");
                    }).catch(() => {
                        $('#company-info').html($('<h3/>').text('No company with this index! Try another one..').addClass('text-center'));
                    });
                })

            })
    }
}

export { chartController };