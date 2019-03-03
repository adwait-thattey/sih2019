// function removeCurrentlySelectedSpan (level) {
//     $(".level-" + level).children("li").each(function () {
//         if($(this).children(":nth-child(1)").hasClass('selected')) {
//             $(this).children(":nth-child(1)").removeClass('selected');
//         };
//     });
// };
//
// function removeCurrentlySelectedI (level) {
//     $(".level-" + level).children("li").each(function () {
//         if($(this).children(":nth-child(2)").hasClass('picked')) {
//             $(this).children(":nth-child(2)").removeClass('picked');
//         };
//     });
// };
//
// function findObject(jsonData, idValue) {
//     var selectedObject;
//     if (jsonData.length === 0 || jsonData == false) return false;
//
//     $.each(jsonData, function(index, value) {
//         if (value.id == idValue) {
//             selectedObject = value;
//         }
//     });
//     return selectedObject;
// }
//
// function createLi(level, data) {
//     var newLi = document.createElement('li');
//
//     var newSpan = document.createElement('span');
//     var newI = document.createElement('i');
//
//     // For data with no subfeatures
//     // Writing 'No subfeatures'
//     if (data != null) {
//         newI.classList.add('fas');
//         newI.classList.add('fa-arrow-right');
//         newI.classList.add('next-arrow');
//     }
//
//
//     newSpan.classList.add('text');
//     newSpan.textContent = data == null ? 'No Subfeatures' : data.name;
//     newLi.classList.add('level-' + level + '-li');
//     newLi.appendChild(newSpan);
//     newLi.appendChild(newI);
//
//     newLi.setAttribute("value", data == null ? '' : data.id);
//     return newLi
// };
//
//
// function updateUl(level, data) {
//     var createdUl = $('.level-' + level);
//
//     // empties the current children
//     createdUl.empty();
//     if (data.length == 0) {
//         createdUl.append(createLi(level, null));
//         return;
//     }
//
//
//     $.each(data, function (index, value) {
//          createdUl.append(createLi(level, value));
//     });
// }
//
// // check if values exist for the attribute, if yes send else false
// function getFeatureValues(feature) {
//     if (Object.keys(feature.values).length) {
//         return feature;
//     }
//     return false;
// }
//
// // Checks if the feature already exist in graphData
// function doesFeatureExist(data) {
//     var isFeature = false;
//     $.each(graphData, function (index, value) {
//         if (data.id === value.id) isFeature = true;
//     });
//     return isFeature;
// };
//
// // Gets the JSONO data from server
// function getData(language, feature_id) {
//     $.ajax({
//         type: 'GET',
//         url: dataUrl,
//         data: {
//             feature: feature_id,
//             depth: 0,
//             language: language,
//         },
//         dataType: 'json',
//         success: function (data) {
//
//             if (getFeatureValues(data) && !doesFeatureExist(data)) {
//                 graphData.push(getFeatureValues(data));
//
//                 // TEMPORARY AREA CHART
//                 buildBarChart(graphData, 'container');
//                 buildPieChart(graphData, 'container1');
//             }
//         }
//     });
// }
//
//
// // current JSON data
// var JSONdata;
//
// // Keeping track of all levels (keep pointers of all nodes)
// var selectedValues = [];
//
// // array of array to plot the graph
// var graphData = [];
//
//
// // function to change the level of selectedValues
// function adjustselectedValues(level) {
//     if (level === 1) {
//         selectedValues = [];
//         return;
//     }
//
//     while (selectedValues.length >= level) {
//         selectedValues.pop();
//     }
// }
//
//
// /////////////////////////
// //////// Level I ////////
// /////////////////////////
//
//
// $('body').on('click', 'li.level-1-li .next-arrow', function () {
//
//
//     // Getting the data from json
//     var selectedObject = findObject(JSONdata, $(this).parent().attr('value'));
//
//     // As this is first level, selectedValues must be none;
//     adjustselectedValues(1);
//
//     selectedValues.push(selectedObject);
//     updateUl(2, selectedObject.subfeatures);
//
//
//     // Fresh start after going deep into the level
//
//     removeCurrentlySelectedI(1);
//     removeCurrentlySelectedI(2);
//     removeCurrentlySelectedI(3);
//
//
//     // Using selectedOption get the data
//
//
//     $(".level-2").addClass("level-2-add");
//     $(".level-3").removeClass("level-3-add").addClass("level-3-none");
//     $(".level-4").removeClass("level-4-add").addClass("level-4-none");
//
//
//     $(this).addClass('picked');
//
// });
//
//
// $('body').on('click', 'li.level-1-li .text', function () {
//
//
//     // Selecting the attribute
//
//
//
//     var selectedOption = $(this)[0].textContent;
//
//
//     // Get and plot the values via AJAX call
//     getData('english', $(this).parent().attr('value'));
//
//
//     // Using selectedOption get the data
//     $(".level-2").removeClass("level-2-add").addClass("level-2-none");
//     $(".level-3").removeClass("level-3-add").addClass("level-3-none");
//     $(".level-4").removeClass("level-4-add").addClass("level-4-none");
//
//     createChip(selectedOption);
//
//     $(this).addClass('selected');
// });
//
//
//
//
// //////////////////////////
// //////// Level II ////////
// //////////////////////////
//
// $('body').on('click', 'li.level-2-li .text', function () {
//
//
//     // Selecting the attribute
//
//     var selectedOption = $(this)[0].textContent;
//
//     // Using selectedOption get the data
//
//     var obtainedData = getData('english', $(this).parent().attr('value'));
//
//
//
//     $(".level-3").removeClass("level-3-add").addClass("level-3-none");
//     $(".level-4").removeClass("level-4-add").addClass("level-4-none");
//
//     createChip(selectedOption);
//
//     $(this).addClass('selected');
// });
//
//
// $('body').on('click', 'li.level-2-li .next-arrow', function () {
//
//
//     // Selecting the attribute
//
//     var selectedObject = findObject(selectedValues[0].subfeatures, $(this).parent().attr('value'));
//
//
//     // As this is first level, selectedValues must be none;
//     adjustselectedValues(2);
//
//     selectedValues.push(selectedObject);
//
//     updateUl(3, selectedObject.subfeatures);
//
//
//
//     removeCurrentlySelectedI(2);
//     removeCurrentlySelectedI(3);
//
//     // Using selectedOption get the data
//
//
//
//
//     $(".level-3").addClass("level-3-add");
//     $(".level-4").removeClass("level-4-add").addClass("level-4-none");
//
//     $(this).addClass('picked');
// });
//
//
// ///////////////////////////
// //////// Level III ////////
// ///////////////////////////
//
// $('body').on('click', 'li.level-3-li .next-arrow', function () {
//
//     // Selecting the attribute
//     var selectedObject = findObject(selectedValues[1].subfeatures, $(this).parent().attr('value'));
//
//     adjustselectedValues(3);
//     selectedValues.push(selectedObject);
//
//     updateUl(4, selectedObject.subfeatures);
//     removeCurrentlySelectedI(3);
//
//     // Using selectedOption get the data
//
//     $(".level-4").addClass("level-4-add");
//
//     $(this).addClass('picked');
// });
//
// $('body').on('click', 'li.level-3-li .text', function () {
//
//     // Selecting the attribute
//
//     var selectedOption = $(this)[0].textContent;
//
//     // Using selectedOption get the data
//     var obtainedData = getData('english', $(this).parent().attr('value'));
//
//     $(".level-4").removeClass("level-4-add").addClass("level-4-none");
//
//     createChip(selectedOption);
//
//     $(this).addClass('selected');
// });
//
//
// //////////////////////////
// //////// Level IV ////////
// //////////////////////////
//
// $('body').on('click', 'li.level-4-li .next-arrow', function () {
//
//    var selectedOption = $(this)[0].textContent;
//
//     removeCurrentlySelectedI(4);
//
//     // Using selectedOption get the data
//
//     $(this).addClass("picked");
// });
//
// $('body').on('click', 'li.level-4-li .text', function () {
//
//    var selectedOption = $(this)[0].textContent;
//
//     removeCurrentlySelectedSpan(4);
//
//     // Using selectedOption get the data
//
//     createChip(selectedOption);
//
//     $(this).addClass('selected');
// });
//
// ///////////////////////////
// //////// Level End ////////
// ///////////////////////////
//
//
// // Chip deleting script
// $('body').on('click', '.fa-times', function () {
//    $(this).parent().remove();
// });
//
//
// // Chip adding script
// function createChip(data) {
//     var parentDiv = document.querySelector('.attr_chips');
//
//     // Chip
//     var newChip = document.createElement('div');
//     newChip.classList.add("chip");
//     newChip.classList.add("waves-effect");
//     newChip.classList.add("waves-effect");
//
//     // Child Span
//     var newSpan = document.createElement('span');
//     newSpan.classList.add("chip-text");
//     newSpan.textContent = data;
//
//     // Child i
//     var newI = document.createElement('i');
//     newI.classList.add("fas");
//     newI.classList.add("fa-times");
//
//     newChip.appendChild(newSpan);
//     newChip.appendChild(newI);
//
//     parentDiv.appendChild(newChip);
//
// };
//
//
// ///////////////////////////////////
// //////// Working with JSON ////////
// ///////////////////////////////////
//
//
// // Gets the names
//
// $.ajax({
//     type: 'GET',
//     url: nameUrl,
//     data: {
//         // hardcoded
//         sheet: 22,
//         language: 'english',
//         // csrfmiddlewaretoken: csrfToken
//     },
//     dataType: 'json',
//     success: function (data) {
//         // JSONdata = data;
//         JSONdata = data;
//         var selectedUl = document.querySelector('.level-1');
//
//         $.each(data, function (index, value) {
//             selectedUl.appendChild(createLi(1, value));
//         })
//     }
//
// });
//
//
//
//
//

