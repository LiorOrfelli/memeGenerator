'use strict';

var gCanvas;
var gContext;


function onInit() {
    gCanvas = document.getElementById('canvas');
    gContext = gCanvas.getContext('2d');
    gMeme = setgMemeAfterInitialization();
    drawMemeImage();
    setInitialModelForRendering();

}

function drawTextOnTopUpperImage(midUpperText) {
    gContext.font = "30px IMPACT";
    gContext.fillStyle = "red";
    gContext.textAlign = "center";
    gContext.fillText(midUpperText, canvas.width / 2, canvas.height / 8);

}

function drawTextOnCenterImage(midCenterText) {
    gContext.font = "30px IMPACT";
    gContext.fillStyle = "red";
    gContext.textAlign = "center";
    gContext.fillText(midCenterText, canvas.width / 2, canvas.height / 2);
}




function drawMemeImage() {
    console.log(gMeme);
    var img = new Image();
    img.src = getImgByMemeId(parseInt(gMeme.selectedImgId)).url;
    img.onload = function () {
        gContext.canvas.width = img.width;
        gContext.canvas.height = img.height;
        gContext.drawImage(img, 0, 0);
    };

    window.addEventListener('load', resize, false);
    window.addEventListener('resize', resize, false);

    function resize() {
        var ratio = canvas.width / canvas.height;
        var canvas_height = window.innerHeight;
        var canvas_width = canvas_height * ratio;
        if (canvas_width > window.innerWidth) {
            canvas_width = window.innerWidth;
            canvas_height = canvas_width / ratio;
        }

        canvas.style.width = canvas_width + 'px';
        canvas.style.height = canvas_height + 'px';
    }
}


function onChangeText(textInserted) {
    setSelectedLineText(textInserted)
    console.log(gMeme);
    renderCanvas();
}

function onMoveLineUp() {
    moveLineHigher();
    renderCanvas();
}

function onMoveLineDown() {
    moveLineLower();
    renderCanvas();
}

function onChangeColor(color) {
    console.log(color);
    changeSelectedLineColor(color);
    renderCanvas();

}

function onFontChange() {
    var e = document.getElementById("fonts");
    var strUser = e.options[e.selectedIndex].value;
    console.log(strUser);
    changeSelectedLineFont(strUser);
    renderCanvas();
}

function onEnlargeText() {
    enlargeSelectedLine();
    renderCanvas();
}

function onReduceText() {
    reduceSelectedLine();
    renderCanvas();
}

function onRightAlign() {
    rightAlignLine();
    renderCanvas();
}

function onCenterAlign() {
    centerAlignLine();
    renderCanvas();
}

function onLeftAlign() {
    leftAlignLine();
    renderCanvas();
}

function onAddLine() {
    moveSelectedLineDown();
    addLine();
    renderCanvas();
}

function onRemoveLine() {
    removeLine();
    renderCanvas();
}

function onSetLineUp() {
    moveSelectedLineUp();

}

function onSetLineDown() {
    moveSelectedLineDown();

}

function renderCanvas() {
    var linesToBeRendered = gMeme.lines;
    let currentLineIndex = 0;
    linesToBeRendered.forEach((line) => {
        console.log(line);
        currentLineIndex++;
        console.log(currentLineIndex);
        drawLine(line.size, line.font, line.color, line.align, line.txt, line.XLinePosition, line.YLinePosition);
        if (currentLineIndex === ((gMeme.selectedLineIdx) + 1)) {
            console.log('1');
            drawMarkedLine(line.size, line.font, line.color, line.align, line.txt, line.XLinePosition, line.YLinePosition);

        }
    })
}




function drawLine(fontSize, font, fontColor, fontAlign, lineText, lineX, lineY) {
    console.log(fontSize);
    console.log(font);
    gContext.font = fontSize + "px " + font;
    console.log(gContext.font);
    gContext.fillStyle = fontColor;
    gContext.textAlign = fontAlign;
    gContext.fillText(lineText, lineX, lineY);
}

function drawMarkedLine(fontSize, font, fontColor, fontAlign, lineText, lineX, lineY) {
    console.log(fontSize);
    console.log(font);
    gContext.font = fontSize + "px " + font;
    console.log(gContext.font);
    gContext.fillStyle = fontColor;
    gContext.textAlign = fontAlign;
    gContext.shadowColor = "green";
    gContext.shadowOffsetX = 0;
    gContext.shadowBlur = 10;
    gContext.fillText(lineText, lineX, lineY);
}


function onDownloadCanvas(el) {
    var image = gCanvas.toDataURL("image/jpg");
    el.href = image;
}