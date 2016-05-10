var canvasNode = document.getElementById('game');
var devPanelNode = document.getElementById('dev');

canvasNode.style.border = '1px solid black';
canvasNode.style.display = 'block';
canvasNode.style.margin = 'auto';
canvasNode.style.marginTop = '30px';

var canvasRect = canvasNode.getBoundingClientRect();
var c = canvasNode.getContext('2d');

var board = [false, false, false, false, false, false ,false , false , false];



var boxPositions;

var render = function (c, model) {
	c.clearRect(0, 0, canvasRect.left, canvasRect.top);
    boxPositions = drawGrid(c, 20, 20, 150, 150, drawBox, 3, 150, drawRow, 3, 150);
    drawX(c, model)// draws X's where board index.state = 'X';
    drawO(c, model);
};

// DRAW GRID

var drawBox = function (c, x, y, w, h) {
    var box = {};
    c.strokeStyle = 'black';
    c.lineWidth = 2;
    c.strokeRect(x, y, w, h);
    box.x = x;
    box.y = y;
    box.w = w;
    box.h = h;
    return box;
}

var drawRow = function (c, x, y, w, h, drawFunc, col, colSpace) {
    var currentSpace, rowArray = [];
    for (var i = 0; i < col; i += 1) {
        currentSpace = colSpace * i + 30;
        rowArray.push(drawFunc(c, currentSpace, y, w, h));
    }
    // console.log(rowArray);
    return rowArray;
}

var drawGrid = function (c, x, y, w, h, drawCell, col, colSpace, drawRow, row, rowSpace) {
    var gridArray = [];
    for (var i = 0; i < row; i += 1) {
        var currentRowSpace = rowSpace * i + 30;
        var rowArray = drawRow(c, x, currentRowSpace, w, h, drawBox, col, colSpace);
        gridArray = gridArray.concat(rowArray);
    }
    return gridArray;
};

// DRAW STATE

var drawX = function (c , model) {
    var x, y, w, h;
    for (var i = 0; i < model.length; i += 1) {
        if (model[i] === 'x') {
            // draw x at boxPositions[i];
            x = boxPositions[i].x;
            y = boxPositions[i].y;
            w = boxPositions[i].w;
            h = boxPositions[i].h;
            c.strokeStyle = 'red';
            c.lineWidth = 2;
            c.strokeRect(x, y, w, h);
        }
    }
};

var drawO = function (c , model) {
    var x, y, w, h;
    for (var i = 0; i < model.length; i += 1) {
        if (model[i] === 'o') {
            // draw x at boxPositions[i];
            x = boxPositions[i].x;
            y = boxPositions[i].y;
            w = boxPositions[i].w;
            h = boxPositions[i].h;

            c.strokeStyle = 'blue';
            c.lineWidth = 2;
            c.strokeRect(x, y, w, h);
        }
    }
};

var checkModel = function (currentModel) {
    var newModel;

    // 0,1,2
    // 3,4,5
    // 6,7,8
    //
    // across by 1
    // down by 3
    // right cross by 4
    // left cross by 2

    return newModel
}


var update = function (currentModel, updateDetails) {
    var newModel;
    // do stuff
    return newModel;
};


// DEV
var getMousePos = function (canvasNode, evt) {
    var position = {};
    position.x = evt.clientX - canvasRect.left;
    position.y = evt.clientY - canvasRect.top;
    return position;
}

var updateInnerHtml = function (element, html) {
    element.innerHTML = html;
}

// EVENT HANDLERS

var init = function () {
    render(c, board);
};

var mouseMove = function (evt, data) {
    var mousePos = getMousePos(canvasNode, evt);
    var message = "X: " + mousePos.x + ", " + "Y: " + mousePos.y;
    updateInnerHtml(devPanelNode, message);
}

document.addEventListener('mousemove', mouseMove, false);

window.onload = init;
