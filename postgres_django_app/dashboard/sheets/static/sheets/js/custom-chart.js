// // Function to get the start to End Year

// // Returns an array like ['2012-13','2013-14'..'2017-18']
function getYears(data, property) {

    var yearList = [];

    var startingYear = data[property];



    return yearList;
}
//
//
// function getSeriesData(graphDataValues) {
//     var seriesData = []; // New data everytime
//
//     for (row of graphDataValues) {
//
//         // Filling the data
//         var seriesElement = {
//             name: row.name,
//             // TEMPORARY SELECTED CURRENT
//             data: row.values.current,
//         };
//         seriesData.push(seriesElement);
//     }
//     return seriesData;
// }



//
// buildTimeSeriesChart('gva-container-timeSeries1');
// buildPieChart('gva-container-pie1');
// buildDualChart('gva-container-db1');
//

function buildTimeSeriesChart(htmlId, JSONdata, type) {

    console.log(JSONdata);

    var twoChildAttr = [];
    var text;
    var types = [];

    if (type === 'gva at basic prices') {
        twoChildAttr = [JSONdata[type].current, JSONdata[type].constant];
        text = 'Current and constant GVA Values';
        types = ['current', 'constant'];
    }
    if (type === 'gva') {
        twoChildAttr = [JSONdata[11].values.current, JSONdata[11].values.constant];
        text = 'Total Current and constant GVA Values';
        types = ['current', 'constant'];
    }
    if (type === 'nva at basic prices') {
        twoChildAttr = [JSONdata[type].current, JSONdata[type].constant];
        text = 'Current and constant NVA Values';
        types = ['current', 'constant'];
    }
    if (type === 'gdp') {
        twoChildAttr = [JSONdata.values.current, JSONdata.values.constant];
        text = 'Current and constant GDP Values';
        types = ['current', 'constant'];
    }
    if (type === 'indices') {
        twoChildAttr = [data[type].price, data[type].quantum];
        text = 'Price and Quantum indices Values';
        types = ['price', 'quantum'];
    }


    Highcharts.chart(htmlId, {

        title: {
            text: text
        },

        subtitle: {
            text: 'Source: mospi.gov.in'
        },

        yAxis: {
            title: {
                text: 'Values for ' + type
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: JSONdata.start_year
            }
        },

        series: [{
            name: types[0],
            data: twoChildAttr[0]
        }, {
            name: types[1],
            data: twoChildAttr[1]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}



function buildPieChart(htmlId, JSONdata, type) {

    if (type === 'gva') {
        var data = [];
        for (var i = 0; i < 11; i++) {
            var object = {
                name: JSONdata[i].name,
                y: JSONdata[i].values.constant[4]
            }
            data.push(object);
        }
        var text = 'Distribution of Constant GVA value for 2015'
    }

    if (type === '')

     if (type === 'consumption') {
        var data = [];
        for (var i = 0; i <= 11; i++) {
            var object = {
                name: JSONdata[i].name,
                y: JSONdata[i].values['household individual consumption expenditure'][4]
            };
            data.push(object);
        }
        var text = 'Distribution of Consumption GVA value for 2015'
    }

    Highcharts.chart(htmlId, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: text
        },
        subtitle: {
            text: 'Source: mospi.gov.in'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: data
        }]
    });

}

function buildLineChart(htmlId) {

    var twoChildAttr = [];

    if (type === 'gva at basic prices') {
        twoChildAttr = [data[type].current, data[type].constant];
    }
    if (type === 'nva at basic prices') {
        twoChildAttr = [data[type].current, data[type].constant];
    }
    if (type === 'indices') {
        twoChildAttr = [data[type].price, data[type].quantum];
    }

    Highcharts.chart(htmlId, {

        title: {
            text: 'Current And Constant value GVA values'
        },

        subtitle: {
            text: 'Source: mospi.gov.in'
        },

        yAxis: {
            title: {
                text: 'Current And Constant Values'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },

        series: [{
            name: 'Installation',
            data: twoChildAttr[0]
        }, {
            name: 'Manufacturing',
            data: twoChildAttr[1]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });

};


function buildDualChart(htmlId, data, type) {

    var twoChildAttr = [];
    if (type === 'gva at basic prices') {
        twoChildAttr = [data[type].current, data[type].constant];
    }
    if (type === 'nva at basic prices') {
        twoChildAttr = [data[type].current, data[type].constant];
    }
    if (type === 'indices') {
        twoChildAttr = [data[type].price, data[type].quantum];
    }


   
    Highcharts.chart(htmlId, {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        },

        title: {
            text: 'Total Current And Constant Prices'
        },
        subtitle: {
            text: 'Source: mospi.gov.in'
        },
        xAxis: {
            categories: ['2011', '2012', '2013', '2014', '2015'],
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of fruits',
                skew3d: true
            }
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },

        series: [{
            name: 'Current',
            data: twoChildAttr[0],
            stack: 'male'
        }, {
            name: 'Constant',
            data: twoChildAttr[1],
            stack: 'female'
        }]
    });
}





















