//유저가 값을 입력한다.
// [+] 버튼을 '클릭'하면, 할일이 추가(객체)
// [delete] 버튼을 '클릭'하면, 할일이 삭제
// [check] 버튼을 '클릭'하면 할일이 끝나며, 밑줄이 그어짐 :: render()에서 click event
    //(1) 버튼을 클릭하는 순간 isComplete이 false -> true로 바꿈
    //(2) true이면 끝난걸로 간주하고 밑줄
    //(3) false이면 안끝난걸로 간주하고 그대로.
// [ING] 탭에서 -> [DONE] 탭을 누르면, 언더바가 이동
// [DONE] 탭은 끝난 아이템만, [ING]은 진행중 아이템만
// [ALL] 탭을 누르면 다시 전체 아이템으로 돌아옴



let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []; //할 일

addButton.addEventListener("click", addTask);


//할일을 추가하는 함수
function addTask(){
    //let taskContent = taskInput.value;

    let task = { //객체
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };

    taskList.push(task); //할 일을 배열에 추가
    console.log(taskList);
    render();
}

//taskList를 화면에 그려주는 함수 (아이템 추가)
function render() { 
    let resultHTML = '';

    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
                            <div class="task-done">${taskList[i].taskContent}</div>
                                <div>
                                    <button onClick="toggleComplete('${taskList[i].id}')">Check</button>
                                    <button>Delete</button>
                                </div>
                            </div>`
        } else {
            resultHTML += `<div class="task">
                            <div>${taskList[i].taskContent}</div>
                                <div>
                                    <button onClick="toggleComplete('${taskList[i].id}')">Check</button>
                                    <button>Delete</button>
                                </div>
                            </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

//item의 check 버튼을 클릭 시, 해당 item의 isComplete의 값을 true로 변경 & 밑줄 긋기
function toggleComplete(id){
    for (let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){ //list의 id와, 매개변수의 id(check여부) 비교
            taskList[i].isComplete = true;
            break;
        }
    }
    render();
    console.log(taskList);
}

//중복되지 않는 랜덤한 아이디 생성
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}