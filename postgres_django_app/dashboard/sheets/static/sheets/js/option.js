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

/////////////////////////
//////// Level I ////////
/////////////////////////

// $(".fa-times").each(function () {
//     $('body').on('click', '.fa-times', function () {
//        $(this).parent().remove();
//     });
// });


$('body').on('click', 'li.level-1 .next-arrow', function () {

    // Forwarding the attribute

    var selectedOption = $(this)[0].textContent;

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


$('body').on('click', 'li.level-1 .text', function () {


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

$('body').on('click', 'li.level-2 .text', function () {


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

$('body').on('click', 'li.level-2 .next-arrow', function () {


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

$('body').on('click', 'li.level-3 .next-arrow', function () {

    // Selecting the attribute

    var selectedOption = $(this)[0].textContent;

    removeCurrentlySelectedI(3);

    // Using selectedOption get the data

    $(".level-4").addClass("level-4-add");

    $(this).addClass('picked');
});

$('body').on('click', 'li.level-3 .text', function () {

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

$('body').on('click', 'li.level-4 .next-arrow', function () {

   var selectedOption = $(this)[0].textContent;

    removeCurrentlySelectedI(4);

    // Using selectedOption get the data

    $(this).addClass("picked");
});

$('body').on('click', 'li.level-4 .text', function () {

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

function createLi(data, level) {
    var newLi = document.createElement('li');

    var newSpan = document.createElement('span');
    var newI = document.createElement('i');

    newI.classList.add('fas');
    newI.classList.add('fa-arrow-right');
    newI.classList.add('next-arrow');

    newSpan.classList.add('text');
    newSpan.textContent = data;

    newLi.classList.add('level-' + level);
    newLi.appendChild(newSpan);
    newLi.appendChild(newI);

    return newLi
};



///////////////////////////////////
//////// Working with JSON ////////
///////////////////////////////////




var data; // JSON data

// {
//   "squadName" : "Super hero squad",
//   "homeTown" : "Metro City",
//   "formed" : 2016,
//   "secretBase" : "Super tower",
//   "active" : true,
//   "members" : [
//     {
//       "name" : "Molecule Man",
//       "age" : 29,
//       "secretIdentity" : "Dan Jukes",
//       "powers" : [
//         "Radiation resistance",
//         "Turning tiny",
//         "Radiation blast"
//       ]
//     },
//     {
//       "name" : "Madame Uppercut",
//       "age" : 39,
//       "secretIdentity" : "Jane Wilson",
//       "powers" : [
//         "Million tonne punch",
//         "Damage resistance",
//         "Superhuman reflexes"
//       ]
//     },
//     {
//       "name" : "Eternal Flame",
//       "age" : 1000000,
//       "secretIdentity" : "Unknown",
//       "powers" : [
//         "Immortality",
//         "Heat Immunity",
//         "Inferno",
//         "Teleportation",
//         "Interdimensional travel"
//       ]
//     }
//   ]
// }


var currentClicked = [];


$.getJSON("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json", function(json) {
    data = json;

    var ulDiv = document.querySelector('.level-1');
    var ulDiv2 = document.querySelector('.level-2');
    var ulDiv3 = document.querySelector('.level-3');
    var ulDiv4 = document.querySelector('.level-4');

    // Same data is added for all the levels for testing purposes
    Object.keys(data).forEach(function (key) {
        ulDiv.appendChild(createLi(key,1 ));
        ulDiv2.appendChild(createLi(key, 2));
        ulDiv3.appendChild(createLi(key, 3));
        ulDiv4.appendChild(createLi(key, 4));
    });

});


