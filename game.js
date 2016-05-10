window.onload = function () {

    var canvasNode = document.getElementById('game');
    var devPanelNode = document.getElementById('dev');

    canvasNode.style.width = '900px';
    canvasNode.style.height = '500px';
    canvasNode.style.border = '1px solid black';
    canvasNode.style.display = 'block';
    canvasNode.style.margin = 'auto';
    canvasNode.style.marginTop = '30px';

    var ctx = canvasNode.getContext('2d');

    var board = [false, false, false, false, false, false ,false , false , false];

    var render = function (ctx, data) {

    };

    var drawGrid = function (ctx) {
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

    var mouseMove = function (evt, data) {
        var mousePos = getMousePos(canvasNode, evt);
        var message = "X: " + mousePos.x + ", " + "Y: " + mousePos.y;
        updateInnerHtml(devPanelNode, message);
    }

    document.addEventListener('mousemove', mouseMove, false);

}
