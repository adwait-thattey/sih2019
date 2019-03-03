var JSONdata;
$.ajax({
    type: 'GET',
    async: false,
    url: "http://127.0.0.1:8000/sheets/feature_search_list?sheet=22&language=english",
    data: {
        // hardcoded
        sheet: 22,
        language: 'english',
        // csrfmiddlewaretoken: csrfToken
    },
    dataType: 'json',
    success: function (data) {
        JSONdata = data;
         // console.log(JSONdata)
         //       callback(data);


    }

});

    console.log(JSONdata)


