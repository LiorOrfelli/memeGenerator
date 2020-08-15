'use strict';

function onInit() {
    renderImgs();

}

function renderImgs() {
    let displayedImages = getImgs();
    let elGallerySection = document.querySelector('.pics');
    console.log(elGallerySection);
    elGallerySection.innerHTML = ``;
    displayedImages.forEach((imgElement) => {
        elGallerySection.innerHTML += `
            <img src=${imgElement.url} id=${imgElement.id} onclick="onClickImage(this.id)">`
    })
}
function onClickImage(imgId) {
    setSelctedImageToBeTheMeme(imgId);
    window.location.replace("editor.html");
}

