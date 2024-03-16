// 유저가 값을 입력한다
// + 버튼을 클릭 -> 할일이 추가
// delete 버튼 -> 할일삭제
// check 버튼 -> 할일이 끝나면서 밑줄이 간다
// 1. check -> true false
// 2. true -> 밑줄 끝난걸로 간주
// 3. false -> 안끝난걸로 간주 그대로
// 진행중 끝남 누르면 언더바가 이동함
// 끝남탭은 끝남탭만, 진행중탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체아이템으로 돌아옴

let taskinput = document.getElementById('task-input');
let addbutton = document.getElementById('add-button');
let tabs = document.querySelectorAll('.task-tabs div');
let tasklist = [];
let mode = 'all';
let filterlist = [];

addbutton.addEventListener('click', addtask); // 버튼 기능 만들기 (이벤트)

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

function addtask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskinput.value,
    isComplete: false,
  };
  tasklist.push(task);
  console.log(tasklist);
  render();
}

function render() {
  let list = [];
  if (mode === 'all') {
    list = tasklist;
  } else if (mode === 'ongoing' || mode === 'done') {
    list = filterlist;
  }

  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
        </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].id == id) {
      tasklist[i].isComplete = !tasklist[i].isComplete;
      break;
    }
  }
  render();
  console.log(tasklist);
}

function deleteTask(id) {
  for (let i = 0; i < tasklist.length; i++) {
    if (tasklist[i].id == id) {
      tasklist.splice(i, 1);
      break;
    }
  }
  render(); // 값을 업데이트했으면 ul도 업데이트 해줘야 함!!!
}

function filter(event) {
  mode = event.target.id;
  filterlist = [];
  if (mode === 'all') {
    // 전체 리스트를 보여준다
    render();
  } else if (mode === 'ongoing') {
    // 진행중인 아이템을 보여준다
    // task.isComplete:false
    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].isComplete === false) {
        filterlist.push(tasklist[i]);
      }
    }
    render();
    console.log('진행중', filterlist);
  } else if (mode === 'done') {
    //끝나는 케이스
    //task.isComplete=true
    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].isComplete === true) {
        filterlist.push(tasklist[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
