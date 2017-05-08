import $ from 'jquery';
import { template } from '../template.js';
import { sideBarController } from './sidebar.js';
import { getChartData } from '../data/data.js';
import { createCompleteChart } from '../chartPainter.js';

const chartController = {
    get() {
        sideBarController.getSideContent();
        template.get('chart')
            .then(templ => {
                $('#contents').html(templ());
                $("#search-container").css('margin-top', '15px');
                $('#search-button').on('click', () => {
                    const ticker = $("#ticker").val();
                    const number = $("#period").val();
                    const type = $('input[name=periodType]:checked').val();
                    const period = {
                        number: +number,
                        type: type
                    }

                    let svg = $('svg');
                    console.log(svg.length)
                    if (svg.length != 0) {
                        svg.remove();
                    }

                    // TODO: add validation (all input required)!
                    getChartData(ticker, period)
                        .then((data) => {
                            template.get('chartHeader').then(template => {
                                console.log(template)
                                $('#company-info').html(template(data.infoData));
                            })
                            createCompleteChart(data.historicalData);
                            toastr.success("Chart loaded!");
                        });
                })

            })
    }
}

export { chartController };