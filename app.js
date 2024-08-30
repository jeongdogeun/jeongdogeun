var result = document.getElementById('value');
var total = 0;
var historyStack = []; // Undo를 위한 스택
var redoStack = []; // Redo를 위한 스택

var undoButton = document.getElementById('undoButton'),
  addButton = document.getElementById('addButton'),
  subButton = document.getElementById('subButton'),
  redoButton = document.getElementById('redoButton'),
  inputValue = document.getElementById('inputbox');

// ===== onload ===== //
function onload() {
  undoButton.onclick = handleClick;
  addButton.onclick = handleClick;
  subButton.onclick = handleClick;
  redoButton.onclick = handleClick;
  updateButtonStates(); // 버튼 상태 업데이트
}

// ===== handleClick ===== //
function handleClick(event) {
  const clickedButtonId = event.target.id;

  if (clickedButtonId === 'addButton' || clickedButtonId === 'subButton') {
    const inputNumber = parseFloat(inputValue.value);
    if (!isNaN(inputNumber)) {
      historyStack.push(total); // 현재 상태를 Undo 스택에 저장
      redoStack = []; // 새 작업이 발생하면 Redo 스택을 초기화

      if (clickedButtonId === 'addButton') {
        total += inputNumber;
      } else if (clickedButtonId === 'subButton') {
        total -= inputNumber;
      }

      result.textContent = total;
      inputValue.value = ''; // 입력 필드 비우기
    } else {
      inputValue.value = '';//유효하지 않은 숫자가 입력된 경우 필드 비우기
    }
  }

  if (clickedButtonId === 'undoButton') {
    if (historyStack.length > 0) {
      redoStack.push(total); // 현재 상태를 Redo 스택에 저장
      total = historyStack.pop(); // 이전 상태로 되돌리기
      result.textContent = total;
    }
  }

  if (clickedButtonId === 'redoButton') {
    if (redoStack.length > 0) {
      historyStack.push(total); // 현재 상태를 Undo 스택에 저장
      total = redoStack.pop(); // 다음 상태로 되돌리기
      result.textContent = total;
    }
  }

  updateButtonStates(); // 버튼 상태 업데이트
}

// ===== updateButtonStates ===== //
function updateButtonStates() {
  undoButton.disabled = historyStack.length === 0;
  redoButton.disabled = redoStack.length === 0;
}
