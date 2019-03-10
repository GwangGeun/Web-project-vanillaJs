const body = document.querySelector("body");

const IMG_NUMBER = 3;
// images 폴더에 저장되어 있는 이미지 갯수
// 사용자가 index.html 을 접속할 때 마다, 3가지 사진 중에 하나의 사진을 랜덤으로 골라 배경화면으로 사용하기 위한 목적 

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    // Math.floor() 는 소수점 버림
    // Math.ceil() 은 소수점 올림
    // Math.random() 은 0~1 사이의 숫자를 반환
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();