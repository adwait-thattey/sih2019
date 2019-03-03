if(acc_name === 'consumption') {
    console.log('hey');
    $.ajax({
        type: 'GET',
        url: consumption_url,
        data: {},
        dataType: 'json',
        success: function (JSONdata) {
            console.log(JSONdata);
            buildPieChart('chart-agg-container-timeSeries', JSONdata, 'consumption');
        }
    });
}