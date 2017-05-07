import $ from 'jquery';

export function createCompleteChart(data){
    const plot = createPlot();
    const svg = createSvgAppendedToContainer(plot);
    appendClassesToSvg(svg);
    draw(data,plot,svg);
}

const margin = {top: 20, right: 20, bottom: 30, left: 50},
    contentWidth = $('#contents').width() - 50,
    contentHeight = $(window).height() / 1.5,
	width = contentWidth - margin.left - margin.right,
	height = contentHeight - margin.top - margin.bottom;

function createPlot(){
	var x = techan.scale.financetime()
            .range([0, width]);

	var y = d3.scaleLinear()
            .range([height, 0]);

	var candlestick = techan.plot.candlestick()
            .xScale(x)
            .yScale(y);

	var ichimoku = techan.plot.ichimoku()
            .xScale(x)
            .yScale(y);

	var xAxis = d3.axisBottom(x);

	var yAxis = d3.axisLeft(y)
            .tickFormat(d3.format(",.3s"));

	return {
        x : x,
        y : y,
        candlestick: candlestick,
        ichimoku: ichimoku,
        xAxis: xAxis,
        yAxis: yAxis
    }
}

function createSvgAppendedToContainer(plot){
	var svg = d3.select("#contents").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("clipPath")
            .attr("id", "clip")
        .append("rect")
            .attr("x", 0)
            .attr("y", plot.y(1))
            .attr("width", width)
            .attr("height", plot.y(0) - plot.y(1));

	return svg;
}

function appendClassesToSvg(svg){
	svg.append("g")
                .attr("class", "ichimoku")
                .attr("clip-path", "url(#clip)");

	svg.append("g")
                .attr("class", "candlestick")
                .attr("clip-path", "url(#clip)");

	svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

	svg.append("g")
                .attr("class", "y axis")
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Ichimoku");

}

function draw(data,plot,svg) {
    var ichimokuIndicator = techan.indicator.ichimoku();
    // Don't show where indicators don't have data
    var indicatorPreRoll = ichimokuIndicator.kijunSen() + ichimokuIndicator.senkouSpanB();
	var ichimokuData = ichimokuIndicator(data);
	plot.x.domain(data.map(ichimokuIndicator.accessor().d));
    // Calculate the y domain for visible data points (ensure to include Kijun Sen additional data offset)
	plot.y.domain(techan.scale.plot.ichimoku(ichimokuData.slice(indicatorPreRoll-ichimokuIndicator.kijunSen())).domain());

    // Logic to ensure that at least +KijunSen displacement is applied to display cloud plotted ahead of ohlc
	plot.x.zoomable().clamp(false).domain([indicatorPreRoll, data.length+ichimokuIndicator.kijunSen()]);

	svg.selectAll("g.candlestick").datum(data).call(plot.candlestick);
	svg.selectAll("g.ichimoku").datum(ichimokuData).call(plot.ichimoku);
	svg.selectAll("g.x.axis").call(plot.xAxis);
	svg.selectAll("g.y.axis").call(plot.yAxis);
}
