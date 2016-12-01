var newToDo = "<li class='draggable'><button class='close fa fa-times'></button><textarea class='mui--z5'> </textarea></li>";

$(document).ready(function () {

    $("button.addnew").on("click", function () {
        $("#todolist").append(newToDo);
        $("button.close").on("click", function () {
            $(this).parent("li").remove();
        });
    });

    $("ul.sortable").sortable({
        connectWith: "ul",
        revert: true
    });

});

