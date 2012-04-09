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
    table.id = "crossword";

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

function sum(array) {
    var result = 0;
    for (i=0; i<array.length; i++) {
        result += array[i];
    }
    return result;
}

function checkHasSolve(crossword) {

    for (var i=0; i<crossword.length; i++) {
        if (sum(crossword[i]) == 0) {
            return false;
        }
    }

    return true;
}

function notifyError(message) {
    alert(message);
}

function tableToArray(tableId) {
 
    var table = document.getElementById(tableId);
 
    var array = [];
    for (var i=0; i<table.rows.length; i++) {
        var tr = table.rows[i];
        
        var row = [];
        for(var j=0; j<tr.cells.length; j++) {
            var td = tr.cells[j];

            var bit = 0;
            if (hasClass(td, "mark")) {
                bit = 1;
            }
        
            row.push(bit);
        }

        array.push(row);
    }

    return array;

}

function onNext(e) {
    e.preventDefault();

    var crossword = tableToArray("crossword");

    if (!checkHasSolve(crossword)) {
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