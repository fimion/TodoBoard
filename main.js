var newToDoFront = "<li class='task'><button class='close fa fa-times'></button><textarea class='mui--z5'>";
var newToDoEnd = "</textarea></li>";
var cookie_lists = {"todo": "#todolist",
                 "working": "#workinglist",
                 "completed": "workinglist"};
var task_ID = 0;

function getListInfo(selector){
    var ret = new Array();
    var allTextElements = $(selector+" textarea");
    for(var a =0; a < $(allTextElements).length; a++){
        ret.push($($(allTextElements)[a]).val());
    }
    return ret;
}

function updateCookies(event, ui) {
    Cookies.set("lists", {todo: getListInfo("#todolist"),
                         working: getListInfo("#workinglist"),
                         completed: getListInfo("#completedlist") }, {expires: 365});
    Cookies.set("task_ID", task_ID, {expires: 365});

}

function restoreCookie(){

}

$(document).ready(function () {

    $("button.addnew").on("click", function () {
        $("#todolist").append(newToDoFront+newToDoEnd);
        $("button.close").on("click", function () {
            $(this).parent("li").remove();
        });
    });

    $("ul.sortable").sortable({
        connectWith: "ul",
        revert: true
    });

    $("ul.sortable").on("sortchange", function(event,ui){updateCookies(event,ui)});
    $("ul.sortable").on("sortupdate", function(event,ui){updateCookies(event,ui)});


});

