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
var currentTurn = 'x';

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

var getClicked = function (boxPositions, coors) {
    var x, y, w, h;
    for (var i = 0; i < boxPositions.length; i += 1 ) {
        x = boxPositions[i].x;
        y = boxPositions[i].y;
        w = x + boxPositions[i].w;
        h = y + boxPositions[i].h;
        if((coors.x > x) && (coors.y > y) && (coors.x < w) && (coors.y < h)) {
            return i;
        }
    }
};

var isWin = function (model) {

    var topLeft = model[0];
    var topMid = model[1];
    var topRight = model[2];
    var midLeft = model[3];
    var midMid = model[4];
    var midRight = model[5];
    var botLeft = model[6];
    var botMid = model[7];
    var botRight = model[8];

    if ((topLeft !== false) && (topMid !== false) && (topRight !== false)) {
        if((topLeft === topMid) && (topMid === topRight)) return true;
    };
    if ((midLeft !== false) && (midMid !== false) && (midRight !== false)) {
        if((midLeft === midMid) && (midMid === midRight)) return true;
    };
    if ((botLeft !== false) && (botMid !== false) && (botRight !== false)) {
        if((botLeft === botMid) && (botMid === botRight)) return true;
    };
    // // VERTICAL
    if ((topLeft !== false) && (midLeft !== false) && (botLeft !== false)) {
        if((topLeft === midLeft) && (midLeft === botLeft)) return true;
    };
    if ((topMid!== false) && (midMid!== false) && (botMid!== false)) {
        if((topMid=== midMid) && (midMid=== botMid)) return true;
    };
    if ((topRight !== false) && (midRight !== false) && (botRight !== false)) {
        if((topRight === midRight) && (midRight === botRight)) return true;
    };
    // // CROSS
    if ((topLeft !== false) && (midMid !== false) && (botRight !== false)) {
        if((topLeft === midMid) && (midMid === botRight)) return true;
    };
    if ((topRight !== false) && (midMid !== false) && (botLeft !== false)) {
        if((topRight === midMid) && (midMid === botLeft)) return true;
    };

    return false;
}

var updateModel = function (model, box) {
    var newModel = model;
    newModel[box] = currentTurn;
    if(isWin(newModel)) {
        console.log('Winner: ' +  currentTurn);
    }
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


var init = function () {
    render(c, board);
};

var clickHandler = function (evt) {
    if (currentTurn === 'x') {
        currentTurn = 'o';
    } else {
        currentTurn = 'x';
    }
    var mousePos = getMousePos(canvasNode, evt);
    var boxClicked = getClicked(boxPositions, mousePos);
    var updatedModel = updateModel(board, boxClicked);
    render(c, updatedModel);
}

var mouseMove = function (evt, data) {

    // DEV PANEL ------------------------------------------
    var mousePos = getMousePos(canvasNode, evt);
    var message = "X: " + mousePos.x + ", " + "Y: " + mousePos.y;
    updateInnerHtml(devPanelNode, message);
    // ----------------------------------------------------

    // get coordinates of clicked
    // get getClicked() returns index

}

document.addEventListener('click',clickHandler, false );

document.addEventListener('mousemove', mouseMove, false);

window.onload = init;
