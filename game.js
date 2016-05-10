window.onload = function () {

    var canvasNode = document.getElementById('game');
    var devPanelNode = document.getElementById('dev');

    canvasNode.style.border = '1px solid black';
    canvasNode.style.display = 'block';
    canvasNode.style.margin = 'auto';
    canvasNode.style.marginTop = '30px';

    var c = canvasNode.getContext('2d');

    var board = [false, false, false, false, false, false ,false , false , false];
    var box;

    var render = function (c, data) {
        drawGrid(c, 20, 20, 150, 150, drawBox, 3, 150, drawRow, 3, 150);
    };

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

    var update = function (currentModel, updateDetails) {
        var newModel;
        // do stuff
        return newModel;
    };

    // DEV
    var getMousePos = function (canvasNode, evt) {
        var rect = canvasNode.getBoundingClientRect();
        var position = {};
        position.x = evt.clientX - rect.left;
        position.y = evt.clientY - rect.top;
        return position;
    }

    var updateInnerHtml = function (element, html) {
        element.innerHTML = html;
    }

    // EVENT HANDLERS

    var init = function () {
        render(c);
    };

    var mouseMove = function (evt, data) {
        var mousePos = getMousePos(canvasNode, evt);
        var message = "X: " + mousePos.x + ", " + "Y: " + mousePos.y;
        updateInnerHtml(devPanelNode, message);
    }

    document.addEventListener('mousemove', mouseMove, false);

    init();

}
