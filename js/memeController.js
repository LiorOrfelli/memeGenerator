'use strict';

var gCanvas;
var gContext;
var gImg;


function onInit() {
    gCanvas = document.getElementById('canvas');
    gContext = gCanvas.getContext('2d');
    gMeme = setgMemeAfterInitialization();
    //Defining a new empty image object
    gImg = new Image();
    //Defining the source of the image
    gImg.src = getImgByMemeId(parseInt(gMeme.selectedImgId)).url;
    //Setting the model before rendering
    setInitialModelForRendering();
    //Drawing the image on the canvas
    gImg.onload = function () {
        gContext.canvas.width = gImg.width;
        gContext.canvas.height = gImg.height;
        gContext.drawImage(gImg, 0, 0);
        renderCanvas();
    }

    //Event Listeners
    window.addEventListener('load', resize, false);
    window.addEventListener('resize', resize, false);

}

function drawImageOnCanvas() {
    gContext.canvas.width = gImg.width;
    gContext.canvas.height = gImg.height;
    gContext.drawImage(gImg, 0, 0);
}
/* function drawTextOnTopUpperImage(midUpperText) {
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
} */

/* function drawMemeImage() {
    console.log('ELEMENT LOADED');
    gContext.canvas.width = gImg.width;
    gContext.canvas.height = gImg.height;
    gContext.drawImage(gImg, 0, 0);
}


function LoadMemeImage() {
    console.log(gMeme);
    console.log('Getting Element');
    gImg = new Image();
    gImg.src = getImgByMemeId(parseInt(gMeme.selectedImgId)).url;
    // img.onload = someFunc()
    window.addEventListener('load', resize, false);
    window.addEventListener('resize', resize, false); */

function resize() {
    console.log('RESIZING');
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
    setDefaultTextInTextBox();
    renderCanvas();
}

function onRemoveLine() {
    removeLine();
    setSelelectedLineTextInTextBox();
    renderCanvas();
}

function onSetLineUp() {
    moveSelectedLineUp();

}

function onSetLineDown() {
    moveSelectedLineDown();

}

function renderCanvas() {
    drawImageOnCanvas();
    // console.log('RenderingTEXT');
    var linesToBeRendered = gMeme.lines;
    let currentLineIndex = 0;
    linesToBeRendered.forEach((line) => {
        // console.log(line);
        currentLineIndex++;
        // console.log(currentLineIndex);
        drawLine(line.size, line.font, line.color, line.align, line.txt, line.XLinePosition, line.YLinePosition);
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


function onDownloadCanvas(el) {
    var image = gCanvas.toDataURL("image/jpg");
    el.href = image;
}


function setDefaultTextInTextBox() {
    var textBox = document.getElementById("txt");
    textBox.value = "Text";
    console.log(textBox);
}


function onToggleLine() {
    toggleLine();
    setSelelectedLineTextInTextBox();

}

function setSelelectedLineTextInTextBox() {
    var textBox = document.getElementById("txt");
    textBox.value = gMeme.lines[gMeme.selectedLineIdx].txt;
}






// TODO:

/*
1. get img element (on init) as global

2. set img url (selectImg)
3. render img  (renderImg)
4. render text (renderImg)

*/