function plotData(data, idList) {
//    $.ajax({
//        type: 'GET',
//        url: nameUrl,
//        data: {
    // hardcoded
//            sheet: 22,
//            language: 'english',
//        },
//        dataType: 'json',
//        success: function (data) {
    var JSONdata = data;

    // For GVA
    buildTimeSeriesChart(idList[0][0], JSONdata, 'GVA');
    //buildPieChart(htmlId[1], JSONdata);
    //buildPieChart(htmlId[2], JSONdata);
    buildDualChart(idList[0][3], JSONdata, 'GVA');


    // For NVA
    buildTimeSeriesChart(idList[1][0], JSONdata, 'NVA');
    buildDualChart(idList[1][3], JSONdata, 'NVA');


    // For indices
    buildTimeSeriesChart(idList[2][0], JSONdata, "indices")
    buildDualChart(idList[2][1], JSONdata, "indices")
}
//          var selectedUl = document.querySelector('.level-1');

//        }

//    });
//}


var idList = [
    ['gva-container-timeSeries','gva-container-pie1','gva-container-pie2','gva-container-db1'], // GVA
    ['nva-container-timeSeries', 'nva-container-pie1', 'nva-container-pie2', 'nva-container-db1'], // NVA
    ['indices-container-timeSeries', 'indices-container-pie1', 'indices-container-pie2', 'indices-container-db1'] // Indices
];


