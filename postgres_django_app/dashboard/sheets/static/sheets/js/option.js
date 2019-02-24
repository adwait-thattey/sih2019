var isClickedButtons = {
    level1: false,
    level2: false,
    level3: false
};


function removeCurrentlySelectedLI (level) {
    $(".level-" + level).children("li").each(function () {
        if($(this).hasClass('selected')) {

            $(this).removeClass('selected');
        };
    });
};


$(".level-1").children("li").each(function () {
    $(this).click(function () {
        var selectedOption = $(this)[0].textContent;


        // Fresh start after going deep into the level
        removeCurrentlySelectedLI(1);
        removeCurrentlySelectedLI(2);
        removeCurrentlySelectedLI(3);


        // Using selectedOption get the data
        $(".level-2").addClass("level-2-add");
        $(".level-3").removeClass("level-3-add").addClass("level-3-none");
        $(".level-4").removeClass("level-4-add").addClass("level-4-none");


        $(this).toggleClass('selected');
        $(".level-2").toggleClass("level-2-none");
    });



});


$(".level-2").children("li").each(function () {
    $(this).click(function () {
        var selectedOption = $(this)[0].textContent;

        removeCurrentlySelectedLI(2);
        removeCurrentlySelectedLI(3);

        // Using selectedOption get the data
        $(".level-3").addClass("level-3-add");
        $(".level-4").removeClass("level-4-add").addClass("level-4-none");

        $(this).toggleClass('selected');
        $(".level-3").toggleClass("level-3-none");
    });


});

$(".level-3").children("li").each(function () {
    $(this).click(function () {
        var selectedOption = $(this)[0].textContent;

        removeCurrentlySelectedLI(3);
        removeCurrentlySelectedLI(4);


        // Using selectedOption get the data
        $(".level-4").addClass("level-4-add");

        $(this).toggleClass('selected');
        $(".level-4").toggleClass("level-4-none");
    });
});


$(".level-4").children("li").each(function () {
    $(this).click(function () {
        var selectedOption = $(this)[0].textContent;

        // Using selectedOption get the data


        $(".level-4").addClass("level-4-add");

        $(this).toggleClass('selected');
        $(".level-4").toggleClass("level-4-none");
    });
});