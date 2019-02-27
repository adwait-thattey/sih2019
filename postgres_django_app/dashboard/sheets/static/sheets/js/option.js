function removeCurrentlySelectedSpan (level) {
    $(".level-" + level).children("li").each(function () {
        if($(this).children(":nth-child(1)").hasClass('selected')) {
            $(this).children(":nth-child(1)").removeClass('selected');
        };
    });
};

function removeCurrentlySelectedI (level) {
    $(".level-" + level).children("li").each(function () {
        if($(this).children(":nth-child(2)").hasClass('picked')) {
            $(this).children(":nth-child(2)").removeClass('picked');
        };
    });
};

function findObject(jsonData, idValue) {
    var selectedObject;


    $.each(jsonData, function(index, value) {
        if (value.id == idValue) {
            selectedObject = value;
        }
    });
    return selectedObject;
}

function createLi(data, level) {
    var newLi = document.createElement('li');

    var newSpan = document.createElement('span');
    var newI = document.createElement('i');

    newI.classList.add('fas');
    newI.classList.add('fa-arrow-right');
    newI.classList.add('next-arrow');

    newSpan.classList.add('text');
    newSpan.textContent = data.name;
    newLi.classList.add('level-' + level + '-li');
    newLi.appendChild(newSpan);
    newLi.appendChild(newI);

    newLi.setAttribute("value", data.id);
    return newLi
};

function updateUl(level, data) {
    var createdUl = $('.level-' + level);

    // empties the current children
    createdUl.empty();
    
    $.each(data, function (index, value) {
         createdUl.append(createLi(value, level));
    });
}

// current JSON data

var JSONdata;

// Keeping track of all levels (keep pointers of all nodes)
var selectedValues = [];



/////////////////////////
//////// Level I ////////
/////////////////////////


$('body').on('click', 'li.level-1-li .next-arrow', function () {


    var selectedOption = $(this).siblings('.text')[0].textContent;


    // Getting the data from json

    // console.log(JSONdata[$(this).parent().attr('value')]);

    var selectedObject = findObject(JSONdata, $(this).parent().attr('value'));
    selectedValues.push(selectedObject);



    updateUl(2, selectedObject.subfeatures);


    // Fresh start after going deep into the level

    removeCurrentlySelectedI(1);
    removeCurrentlySelectedI(2);
    removeCurrentlySelectedI(3);


    // Using selectedOption get the data


    $(".level-2").addClass("level-2-add");
    $(".level-3").removeClass("level-3-add").addClass("level-3-none");
    $(".level-4").removeClass("level-4-add").addClass("level-4-none");


    $(this).addClass('picked');

});


$('body').on('click', 'li.level-1-li .text', function () {


    // Selecting the attribute



    var selectedOption = $(this)[0].textContent;

    // Fresh start after going deep into the level
    removeCurrentlySelectedSpan(1);
    removeCurrentlySelectedSpan(2);
    removeCurrentlySelectedSpan(3);


    // Using selectedOption get the data
    $(".level-2").removeClass("level-2-add").addClass("level-2-none");
    $(".level-3").removeClass("level-3-add").addClass("level-3-none");
    $(".level-4").removeClass("level-4-add").addClass("level-4-none");

    createChip(selectedOption);

    $(this).addClass('selected');
});




//////////////////////////
//////// Level II ////////
//////////////////////////

$('body').on('click', 'li.level-2-li .text', function () {


    // Selecting the attribute

    var selectedOption = $(this)[0].textContent;

    removeCurrentlySelectedSpan(2);
    removeCurrentlySelectedSpan(3);

    // Using selectedOption get the data


    $(".level-3").removeClass("level-3-add").addClass("level-3-none");
    $(".level-4").removeClass("level-4-add").addClass("level-4-none");

    createChip(selectedOption);

    $(this).addClass('selected');
});

$('body').on('click', 'li.level-2-li .next-arrow', function () {


    // Selecting the attribute

    var selectedOption = $(this)[0].textContent;

    removeCurrentlySelectedI(2);
    removeCurrentlySelectedI(3);

    // Using selectedOption get the data


    $(".level-3").addClass("level-3-add");
    $(".level-4").removeClass("level-4-add").addClass("level-4-none");

    $(this).addClass('picked');
});


///////////////////////////
//////// Level III ////////
///////////////////////////

$('body').on('click', 'li.level-3-li .next-arrow', function () {

    // Selecting the attribute

    var selectedOption = $(this)[0].textContent;

    removeCurrentlySelectedI(3);

    // Using selectedOption get the data

    $(".level-4").addClass("level-4-add");

    $(this).addClass('picked');
});

$('body').on('click', 'li.level-3-li .text', function () {

    // Selecting the attribute

    var selectedOption = $(this)[0].textContent;

    removeCurrentlySelectedSpan(3);

    // Using selectedOption get the data

    $(".level-4").removeClass("level-4-add").addClass("level-4-none");

    createChip(selectedOption);

    $(this).addClass('selected');
});


//////////////////////////
//////// Level IV ////////
//////////////////////////

$('body').on('click', 'li.level-4-li .next-arrow', function () {

   var selectedOption = $(this)[0].textContent;

    removeCurrentlySelectedI(4);

    // Using selectedOption get the data

    $(this).addClass("picked");
});

$('body').on('click', 'li.level-4-li .text', function () {

   var selectedOption = $(this)[0].textContent;

    removeCurrentlySelectedSpan(4);

    // Using selectedOption get the data

    createChip(selectedOption);

    $(this).addClass('selected');
});

///////////////////////////
//////// Level End ////////
///////////////////////////


// Chip deleting script
$('body').on('click', '.fa-times', function () {
   $(this).parent().remove();
});


// Chip adding script
function createChip(data) {
    var parentDiv = document.querySelector('.attr_chips');

    // Chip
    var newChip = document.createElement('div');
    newChip.classList.add("chip");
    newChip.classList.add("waves-effect");
    newChip.classList.add("waves-effect");

    // Child Span
    var newSpan = document.createElement('span');
    newSpan.classList.add("chip-text");
    newSpan.textContent = data;

    // Child i
    var newI = document.createElement('i');
    newI.classList.add("fas");
    newI.classList.add("fa-times");

    newChip.appendChild(newSpan);
    newChip.appendChild(newI);

    parentDiv.appendChild(newChip);

};





///////////////////////////////////
//////// Working with JSON ////////
///////////////////////////////////


// Gets the names

$.ajax({
    type: 'GET',
    url: nameUrl,
    data: {
        sheet: 22,
        language: 'english',
        // csrfmiddlewaretoken: csrfToken
    },
    dataType: 'json',
    success: function (data) {
        // JSONdata = data;
        JSONdata = data;
        console.log(typeof(JSONdata[0].id));
        var selectedUl = document.querySelector('.level-1');

        $.each(data, function (index, value) {
            selectedUl.appendChild(createLi(value, 1));
        })
    }
});



