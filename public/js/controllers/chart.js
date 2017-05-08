import $ from 'jquery';
import { template } from '../template.js';
import { sideBarController } from './sidebar.js';
import { getChartData } from '../data/data.js';
import { createCompleteChart } from '../chartPainter.js';

const chartController = {
    get() {
        sideBarController.getSideContent();
        template.get('chart')
            .then(template => {
                $('#contents').html(template());
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
                            createCompleteChart(data);
                            toastr.success("Chart loaded!");
                        });
                })

            })
    }
}

export { chartController };