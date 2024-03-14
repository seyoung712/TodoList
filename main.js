/*
1. 유저가 값을 입력한다.
2. [+] 버튼을 '클릭'하면, 할일이 추가(객체)
3. [delete] 버튼을 '클릭'하면, 할일이 삭제
4. [check] 버튼을 '클릭'하면 할일이 끝나며, 밑줄이 그어짐 :: render()에서 click event
    (1) 버튼을 클릭하는 순간 isComplete이 false -> true로 바꿈
    (2) true이면 끝난걸로 간주하고 밑줄
    (3) false이면 안끝난걸로 간주하고 그대로.
5. [ING] 탭에서 -> [DONE] 탭을 누르면, 언더바가 이동
6. [DONE] 탭은 끝난 아이템만, [ING]은 진행중 아이템만
7. [ALL] 탭을 누르면 다시 전체 아이템으로 돌아옴
*/


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div"); //task-tabs의 div 여러개를 선택
let taskList = []; //할 일
let underLine = document.getElementById("under-line");
let mode='all'; //tab 기본 선택은 'all'
let filterList=[]; 


addButton.addEventListener("click", addTask);

//tab 변경
for(let i=1;i<tabs.length;i++){ //console.log 해본 결과 0은 under-line이기 때문에, 1부터 시작(ALL,ING,DONE)
    tabs[i].addEventListener("click",function(event){
        filter(event); // event: 어떤 탭을 클릭했는지에 대한 정보
    });
}

console.log(tabs);
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
    //1. 내가 선택한 tab에 따라서 2. 리스트를 다르게 보여주기
    let list=[];
    if(mode === "all"){ //taskList
        list = taskList;
    }else if (mode === "ing" || mode === "done"){ //filterList (isComplete의 결과값에 따른 리스트 배열)
        list = filterList;
    }

    
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
                            <div class="task-done">${list[i].taskContent}</div>
                                <div>
                                    <button onClick="toggleComplete('${list[i].id}')">Check</button>
                                    <button onClick="deleteTask('${list[i].id}')">Delete</button>
                                </div>
                            </div>`
        } else {
            resultHTML += `<div class="task">
                            <div>${list[i].taskContent}</div>
                                <div>
                                    <button onClick="toggleComplete('${list[i].id}')">Check</button>
                                    <button onClick="deleteTask('${list[i].id}')">Delete</button>
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
            taskList[i].isComplete = !taskList[i].isComplete; // 클릭한 순간 taskList[i].isComplete의 값과 반대값으로 변경 (true -> false / false -> true)
            break;
        }
    }
    render(); //★
    console.log(taskList);
}

//item의 delete 버튼을 클릭 시, 해당 item을 제거하기
function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1); //i번째 아이템 1개만 삭제
            break;
        }
    }
    render(); //★
    console.log(taskList);
}

//tab을 클릭 시 출력 리스트 변경
function filter(event){ //event : 어떤 탭을 클릭했는지에 대한 정보
    
    if(event){ //ING -> DONE으로 표시하면 바로 사라지는 부분
        mode = event.target.id; //전역변수로 render()에서도 사용됨
        filterList = []; //전역변수로 render()에서도 사용됨
    
        //tab 선택 시 언더바 이동
        underLine.style.left = event.currentTarget.offsetLeft + "px";
        underLine.style.width = event.currentTarget.offsetWidth + "px";
        underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
    }
    

    if(mode === "all") {
        //1. 전체 리스트 출력
        render();
    }else if (mode === "ing"){
        //2. 진행중 리스트 출력 (task.isComplete = false?)
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]); //진행중인 item들을 새로운 배열(filterList)에 넣기
            }
        }
        render(); //★
        //console.log("진행중",filterList);
    } else if (mode === "done"){
        //3. 끝난 리스트 출력 (task.isComplete = true?)
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]); //끝난 item들을 새로운 배열(filterList)에 넣기
            }
        }
        render(); //★
        //console.log("끝",filterList);
    }
}


//중복되지 않는 랜덤한 아이디 생성
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}