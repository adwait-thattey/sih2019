if(agg_name === 'gdp') {
    $.ajax({
        type: 'GET',
        url: gdpUrl,

        data: {},
        dataType: 'json',
        success: function (JSONdata) {
            buildTimeSeriesChart('chart-agg-container-timeSeries', JSONdata, 'gdp');
        }
    });
}

if (agg_name === 'gva') {
    $.ajax({
       type: 'GET',
       url: gvaUrl,
       data: {},
       dataType: 'json',
       success: function (JSONdata) {
            buildTimeSeriesChart('chart-agg-container-timeSeries', JSONdata, 'gva');
            buildPieChart('chart-agg-container-pie1', JSONdata, 'gva');
       }
    });
}