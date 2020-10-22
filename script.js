let imgSlade = document.querySelectorAll(".image");
let imgLink = [];

for (let i = 0; i < imgSlade.length; i++) {
    imgLink[i] = imgSlade[i].src;
    imgSlade[i].remove();
}


let step = 0;
let offset = 0;

function showImg() {
    let img = document.createElement('img');
    img.src = imgLink[step];
    img.classList.add('image');
    let imgPrevious = document.createElement('img');
    imgPrevious.src = imgLink[imgSlade.length - 1];
    imgPrevious.classList.add('image');
    imgPrevious.classList.add('image-previous');
    imgPrevious.setAttribute('type', 'previous');
    let imgNext = document.createElement('img');
    imgNext.src = imgLink[step + 1];
    imgNext.classList.add('image');
    imgNext.setAttribute('type', 'next');
    img.style.left = offset * 250 + 'px';
    imgPrevious.style.left = offset * 250 - 250 + 'px';
    imgNext.style.left = offset * 250 + 250 + 'px';
    document.querySelector('.container').appendChild(img);
    document.querySelector('.container').prepend(imgPrevious);
    document.querySelector('.container').append(imgNext);
}


function slideNext() {

    document.querySelector('.next').onclick = null;
    let imgOverflow = document.querySelectorAll('.image');

    if (imgOverflow[2].getAttribute('type') == 'next') {
        step = 2;
    } else if (imgOverflow[0].getAttribute('type') == 'afterPrevious') {
        step = step - 2;
    }
    if (step == -1) {
        step = 5;
    }
    if (step == -2) {
        step = 4;
    }
    if (step == -3) {
        step = 3;
    }
    if (step > imgLink.length - 1) {
        step = 0;
    }

    let offset2 = 0;
    for (let i = 0; i < imgOverflow.length; i++) {
        imgOverflow[i].style.left = offset2 * 250 - 500 + 'px';
        offset2++;
        imgOverflow[i].removeAttribute('type');
    }

    let imgNext = document.createElement('img');
    imgNext.src = imgLink[step];

    setTimeout(function() {
        imgNext.classList.add('image');
        imgNext.setAttribute('type', 'afterNext');
        imgNext.style.left = 250 + 'px';
        document.querySelector('.container').append(imgNext);
        imgOverflow[0].remove();
        document.querySelector('.next').onclick = slideNext;
    }, 1000);

    step++;
}

function slidePrevious() {
    document.querySelector('.previous').onclick = null;
    let imgOverflow = document.querySelectorAll('.image');
    if (document.querySelector('.image').getAttribute('type') == 'previous') {
        step = 4;
    } else if (imgOverflow[2].getAttribute('type') == 'afterNext') {
        step = step + 2;
    }
    if (step == imgLink.length) {
        step = 0;
    }
    if (step == imgLink.length + 1) {
        step = 1;
    }
    if (step == imgLink.length + 2) {
        step = 2;
    }
    if (step < 0) {
        step = 5;
    }

    let offset2 = 0;
    for (let i = 0; i < imgOverflow.length; i++) {
        imgOverflow[i].style.left = offset2 * 250 + 'px';
        offset2++;
        imgOverflow[i].removeAttribute('type');
    }

    let imgPrevious = document.createElement('img');
    imgPrevious.src = imgLink[step];
    imgPrevious.classList.add('image');
    imgPrevious.setAttribute('type', 'afterPrevious');
    setTimeout(function() {
        imgPrevious.style.left = -250 + 'px';
        document.querySelector('.container').prepend(imgPrevious);
        imgOverflow[2].remove();
        document.querySelector('.previous').onclick = slidePrevious;
    }, 1000);
    step--;
}

document.querySelector('.next').onclick = slideNext;
document.querySelector('.previous').onclick = slidePrevious;
showImg();