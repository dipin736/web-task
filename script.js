var applyChanges = function () {
    changingFont();
    changingFontSize();
    changingColor();
}

var changingFont = function () {
    var selectedFont = document.getElementById("input-font").value;
    console.log("Selected Font: " + selectedFont);
    document.getElementById("output-text").style.fontFamily = selectedFont;
    saveState();

}

var changingFontSize = function () {
    var selectedFontSize = document.getElementById("input-font-size").value;
    console.log("Selected Font Size: " + selectedFontSize);

    if (!isNaN(selectedFontSize)) {
        document.getElementById("output-text").style.fontSize = selectedFontSize + "px";
    } else {
        console.log("Invalid font size entered");
    }
    saveState();

}

var changingColor = function () {
    var selectedColor = document.getElementById("textColor").value;
    document.getElementById("output-text").style.color = selectedColor;
    saveState();

}

var stateHistory = [];
var currentStateIndex = -1;

function saveState() {
    var currentState = document.getElementById("output-text").outerHTML;
    stateHistory.push(currentState);
    currentStateIndex = stateHistory.length - 1;
}

function undo() {
    console.log("Undo clicked");
    if (currentStateIndex > 0) {
        currentStateIndex--;
        document.getElementById("output-text").outerHTML = stateHistory[currentStateIndex];
    }
}

function redo() {
    console.log("Redo clicked");
    if (currentStateIndex < stateHistory.length - 1) {
        currentStateIndex++;
        document.getElementById("output-text").outerHTML = stateHistory[currentStateIndex];
    }
}

var isDragging = false;
var offsetX, offsetY;

function dragStart(event) {
    isDragging = true;
    offsetX = event.clientX - event.target.getBoundingClientRect().left;
    offsetY = event.clientY - event.target.getBoundingClientRect().top;
}

document.addEventListener("mousemove", function (event) {
    if (isDragging) {
        var draggedElement = document.getElementById("output-text");
        draggedElement.style.position = "absolute";
        draggedElement.style.left = event.clientX - offsetX + "px";
        draggedElement.style.top = event.clientY - offsetY + "px";
    }
    
});

document.addEventListener("mouseup", function () {
    isDragging = false;
});