let imgSlade = document.querySelectorAll(".image");
let imgLink = [];
console.log(imgSlade);
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
    console.log(imgPrevious);

}


function slideNext() {

    console.log(`slideNext step ${step}`);
    document.querySelector('.next').onclick = null;
    let imgOverflow = document.querySelectorAll('.image');

    if (imgOverflow[2].getAttribute('type') == 'next') {
        step = 2;

    } else if (imgOverflow[0].getAttribute('type') == 'afterPrevious') {
        step = step + 2;
        // elem = imgOverflow[0];
        // step = imgSlade.indexOf(elem);
        console.log(imgOverflow[0]);
        console.log(imgSlade[4]);
        console.log(imgOverflow[0] === imgSlade[4]);
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
    console.log(`slideNext sum ${step}`);
    let imgNext = document.createElement('img');
    imgNext.src = imgLink[step];

    setTimeout(function() {
        imgNext.classList.add('image');
        imgNext.setAttribute('type', 'afterNext');
        imgNext.style.left = 250 + 'px';
        document.querySelector('.container').append(imgNext);

        imgOverflow[0].remove();
        // showImg();
        document.querySelector('.next').onclick = slideNext;
    }, 1000);

    step++;
    console.log(imgOverflow);
}

function slidePrevious() {

    console.log(`slidePrevious step ${step}`);

    document.querySelector('.previous').onclick = null;
    let imgOverflow = document.querySelectorAll('.image');
    if (document.querySelector('.image').getAttribute('type') == 'previous') {
        step = 4;

    } else if (imgOverflow[2].getAttribute('type') == 'afterNext') {
        step = step - 3;
    }

    if (step < 0) {
        step = 5;
    }

    let offset2 = 0;
    console.log(`slidePrevious sum ${step}`);
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
        // showImg();
        document.querySelector('.previous').onclick = slidePrevious;
    }, 1000);
    step--;
    console.log(imgOverflow);
}

document.querySelector('.next').onclick = slideNext;
document.querySelector('.previous').onclick = slidePrevious;
showImg();