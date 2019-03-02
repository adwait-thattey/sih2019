// // Function to get the start to End Year
// // Returns an array like ['2012-13','2013-14'..'2017-18']
// function getYears(graphData) {
//     // need graph data to find the oldest year
//     var oldestYear = graphData[0].start_year;
//     var yearCount = 0;
//
//     var yearList = [];
//
//     for (var yearData of graphData) {
//         if (oldestYear > yearData.start_year) oldestYear = yearData.start_year;
//         for (var dateLength in yearData.values) {
//             if (yearData.values[dateLength].length > yearCount) yearCount = yearData.values[dateLength].length;
//         }
//     }
//
//     // Max yearCount received
//     for (var i=0, j=oldestYear; i<yearCount; i++,j++) {
//         yearList.push(j);
//     }
//     return yearList;
// }
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


var dummyJson = {

    activity_id:4,
    activity_name: 'Agriculture',
    GVA: {
        current: [4, 8, 12, 93, 7],
        constant: [89, 74, 31, 2, 9]
    },
    NVA: {
        current: [4, 8, 12, 93, 7],
        constant: [89, 74, 31, 2, 9]
    },
    Indices: {
        price: [8,9,32,11,07],
        quantum: [95,77,30,3,17]
    }
};


buildTimeSeriesChart('gva-container-timeSeries1');
buildPieChart('gva-container-pie1');
buildDualChart('gva-container-db1');


function buildTimeSeriesChart(htmlId) {
    Highcharts.chart(htmlId, {

        title: {
            text: 'Current and constant GVA Values'
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
            name: 'Current',
            data: [10000, 52503, 57177, 69658, 97031, 119931]
        }, {
            name: 'Constant',
            data: [24916, 24064, 29742, 29851, 32490, 30282]
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



function buildPieChart(htmlId) {

    // graphDataValues, htmlId
    // var seriesData = getSeriesData(graphDataValues);

    // var renamedObject = [];
    // for (var object of seriesData) {
    //     var sumOfData = 0;
    //
    //     for (var dataValues of object.data) {
    //         sumOfData += dataValues
    //     }
    //
    //     var newObject = {
    //         name: object.name,
    //         y: sumOfData
    //     };
    //     renamedObject.push(newObject);
    // }
    //
    // console.log(renamedObject);

    Highcharts.chart(htmlId, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Current and constant GVA Values'
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
            data: [{
                name: '2011',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: '2012',
                y: 11.84
            }, {
                name: '2013',
                y: 10.85
            }, {
                name: '2014',
                y: 4.67
            }, {
                name: '2015',
                y: 4.18
            }, {
                name: '2016',
                y: 7.05
            }]
        }]
    });

}

function buildLineChart(htmlId) {

    // parameter : graphDataValues, htmlId

    // var seriesData = getSeriesData(graphDataValues);

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
            data: [45000, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
            name: 'Sales & Distribution',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
            name: 'Project Development',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
            name: 'Other',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
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


function buildDualChart(htmlId) {

    // var seriesData = getSeriesData(graphDataValues);

   
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
            data: [5611895, 1818173, 1713364, 1817178, 178172],
            stack: 'male'
        }, {
            name: 'Constant',
            data: [3451142, 636514, 4315514, 4514774, 3189618],
            stack: 'female'
        }]
    });
}


Highcharts.chart('gva-container-pie2', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: 'Current and constant GVA Values'
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
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
            ['2011', 8.8],
            ['2012', 39],
            {
                name: '2013',
                y: 12.8,
                sliced: true,
                selected: true
            },
            ['2014', 22.5],
            ['2015', 6.2],
            ['2016', 10.7]
        ]
    }]
});




















