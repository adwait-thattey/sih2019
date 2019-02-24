var isClickedButtons = {
    level1: [0,false],
    level2: [0,false],
    level3: [0,false]
};


function removeCurrentlySelectedLI (level) {
    $(".level-" + level).children("li").each(function () {
        console.log($(this).hasClass('selected'));
    });
};


$(".level-1").children("li").each(function () {
    $(this).click(function () {
        var selectedOption = $(this)[0].textContent;

        // Using selectedOption get the data
        $(".level-2").toggleClass("level-2-none").toggleClass("level-2-add");
        $(".level-3").removeClass("level-3-add").addClass("level-3-none");
        $(".level-4").removeClass("level-4-add").addClass("level-4-none");


        $(this).toggleClass('selected');
        $(".level-2").toggleClass("level-2-none");
    });


    removeCurrentlySelectedLI(1);

});


$(".level-2").children("li").each(function () {
    $(this).click(function () {
        var selectedOption = $(this)[0].textContent;

        // Using selectedOption get the data
        $(".level-3").toggleClass("level-3-none").toggleClass("level-3-add");
        $(".level-4").removeClass("level-4-add").addClass("level-4-none");

        $(this).toggleClass('selected');
        $(".level-3").toggleClass("level-3-none");
    });
});

$(".level-3").children("li").each(function () {
    $(this).click(function () {
        var selectedOption = $(this)[0].textContent;

        // Using selectedOption get the data
        $(".level-4").toggleClass("level-4-none").toggleClass("level-4-add");

        $(this).toggleClass('selected');
        $(".level-4").toggleClass("level-4-none");
    });
});