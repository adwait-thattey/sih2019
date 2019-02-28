// Function to get the start to End Year
// Returns an array like ['2012-13','2013-14'..'2017-18']
function getYears(graphData) {
    // need graph data to find the oldest year
    var oldestYear = graphData[0].start_year;
    var yearCount = 0;

    var yearList = [];

    for (var yearData of graphData) {
        if (oldestYear > yearData.start_year) oldestYear = yearData.start_year;
        for (var dateLength in yearData.values) {
            if (yearData.values[dateLength].length > yearCount) yearCount = yearData.values[dateLength].length;
        }
    }

    // Max yearCount received
    for (var i=0, j=oldestYear; i<yearCount; i++,j++) {
        yearList.push(j);
    }
    return yearList;
}


function getSeriesData(graphDataValues) {
    var seriesData = []; // New data everytime

    for (row of graphDataValues) {

        // Filling the data
        var seriesElement = {
            name: row.name,
            // TEMPORARY SELECTED CURRENT
            data: row.values.current,
        };
        seriesData.push(seriesElement);
    }
    return seriesData;
}


function buildLineChart(graphDataValues, htmlId) {

    var seriesData = getSeriesData(graphDataValues);

    Highcharts.chart(htmlId, {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Monthly Average Temperature'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: getYears(graphDataValues)
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: seriesData
    });

};


function buildAreaChart(graphDataValues, htmlId) {

    var seriesData = getSeriesData(graphDataValues);

    Highcharts.chart(htmlId, {
        chart: {
            type: 'area'
        },
        title: {
            text: 'US and USSR nuclear stockpiles'
        },
        subtitle: {
            text: 'Sources: <a>mospi.gov.in</a>'
        },
        xAxis: {
            categories: getYears(graphDataValues)
        },
        yAxis: {
            title: {
                text: 'Nuclear weapon states'
            },
        },
        tooltip: {
            pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: getYears(graphDataValues)[0],
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: seriesData
    });
}

function buildBarChart(graphDataValues, htmlId) {

    var seriesData = getSeriesData(graphDataValues);


    Highcharts.chart(htmlId, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: getYears(graphDataValues),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: seriesData
    });
}


function buildDualChart(graphDataValues, htmlId) {

    var seriesData = getSeriesData(graphDataValues);

    Highcharts.chart(htmlId, {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: getYears(graphDataValues),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: seriesData
    });
}


//////////////////////////////////
////////// Right Chart ///////////
//////////////////////////////////


function buildPieChart(graphDataValues, htmlId) {

    var seriesData = getSeriesData(graphDataValues);

    var renamedObject = [];
    for (var object of seriesData) {
        var sumOfData = 0;

        for (var dataValues of object.data) {
            sumOfData += dataValues
        }

        var newObject = {
            name: object.name,
            y: sumOfData
        };
        renamedObject.push(newObject);
    }

    console.log(renamedObject);

    Highcharts.chart(htmlId, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: renamedObject
        }]
    });


}

















