import { template } from '../template.js';
import $ from 'jquery';
import { getChartData } from 'data';
import { createCompleteChart } from 'chartPainter';

const chartController = {
    get() {
        template.get('chart')
            .then(templ => {
                $('#contents').html(templ());
                $("#search-container").css('margin-top','15px');
                $('#search-button').on('click', () => {
                    const ticker = $("#ticker").val().toLowerCase();
                    const number = $("#period").val();
                    const type = $('input[name=periodType]:checked').val();
                    const period = {
                        number: +number,
                        type: type
                    }

                    let svg = $('svg');

                    if(svg.length != 0){
                        svg.remove();
                    }

                    // TODO: add validation (all input required)!
                    getChartData(ticker,period)
                    .then((data) => {
                        console.log(data.historicalData)
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