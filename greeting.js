const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
// querySelector 는 찾은 것의 "첫번째" 내용만 가져온다.
// document.querySelectorAll 는 해댱되는 내용을 array 형태로 모두 가져온다.

const UserName = "currentUser";
// 사용자의 입력 값을 localStorage 에 저장할 때,
// 사용할 key 값
const ShowingCheck = "showing";
// input 창과 h4 를 사용자에게 보여주고 숨기기는 기능을 구현하기 위한 class 명
// "showing" 이란 클래스명을 add 하고 remove 하면서,
// input 창을 필요에 의해 사용자에게 보여주고 숨기는 기능을 구현 할 수 있음.
// index.css 의 .showing 부분을 참고해서 볼 것.

function saveName(text) {
  localStorage.setItem(UserName, text);
}
// localStorage 에 사용자의 이름 (입력값)을 저장
// localStorage : key,value 형태

function handleSubmit(event) {
  event.preventDefault();
  // 기본적으로 설정되어 있는 event 를 막는다.
  // 여기서는 form 의 input 에 값을 입력 후, enter 를 입력했을 때
  // 페이지가 새로고침 되는 것을 막기 위한 목적이다.
  const currentValue = input.value;
  // input 값에 입력되어 있는 값을 가져온다.
  paintGreeting(currentValue);
  // 사용자가 입력한 값을 화면에 보여줌
  // 동시에, 입력창 (input)을 hidden 으로 설정
  saveName(currentValue);
  // 사용자의 정보 (입력값)을 localStorage 에 저장한다.
}
//  javascript 는 이벤트를 함수를 만들 때마다 이벤트 함수를 자동적으로 객체에 붙인다.
//  쉽게 말해, 매개변수의 event 는 javascript 으로 부터 온 event 객체이며
//  event 객체에는 내가 만든 이벤트 함수를 다룰 수 있는 정보들이 담겨져 있다.

function askForName() {
  form.classList.add(ShowingCheck);
  // form 을 사용자에게 보여줌 ( 사용자의 이름을 입력받기 위한 목적 )
  form.addEventListener("submit", handleSubmit);
  // form 은 기본적으로 "submit" 버튼이 없어도, 사용자가 입력값을 "input" 창에
  // 입력 후, enter 를 누르면 데이터를 전송하기 위해 페이지가 새로고침 된다.
  //
  // 즉, 만약 data 를 전송할 목적지의 url 을 지정하면, 해당 url 로 데이터가 전송되고
  // 지정하지 않았을 경우는 지금 보고 있는 현재 페이지가 새로고침 된다.
  //
  // 이를 막기 위해 form 에 기본적으로 설정되어 있는 "submit" 이벤트를 제거
  // 이벤트를 제거하면, enter 를 눌러도 아무 이벤트 (반응)이 발생하지 않으며 따라서
  // 현재 페이지가 새로고침 될 일도 없다.
  //
  // ** 참고 사항 **
  //
  //  1.  form.addEventListener("submit", handleSubmit);
  //
  //     : 이벤트가 발생 했을 때 함수를 호출한다.
  //
  //  2.  form.addEventListener("submit", handleSubmit());
  //
  //     : 지금 당장 함수를 호출한다.
  //
}
// localStorage 에 값이 없을 경우 호출 됨.

function paintGreeting(text) {
  form.classList.remove(ShowingCheck);
  // 사용자의 정보를 입력받을 필요가 없으므로, form 화면을 제거
  greeting.classList.add(ShowingCheck);
  // 사용자의 입력 값을 보여주기 위한 부분(h4)은 turn on
  greeting.innerText = `Hello ${text} !!`;
  // 사용자에게 보여줄 메세지
}
// localStorage 에 값이 있을 경우 호출 됨.

function loadName() {
  const currentUser = localStorage.getItem(UserName);
  if (currentUser === null) {
    askForName();
    // localStorage 에 저장된 값이 없으면,
    // 사용자에게 본인의 이름을 입력할 form 을 제공해준다.
    // 입력 받은 값을 바탕으로 localStorage 에 저장한다.
  } else {
    paintGreeting(currentUser);
    // localStorage 에 저장된 값이 있으면
    // 사용자에게 "hello 사용자이름" 의 메세지를 띄워준다.
  }
}

function init() {
  loadName();
}

init();
