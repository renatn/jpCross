function createCrossword(width, heigth) {

    var placeHolder = document.getElementById("crosswordTable");
    var table = document.createElement("table");

    for (var i=0; i<heigth; i++) {
        var tr = document.createElement("tr");

        for (var j=0; j<width; j++) {
            var td = document.createElement("td");
            td.innerHTML = "x";
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    placeHolder.appendChild(table);
}

function onCreate() {
    
    var heightInput = document.getElementById("inputHeight");
    var widthInput = document.getElementById("inputWidth");
    var height = heightInput.value;
    var width = widthInput.value;

    var validate = true;
    if (!height) {
        heightInput.className = "error";
        validate = false;
    }

    if (!width) {
        widthInput.className = "error";
        validate = false;
    }

    if (!validate) {
        return false;
    }

    createCrossword(width, height);
}

function start() {
    document.getElementById('btnCreate').onclick = onCreate;
    console.log('Application started.');
}

document.addEventListener("DOMContentLoaded", start, false);