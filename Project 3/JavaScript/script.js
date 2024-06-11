let images = [{
    url: '../assets/img-1.png',
    text1: 'Rostov-on-Don,\nLCD admiral',
    text2: '81 m2',
    text3: '3.5 months',
    text4: 'Upon request'
}, {
    url: '../assets/img-2.png',
    text1: 'Sochi\nThieves',
    text2: '105 m2',
    text3: '4 months',
    text4: 'Upon request'
}, {
    url: '../assets/img-3.png',
    text1: 'Rostov-on-Don\nPatriotic',
    text2: '93 m2',
    text3: '3 months',
    text4: 'Upon request'
}];
function initSlider() {
    if (!images || !images.length) return;

    let wr2Content = document.querySelector('.wrapper2__content');
    let sliderImages = document.querySelector('.wrapper2__img');
    let sliderArrows = document.querySelector('.wrapper1__arrows');
    let sliderDots = document.querySelector('.wrapper1__dots');
    let wr1Text = document.querySelector('.content-wr1')
    let wr2Text = document.querySelector('.content-wr2')
    let wr3Text = document.querySelector('.content-wr3')
    let wr4Text = document.querySelector('.content-wr4')
    initImages();
    initTitles();
    initArrows();
    initDots();
    initText();

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class='image n${index} ${index === 0? 'active' : ''}' style='background-image:url(${images[index].url})' data-index='${index}'></div>`;
            sliderImages.innerHTML += imageDiv;
        })
    }

    function initTitles() {
        images.forEach((image, index) => { 
            let title = `<div class='slider__title n${index} ${index === 0? 'active' : ''}' data-index='${index}'></div>`; 
            wr2Content.innerHTML += title; 
        });
        wr2Content.querySelectorAll('.slider__title').forEach(title => { 
            title.addEventListener('click', function() {
                moveSlider(this.dataset.index); 
            })
        })
    }

    function initArrows() {
        sliderArrows.querySelectorAll('.wrapper1__arrow').forEach(arrow => {
            arrow.addEventListener('click', function() { 
                let curNumber = +sliderImages.querySelector('.active').dataset.index; 
                let nextNumber;
                if (arrow.classList.contains('left')) { 
                    nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1? 0 : curNumber + 1; 
                }
                moveSlider(nextNumber);
            });
        });
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class='wrapper1__dots-item n${index} ${index === 0? 'active' : ''}' data-index='${index}'></div>`
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll('.wrapper1__dots-item').forEach(dot => {
            dot.addEventListener('click', function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function initText() {
        let textDiv1 = `<div class='images__text1'>${images[0].text1}</div>`;
        let textDiv2 = `<div class='images__text2'>${images[0].text2}</div>`;
        let textDiv3 = `<div class='images__text3'>${images[0].text3}</div>`;
        let textDiv4 = `<div class='images__text4'>${images[0].text4}</div>`;
        wr1Text.innerHTML += textDiv1;
        wr2Text.innerHTML += textDiv2;
        wr3Text.innerHTML += textDiv3;
        wr4Text.innerHTML += textDiv4;
    }
    function changeText(num) {
        let sliderText1 = wr1Text.querySelector('.images__text1');
        let sliderText2 = wr2Text.querySelector('.images__text2');
        let sliderText3 = wr3Text.querySelector('.images__text3');
        let sliderText4 = wr4Text.querySelector('.images__text4');
        sliderText1.innerText = images[num].text1;
        sliderText2.innerText = images[num].text2;
        sliderText3.innerText = images[num].text3;
        sliderText4.innerText = images[num].text4;
    }
    function moveSlider(num) {
        sliderImages.querySelector('.active').classList.remove('active');
        sliderImages.querySelector('.n' + num).classList.add('active');
        wr2Content.querySelector('.active').classList.remove('active');
        wr2Content.querySelector('.n' + num).classList.add('active');
        sliderDots.querySelector('.active').classList.remove('active');
        sliderDots.querySelector('.n' + num).classList.add('active');
        changeText(num);
    }
}

document.addEventListener('DOMContentLoaded', initSlider);