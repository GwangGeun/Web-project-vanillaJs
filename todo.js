const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
// localStorage 에 저장할 키 값

let toDos = [];
// 사용자가 입력한 toDoList 들을 보관할 배열

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    // console.log(event, "hello");
    // console.log(event.target.parentNode, "hello");
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    // array.filter 설명 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    // console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
    // localStorage 를 새롭게 셋팅
}
/*
    < Process >

    1. 삭제 버튼 클릭 시 --> 해당 글의 list 삭제 
    2. toDoList 가 저장되어 있는 배열 (toDos) 에서 삭제된 toDo 만 빼고 cleanToDos 에 저장
    3. toDos 를 cleanToDos 로 대체
    4. localStorage 를 새롭게 셋팅

*/


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
/* 
    < 참고 >

    local storage 에는 object, array 등을 저장할 수가 없다.
    ** 오직 string 만 저장할 수 있다. **
    만약 value 값으로 boolean 형의 true 를 저장하면, javascript 는 boolean 형 상태의 true 가 아닌
    string 형태의 "true" 으로 값을 저장한다.
    때문에, json value 를 string 형태로 바꿔주는 JSON.stringfy() 를 사용한다.

*/
function paintToDo(text){
    const li =document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1; 
    // + 1 을 한 이유는 처음에 "toDos" 배열애 값이 없기 때문이다.
    // 1. li 속성의 class 명으로 사용한다.
    // 2. toDoObj 의 id 속성에 사용한다. 
    
    delBtn.innerText = "✕";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id:newId
    };
    // 사용자가 입력한 toDo 내용을 id 값과 같이 저장한다.
    // toDoObj는 toDos 의 배열에 추가된다.
    
    toDos.push(toDoObj);
    saveToDos();
}
// ToDoList 를 추가하는 부분
// 추가 되는 리스트는 button, span 을 포함하고 있다.
// li 안에 span, button 이 들어가며, js-toDoList 의 클래스 명을 갖고 있는 ul 안에 li 가 리스트로써 들어가게 된다.

function handleSubmit(event){
    event.preventDefault();
    // 기본적으로 설정되어 있는 event 를 막는다.
    // 여기서는 form 의 input 에 값을 입력 후, enter 를 입력했을 때
    // 페이지가 새로고침 되는 것을 막기 위한 목적이다.
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value ="";
}
// 제일 처음에 호출 되는 부분
// paintToDo 에 input 창에서 받은 값을 넘겨준다.
// input 창에서 입력은 받고 사용자가 enter 를 입력하면, input 창은 다시 사용자가 편하게 입력 할 수 있도록 공백으로 만들어 준다.

function loadToDos(){

    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){    
        const parsedToDos = JSON.parse(loadedToDos);
        // localStorage 에 저장된 string (json array 를 string 으로 저장한 값)을 json 형태의 값으로 가져온다.
        // 여기서 parsedToDos 는 object 를 갖고 있는 json array 이다.
     
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        // forEach 설명 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

    }
    // localStorage 는 string 만 저장할 수 있다.
    // 위와 같은 이유로 localStorgae 에 데이터를 저장할 때, json array의 value 값을 string 으로 변환해서 저장했다.
    // 때문에, localStorage 에 string 형태로 저장된 값을 가져와서 json array 로써 사용하기 위해서는
    // string 형태의 값을 json array 로 변환해줘야 한다. 
    // 이를 위해 JSON.parse() 를 사용한다
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
