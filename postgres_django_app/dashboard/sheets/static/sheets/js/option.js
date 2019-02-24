function removeCurrentlySelectedSpan (level) {
    var number = 1;
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

$(".level-1").children("li").each(function () {

    // Forwarding the attribute

    $(this).children(":nth-child(2)").click(function () {
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


    // Selecting the attribute

    $(this).children(":nth-child(1)").click(function () {
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
});


//////////////////////////
//////// Level II ////////
//////////////////////////



$(".level-2").children("li").each(function () {


    $(this).children(":nth-child(2)").click(function () {
        var selectedOption = $(this)[0].textContent;

        removeCurrentlySelectedI(2);
        removeCurrentlySelectedI(3);

        // Using selectedOption get the data


        $(".level-3").addClass("level-3-add");
        $(".level-4").removeClass("level-4-add").addClass("level-4-none");

        $(this).addClass('picked');
    });


    $(this).children(":nth-child(1)").click(function () {
        var selectedOption = $(this)[0].textContent;

        removeCurrentlySelectedSpan(2);
        removeCurrentlySelectedSpan(3);

        // Using selectedOption get the data


        $(".level-3").removeClass("level-3-add").addClass("level-3-none");
        $(".level-4").removeClass("level-4-add").addClass("level-4-none");

        createChip(selectedOption);

        $(this).addClass('selected');
    });
});


$(".level-3").children("li").each(function () {

    $(this).children(":nth-child(2)").click(function () {
        var selectedOption = $(this)[0].textContent;

        removeCurrentlySelectedI(3);

        // Using selectedOption get the data

        $(".level-4").addClass("level-4-add");

        $(this).addClass('picked');
    });

    $(this).children(":nth-child(1)").click(function () {
        var selectedOption = $(this)[0].textContent;

        removeCurrentlySelectedSpan(3);


        // Using selectedOption get the data

        $(".level-4").removeClass("level-4-add").addClass("level-4-none");

        createChip(selectedOption);

        $(this).addClass('selected');
    });
});


$(".level-4").children("li").each(function () {


    $(this).children(":nth-child(2)").click(function () {
        var selectedOption = $(this)[0].textContent;

        removeCurrentlySelectedI(4);

        // Using selectedOption get the data


        $(this).addClass("picked");
        // $(".level-5").addClass("level-5-add")

    });

    $(this).children(":nth-child(1)").click(function () {
        var selectedOption = $(this)[0].textContent;

        removeCurrentlySelectedSpan(4);

        // Using selectedOption get the data


        createChip(selectedOption);

        $(this).addClass('selected');
    });
});


// Chip deleting script
$(".fa-times").each(function () {
    $('body').on('click', '.fa-times', function () {
       $(this).parent().remove();
    });
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