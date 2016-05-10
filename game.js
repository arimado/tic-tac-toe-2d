window.onload = function () {

    var canvasNode = document.getElementById('game');
    var devPanelNode = document.getElementById('dev');

    canvasNode.style.border = '1px solid black';
    canvasNode.style.display = 'block';
    canvasNode.style.margin = 'auto';
    canvasNode.style.marginTop = '30px';

    var c = canvasNode.getContext('2d');

    var board = [false, false, false, false, false, false ,false , false , false];

    var render = function (c, data) {
        drawGrid(c);
    };

    var drawBox = function (c, x, y, w, h) {
        c.strokeStyle = 'black';
        c.lineWidth = 2;
        c.strokeRect(x, y, w, h);
        console.log(x, y, w, h)
    }

    var drawRow = function (c, x, y, w, h, drawFunc, col, colSpace) {
        var currentSpace;
        for (var i = 0; i < col; i += 1) {
            currentSpace = colSpace * i + 30;
            drawFunc(c, currentSpace, y, w, h);
        }
    }

    var drawGrid = function (c, x, y, w, h, drawCell, col, colSpace, drawRow, row, rowSpace) {
        for (var i = 0; i < row; i += 1) {
            var currentRowSpace = rowSpace * i;
            drawRow(c, x, currentRowSpace, w, h, drawBox, col, colSpace);
        }
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
           drawGrid(c, 20, 20, 150, 150, drawBox, 3, 150, drawRow, 3, 150)
    };

    var mouseMove = function (evt, data) {
        var mousePos = getMousePos(canvasNode, evt);
        var message = "X: " + mousePos.x + ", " + "Y: " + mousePos.y;
        updateInnerHtml(devPanelNode, message);
    }

    document.addEventListener('mousemove', mouseMove, false);

    init();

}