var dummyJson = {
    id:4,
    name: 'agriculture',
    GVA: {
        start_year:2012,
        current: [4, 7, 20, 43, 17],
        constant: [49, 34, 16, 27, 69]
    },
    NVA: {
        start_year:2012,
        current: [41, 34, 11, 30, 67],
        constant: [37, 70, 53, 52, 94]
    },
    indices: {
        start_year:2011,
        price: [3,16,32,51,17],
        quantum: [15,27,30,34,97]
    },
    subFeatures: [
        {
            activity_id: 3,
            activity_name: 'crops',
            GVA: {
                start_year:2011,
                current: [982151, 1088814, 1248776, 1277590, 1312189],
                constant: [982151, 983809, 1037060, 997959, 975739]
            },
            NVA: {

            },
            indices: {
                start_year: 2012,
                price: [3, 16, 32, 51, 17],
                quantum: [15, 27, 30, 34, 97]
            },
        },
        {
            activity_id: 5,
            activity_name: 'livestock',
            GVA: {
                start_year: 2012,
                current: [327334, 368823, 422733, 510020, 560613],
                constant: [327334, 344375, 363558, 390436, 415949]
            }
        }
    ]
};


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.eco-attribute').addEventListener('click', function () {

        var selectedAttr = $(this)[0].textContent;


        // TEMPORARY use dummyJson, get it from AJAX when ready
        plotData(dummyJson, idList);

    }, false);
}, false);


