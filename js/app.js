function toggle(e) {
    var cell = e.target;

    if (hasClass(cell, "mark")) {
        removeClass(cell, "mark");
    } else {
        addClass(cell, "mark");
    }
}

function createCrossword(width, heigth) {

    var placeHolder = document.getElementById("crosswordTable");
    var table = document.createElement("table");

    for (var i=0; i<heigth; i++) {
        var tr = document.createElement("tr");

        for (var j=0; j<width; j++) {
            var td = document.createElement("td");
            td.className = "cell";
            td.onclick = toggle;
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    placeHolder.appendChild(table);

    var editor = document.getElementById("editor");
    editor.className = "show";

    var form = document.getElementById("form");
    form.className = "hide";

}

function validateAndGetValue(fieldId) {
  
    var field = document.getElementById(fieldId);
    var value = field.value;

    if (!value || parseInt(value) > 20 ) {
        addClass(field, "error");
        return null;
    }

    removeClass(field, "error");
    return value;
}

function checkHasSolve() {
    return false;
}

function notifyError(message) {
    alert(message);
}

function onNext(e) {
    e.preventDefault();

    if (!checkHasSolve()) {
        notifyError("Кроссворд не имеет решения!");
        return;
    }

}

function onCreate() {

    var height = validateAndGetValue("inputHeight");
    var width = validateAndGetValue("inputWidth");

    if (!height || !width) {
        return;
    }
    
    createCrossword(width, height);
}

function main() {
    document.getElementById('btnCreate').onclick = onCreate;
    document.getElementById('next').onclick = onNext;
    console.log('Application started.');
}

document.addEventListener("DOMContentLoaded", main, false);