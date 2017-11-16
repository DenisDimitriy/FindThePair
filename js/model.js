/**
 * Created by Denis on 08.11.2017.
 */
function getRandomPairArray(dimension) {
    var arrayFirst = [];
    var arraySecond = [];
    for (var i = 0; i < dimension; i++) {
        arrayFirst[i] = i;
        arraySecond[i] = i;
    }

    var arrayRezult = [];
    var index;
    for (i = 0; i < (dimension * 2); i++) {
        index = Math.floor(Math.random() * arrayFirst.length);
        arrayRezult[i] = arrayFirst.splice(index, 1);
        i++;
        index = Math.floor(Math.random() * arraySecond.length);
        arrayRezult[i] = arraySecond.splice(index, 1);
    }
    return arrayRezult;
}

function removeCard(element) {
    element.innerHTML = null;
    element.className = "spacer";
    /*
    element.classList.remove("flip-container");
    element.classList.remove("card");
    element.classList.add("spacer")
    */
}

function openCard(element) {
    element.classList.add('hover');
}

function closeCard(element) {
    element.classList.remove('hover');
}
