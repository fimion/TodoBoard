var newToDoFront = "<li class='task mdl-list__item'><div class='mdl-list__item-primary-content mdl-card mdl-shadow--2dp'><div class='mdl-card__title'><h2 class='mdl-card__title-text'>Todo</h2></div><div class='mdl-card__supporting-text'><textarea class='mdl-textfield__input'>";
var newToDoEnd = "</textarea></div><div class='mdl-card__actions mdl-card--border'></div><div class='mdl-card__menu'><button class='close mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'><i class='material-icons'>remove</i></button></div></div></li>";
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

    $("button#addnew").on("click", function () {
        $("#todolist").append(newToDoFront+newToDoEnd);
        $("button.close").on("click", function () {
            $(this).closest("li").remove();
        });
    });

    $("ul.sortable").sortable({
        connectWith: "ul",
        revert: true
    });

    $("ul.sortable").on("sortchange", function(event,ui){updateCookies(event,ui)});
    $("ul.sortable").on("sortupdate", function(event,ui){updateCookies(event,ui)});


});

