const todoList = document.getElementById("todo-list");
const addTaskButton = document.getElementById("add-task-button");
const popup = document.createElement("div");
const popupInput = document.createElement("input");
const popupButton = document.createElement("button");

function createTodoItem(text, priority = "low") {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  todoItem.draggable = true;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function() {
    todoItem.classList.toggle("completed");
  });

  const p = document.createElement("p");
  p.innerText = text;

  const priorityIndicator = document.createElement("span");
  priorityIndicator.classList.add("priority", priority);

  todoItem.appendChild(checkbox);
  todoItem.appendChild(p);
  todoItem.appendChild(priorityIndicator);

  return todoItem;
}

function addTask(text, priority) {
  const todoItem = createTodoItem(text, priority);
  todoList.appendChild(todoItem);
  popup.style.display = "none";
  popupInput.value = "";
}

addTaskButton.addEventListener("click", function() {
  popup.style.display = "block";
});

popup.addEventListener("click", function(event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

popupButton.addEventListener("click", function() {
  const taskText = popupInput.value.trim();
  if (taskText) {
    addTask(taskText);
  }
});

todoList.addEventListener("dragover", function(event) {
  event.preventDefault();
});

todoList.addEventListener("drop", function(event) {
  if (event.target.tagName === "LI") {
    const droppedItem = event.dataTransfer.getData("text");
    const targetItem = event.target;
    const todoItems = Array.from(todoList.children);
    const droppedItemIndex = todoItems.findIndex(item => item.textContent === droppedItem);
    const targetItemIndex = todoItems.indexOf(targetItem);
    const temp = todoItems[droppedItemIndex];
    todoItems[droppedItemIndex] = todoItems[targetItemIndex];
    todoItems[targetItemIndex] = temp;
    todoList.innerHTML = "";
    todoItems.forEach(item => todoList.appendChild(item));
  }
});
popup.classList.add("popup");
popupInput.type = "text";
popupInput.placeholder = "Add a new task";
popupButton.innerText = "Add";
popup.appendChild(popupInput);
popup.appendChild(popupButton);
document.body.appendChild(popup);
popup.style.display = "none";

addTask("Enter Your Tasks", "medium");