// ------------------------- Игровые функции -----------------------------

/* Проверяет на решаемость кроссворда */
function checkHasSolve(crossword) {

    // Zero rows //TODO: optimize if !=0 return
    for (var i=0; i<crossword.length; i++) {
        if (sum(crossword[i]) == 0) {
            return false;
        }
    }

    // Zero colums
    var width = crossword[0].length;
    for (i=0; i<width; i++) {
        var total = 0;
        for (j=0; j<crossword.length; j++) {
            var row = crossword[j];
            total += row[i];
        }    
        if (total == 0) {
            return false;
        }
    }

    return true;
}

/* Сканирует строку кроссворда и считает количество закрашенных ячеек
    возращает массив */
function scanRow(row) {
    
    var tip = [];
    var number = 0;

    for (var i=0; i<row.length; i++) {        
        if (row[i] == 1) {
            number++;
        } else {
            if (number != 0) {
                tip.push(number);
            }
            number = 0;
        }
    }
    
    if (number != 0) {
        tip.push(number);
    }

    return tip;    
}

/* Вычисляет сумму массива */
function sum(array) {
    var result = 0;
    for (i=0; i<array.length; i++) {
        result += array[i];
    }
    return result;
}

/* Нормализует ширину строк матрицы, добавляя нулевые элементы */
function normalize(matrix, width) {
    for (var i=0; i<matrix.length; i++) {
        var row = matrix[i];
        while (row.length < width) {
            row.unshift(0);
        }
    }

}

/* Добавляет подсказки для решения кроссворда в виде количества закрашенных ячеек */
function addTipsToCrossword(crossword) {

    var max = 0;
    var left = [];
    for (var i=0; i<crossword.length; i++) {
        var tip = scanRow(crossword[i]);
        if (tip.length > max) {
            max = tip.length;
        }

        left.push(tip);
    } 

    normalize(left, max);

    for (var i=0; i<left.length; i++) {
        var row_left = left[i];
        var row = crossword[i];

        for (j=row_left.length-1; j>=0; j--) {
            row.unshift(row_left[j]+2);
        }

    }

}

// ---------------------------- Функиции UI ----------------------------------------

/* Создает таблицу кроссворда */
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

/* Проверяет корректность введеного пользователем значения и возвращает его */
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


/* Выводит сообщение об ошибке */
function notifyError(message) {
    alert(message);
}

/* Удаляет таблицу */
function removeTable() {
    var placeHolder = document.getElementById("crosswordTable");
    var table = document.getElementById("crossword");
    placeHolder.removeChild(table);    
}

/* Преобразует html table в матрицу */
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


function play(crossword) {

    var editor = document.getElementById("editor");
    editor.className = "hide";

    var game = document.getElementById("game");
    game.className = "show";

    var placeHolder = document.getElementById("crosswordPanel");
    var table = document.createElement("table");
    table.id = "crossword";

    var height = crossword.length;
    var width = crossword[0].length;

    for (var i=0; i<height; i++) {
        var tr = document.createElement("tr");

        for (var j=0; j<width; j++) {

            var td = document.createElement("td");
            td.className = "cell";

            var value = crossword[i][j];
            if (value > 1) {
                if (value-2 > 0) {
                    td.innerHTML = value-1;
                }
            } else {
                td.onclick = toggle;                
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    placeHolder.appendChild(table);

}


// --------------------------- Обработчки событий ------------------------------------

/* Обработчик клика по ячейке. Переключает состояние ячейки */
function toggle(e) {
    var cell = e.target;

    if (hasClass(cell, "mark")) {
        removeClass(cell, "mark");
    } else {
        addClass(cell, "mark");
    }
}

/* Обработчик нажатия по кнопке "Далее" */
function onNext(e) {
    e.preventDefault();

    var crossword = tableToArray("crossword");

    if (!checkHasSolve(crossword)) {
        notifyError("Кроссворд не имеет решения!");
        return;
    }

    addTipsToCrossword(crossword);
    removeTable();
    play(crossword);

}

/* Обработчик нажатия кнопки "Готово" */
function onDone(e) {
    e.preventDefault();
    notifyError("Кроссворд решен не верно");
}

/* Обработчик нажатия кнопки "Создать" */
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
    document.getElementById('done').onclick = onDone;
    console.log('Application started.');
}

document.addEventListener("DOMContentLoaded", main, false);