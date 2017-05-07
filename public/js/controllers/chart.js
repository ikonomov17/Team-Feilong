import { template } from '../template.js';
import $ from 'jquery';
import { getChartData } from 'data';
import { createCompleteChart } from 'chartPainter';

const chartController = {
    get() {
        getChartData('aapl',{number: 10, type: "d"})
            .then((data) => {
                $('#contents').append('<input/>').append('<input/>');
                createCompleteChart(data);
                toastr.success("Chart loaded!");
            });
    }
};

export { chartController };