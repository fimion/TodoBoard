var newToDoFront = "<li class='task mdl-list__item'><div class='mdl-list__item-primary-content mdl-card mdl-shadow--2dp'><div class='mdl-card__title'><h2 class='mdl-card__title-text'>Todo</h2></div><div class='mdl-card__supporting-text'><textarea class='mdl-textfield__input'>";
var newToDoEnd = "</textarea></div><div class='mdl-card__actions mdl-card--border'></div><div class='mdl-card__menu'><button class='close mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'><i class='material-icons'>remove</i></button></div></div></li>";
var task_ID = 0;

function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;
}
var tl = {
"todo": "#todolist",
"working": "#workinglist",
"completed": "workinglist"
};
var lt = swap(tl);


function addToDoTask(tasklist, contents) {
    $(tl[tasklist]).append(newToDoFront + contents + newToDoEnd);
    $("button.close").on("click", function() {
        $(this).closest("li").remove();
    });
    $("textarea").on("update")
}

function getListInfo(selector) {
    var ret = new Array();
    var allTextElements = $(selector + " textarea");
    for (var a = 0; a < $(allTextElements).length; a++) {
        ret.push($($(allTextElements)[a]).val());
    }
    return ret;
}

function updateStorage(event, ui) {
    console.log(event);
    console.log(ui);
    var tasklist = "#"+event.currentTarget.id;
    updateLocalStorage(tasklist);
}

function updateLocalStorage(tasklist){
	localStorage.setItem(lt[tasklist], JSON.stringify(getListInfo(tasklist)));
}

function restoreCookie() {

}

$(document).ready(function() {

    $("button#addnew").on("click", function() {
        addToDoTask("todo", "");
    });

    $("ul.sortable").sortable({
        connectWith: "ul",
        revert: true
    });

    $("ul.sortable").on("sortupdate", function(event, ui) {
        updateStorage(event, ui)
    });

});
