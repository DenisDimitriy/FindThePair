/**
 * Created by Denis on 08.11.2017.
 */

//Глобальные переменные
var table6 = document.querySelector(".size-6");
var table8 = document.querySelector(".size-8");
var table10 = document.querySelector(".size-10");
var table12 = document.querySelector(".size-12");
var btnClearLS = document.querySelector(".btn-clearLS");

btnClearLS.onclick = function () {
    localStorage.clear();
    table6.innerHTML = null;
    table8.innerHTML = null;
    table10.innerHTML = null;
    table12.innerHTML = null;
    generateTables ();
    return false;
};

function generateTables () {
    var records = JSON.parse(localStorage.getItem("records"));
    var records6 = [];
    var records8 = [];
    var records10 = [];
    var records12 = [];

    for (var i = 0; i < records.length; i++) {
        if (records[i].size == 6) {
            records6.push(records[i]);
        }
        if (records[i].size == 8) {
            records8.push(records[i]);
        }
        if (records[i].size == 10) {
            records10.push(records[i]);
        }
        if (records[i].size == 12) {
            records12.push(records[i]);
        }
    }

    for (i = 0; i < records6.length; i++) {
        var rowNew = document.createElement("tr");

        var dateString = records6[i].date.day + "." + records6[i].date.month + "." + records6[i].date.year;
        var tdDate = document.createElement("td");
        tdDate.innerHTML = dateString;
        rowNew.appendChild(tdDate);

        var nameString = records6[i].name;
        var tdName = document.createElement("td");
        tdName.innerHTML = nameString;
        rowNew.appendChild(tdName);

        var ScoresString = records6[i].scores;
        var tdScores = document.createElement("td");
        tdScores.innerHTML = ScoresString;
        rowNew.appendChild(tdScores);

        table6.appendChild(rowNew);
    }

    for (i = 0; i < records8.length; i++) {
        rowNew = document.createElement("tr");

        dateString = records8[i].date.day + "." + records8[i].date.month + "." + records8[i].date.year;
        tdDate = document.createElement("td");
        tdDate.innerHTML = dateString;
        rowNew.appendChild(tdDate);

        nameString = records8[i].name;
        tdName = document.createElement("td");
        tdName.innerHTML = nameString;
        rowNew.appendChild(tdName);

        ScoresString = records8[i].scores;
        tdScores = document.createElement("td");
        tdScores.innerHTML = ScoresString;
        rowNew.appendChild(tdScores);

        table8.appendChild(rowNew);
    }

    for (i = 0; i < records10.length; i++) {
        rowNew = document.createElement("tr");

        dateString = records10[i].date.day + "." + records10[i].date.month + "." + records10[i].date.year;
        tdDate = document.createElement("td");
        tdDate.innerHTML = dateString;
        rowNew.appendChild(tdDate);

        nameString = records10[i].name;
        tdName = document.createElement("td");
        tdName.innerHTML = nameString;
        rowNew.appendChild(tdName);

        ScoresString = records10[i].scores;
        tdScores = document.createElement("td");
        tdScores.innerHTML = ScoresString;
        rowNew.appendChild(tdScores);

        table10.appendChild(rowNew);
    }


    for (i = 0; i < records12.length; i++) {
        rowNew = document.createElement("tr");

        dateString = records12[i].date.day + "." + records12[i].date.month + "." + records12[i].date.year;
        tdDate = document.createElement("td");
        tdDate.innerHTML = dateString;
        rowNew.appendChild(tdDate);

        nameString = records12[i].name;
        tdName = document.createElement("td");
        tdName.innerHTML = nameString;
        rowNew.appendChild(tdName);

        ScoresString = records12[i].scores;
        tdScores = document.createElement("td");
        tdScores.innerHTML = ScoresString;
        rowNew.appendChild(tdScores);

        table12.appendChild(rowNew);
    }
}

generateTables ();

var btnRefresh = document.querySelector(".btn-refresh");
btnRefresh.onclick = function () {
    table6.innerHTML = null;
    table8.innerHTML = null;
    table10.innerHTML = null;
    table12.innerHTML = null;
    generateTables ();
    return false;
};

