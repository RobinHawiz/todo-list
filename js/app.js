const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("click", filterTodo);

function addTodo(e) {
  e.preventDefault();
  if (todoInput.value === "") {
    //pass
  } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    todoInput.value = "";
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    completedButton.addEventListener("click", toggleStyle);
    todoDiv.appendChild(completedButton);

    //Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", toggleStyle);
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
  }
}

function toggleStyle(e) {
  console.log(e.target.className);

  if (e.target.className === "complete-btn") {
    e.path[1].classList.toggle("complete-btn-style");
  } else if (e.target.className === "delete-btn") {
    e.path[1].classList.toggle("delete-btn-style");
    e.path[1].addEventListener("animationend", function () {
      e.path[1].remove();
    });
  } else {
    //pass
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);

  todos.forEach((element) => {
    switch (e.target.value) {
      case "all":
        element.style.display = "flex";
        break;
      case "completed":
        if (element.classList.contains("complete-btn-style")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!element.classList.contains("complete-btn-style")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
        break;
    }
  });
}
