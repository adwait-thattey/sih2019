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
buildPieChart('gva-container-pie2');
buildDualChart('gva-container-db1');


function buildTimeSeriesChart(htmlId) {
    Highcharts.chart(htmlId, {

        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
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
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
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
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Other',
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
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
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
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
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
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
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
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }]
    });
}





















