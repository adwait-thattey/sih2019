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