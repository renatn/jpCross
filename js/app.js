function createCrossword(width, heigth) {

    var placeHolder = document.getElementById("crosswordTable");
    var table = document.createElement("table");

    for (var i=0; i<heigth; i++) {
        var tr = document.createElement("tr");

        for (var j=0; j<width; j++) {
            var td = document.createElement("td");
            td.className = "cell";
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    placeHolder.appendChild(table);
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
    console.log('Application started.');
}

document.addEventListener("DOMContentLoaded", main, false);