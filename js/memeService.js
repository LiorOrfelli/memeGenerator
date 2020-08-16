'use strict';

var gInsertedLinesCounter = 1;

let gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['leaders'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['animals'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['babies', 'dogs'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['animals'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['babies'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['tv'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['babies'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['movies'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['babies'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['leaders'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['sports'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['tv'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['movies'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['movies'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['movies'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['hmovies'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['leaders'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['movies'] },
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        XLinePosition: 0, YLinePosition: 20,
        txt: 'Text', size: 50, align: 'center',
        color: 'black', font: 'IMPACT', insertionIndex: gInsertedLinesCounter
    }]
};



function getImgByMemeId(memeId) {
    var img = gImgs.find(function (img) {
        return memeId === img.id
    })
    return img;
}

function getImgs() {
    return gImgs;
}

function setSelctedImageToBeTheMeme(imgId) {
    gMeme.selectedImgId = imgId
    saveToStorage('gMeme', gMeme);
}

function setgMemeAfterInitialization() {
    gMeme = loadFromStorage('gMeme');
    return gMeme;
}

function setSelectedLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

//Setting a "default model" to be renderred - i.e. a first line on top 
//of the canvas containing "text"
function setInitialModelForRendering() {
    gMeme.lines[0].XLinePosition = 250;
    gMeme.lines[0].YLinePosition = 500 / 8;
}

function addLine() {
    gInsertedLinesCounter++;
    gMeme.selectedLineIdx++
    /*     gMeme.selectedLineIdx = gInsertedLinesCounter;
     */
    gMeme.lines.push({
        XLinePosition: 0, YLinePosition: 0,
        txt: 'Text', size: 50, align: 'center',
        color: 'black', font: 'IMPACT', insertionIndex: gInsertedLinesCounter
    })
    if (gMeme.selectedLineIdx === 1) {
        gMeme.lines[gMeme.selectedLineIdx].XLinePosition = (gCanvas.width) / 2;
        gMeme.lines[gMeme.selectedLineIdx].YLinePosition = (gCanvas.height) / 1.2;
    }
    /*          if(gInsertedLinesCounter === 1){
                gMeme.lines[(gInsertedLinesCounter)-1].XLinePosition = (gCanvas.width)/2;
                gMeme.lines[(gInsertedLinesCounter)-1].YLinePosition = (gCanvas.height)/9;
             } */
    if (gMeme.selectedLineIdx >= 2) {
        gMeme.lines[gMeme.selectedLineIdx].XLinePosition = (gCanvas.width) / 2;
        gMeme.lines[gMeme.selectedLineIdx].YLinePosition = (gCanvas.height) / 2;
    }
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}


function moveSelectedLineUp() {
    //IMPORTANT!!!
    //I decided that when a text line is removed - 
    //The "selected" line will automatically be the first one in the gMeme lines array
    //That is to prevent a situation in which no line is selected after deletion 
    //since the selectedImgIdx will be the index of the deleted line in the array...
    //so that after re rendering - none of the presented text lines will be "marked"
    gMeme.selectedLineIdx = gMeme.selectedLineIdx - 1;
    //In case user click again on move line up button but he/she is on the
    //first line 
    if (gMeme.selectedLineIdx <= 0) {
        gMeme.selectedLineIdx = 0;
    }
}

function moveSelectedLineDown() {
    //Same here
    gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1;
    //In case user click again on move line dowm button
    //but he/she is on the last line
    if (gMeme.selectedLineIdx >= (gMeme.lines).length) {
        gMeme.selectedLineIdx = (gMeme.lines.length) - 1;
    }
}

function moveLineLower() {
    gMeme.lines[gMeme.selectedLineIdx].YLinePosition += 5;
    if (gMeme.lines[gMeme.selectedLineIdx].YLinePosition >= gCanvas.height) {
        gMeme.lines[gMeme.selectedLineIdx].YLinePosition = gCanvas.height;
    }
}

function moveLineHigher() {
    gMeme.lines[gMeme.selectedLineIdx].YLinePosition -= 5;
    if (gMeme.lines[gMeme.selectedLineIdx].YLinePosition <= 0) {
        gMeme.lines[gMeme.selectedLineIdx].YLinePosition = 0;
    }

}

function changeSelectedLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function changeSelectedLineFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    //Prothecting from complete deletion of any line in the canvas
    //As metioned above - The moment a line is removed
    //I decided that the selectedLineIdx will be 0
    //I.e. the first Line;
    if (gMeme.selectedLineIdx <= 0) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx--
    // gInsertedLinesCounter--
    console.log('counter', gInsertedLinesCounter)
    console.log('idx', gMeme.selectedLineIdx)

}

//Could have done the following 3 functions with one function
//but for "readness" I did so
function leftAlignLine() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left';
}

function rightAlignLine() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right';
}

function centerAlignLine() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center';
}

function reduceSelectedLine() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2;
}

function enlargeSelectedLine() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2;
}

function toggleLine() {
    if (gMeme.selectedLineIdx === ((gMeme.lines.length) - 1)) {
        gMeme.selectedLineIdx = 0;
    }
    else {
        gMeme.selectedLineIdx++;
    }
}




