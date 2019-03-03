var idList = [
    ['gva-container-timeSeries','gva-container-pie1','gva-container-pie2','gva-container-db1'], // GVA
    ['nva-container-timeSeries', 'nva-container-pie1', 'nva-container-pie2', 'nva-container-db1'], // NVA
    ['indices-container-timeSeries', 'indices-container-pie1', 'indices-container-pie2', 'indices-container-db1'] // Indices
];

$.ajax({
    type: 'GET',
    url: agri_url,
    data: {
        // sheet: 22,
        // language: 'english',
        // csrfmiddlewaretoken: csrfToken
    },
    dataType: 'json',
    success: function (data) {
        buildTimeSeriesChart(idList[0][0], data, 'gva at basic prices');
        buildPieChart(idList[0][1], data, 'ce');
        buildPieChart(idList[0][2], data, 'cfc');
        buildDualChart(idList[0][3], data, 'gva at basic prices');


        // For NVA
        buildTimeSeriesChart(idList[1][0], data, 'nva at basic prices');
        // buildPieChart(idList[1][1], data, 'cfc');
        buildPieChart(idList[1][2], data, 'ce');
        buildDualChart(idList[1][3], data, 'nva at basic prices');



        // For indices
        // buildTimeSeriesChart(idList[2][0], data, "indices")
        // buildDualChart(idList[2][1], data, "indices")
    },
    error: function (e) {
        console.log(e);
    }
});


$.ajax({
    type: 'GET',
    url: agri_url2,
    data: {
        // sheet: 22,
        // language: 'english',
        // csrfmiddlewaretoken: csrfToken
    },
    dataType: 'json',
    success: function (data) {
        buildTimeSeriesChart(idList[0][0], data, 'gva at basic prices');


        console.log(data);

        // For indices
        // buildTimeSeriesChart(idList[2][0], data, "indices")
        // buildDualChart(idList[2][1], data, "indices")
    },
    error: function (e) {
        console.log(e);
    }
});


