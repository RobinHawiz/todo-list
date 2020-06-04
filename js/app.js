const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", addTodoFromLocalStorage);
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("click", filterTodo);

function addTodo(e) {
  e.preventDefault();
  if (todoInput.value === "") {
    //pass
  } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    saveLocalTodos(todoInput.value);

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
    deleteButton.addEventListener("click", deleteTodoFromLocalStorage);
    deleteButton.addEventListener("click", toggleStyle);
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
  }
}

function toggleStyle(e) {
  if (e.target.className === "complete-btn") {
    e.target.parentElement.classList.toggle("complete-btn-style");
  } else if (e.target.className === "delete-btn") {
    e.target.parentElement.classList.toggle("delete-btn-style");
    e.target.parentElement.addEventListener("animationend", function () {
      e.target.parentElement.remove();
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

function addTodoFromLocalStorage() {
  if (localStorage.getItem("todos") === null) {
    // pass
  } else {
    let todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach((element) => {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      const newTodo = document.createElement("li");
      newTodo.innerText = element;
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
      deleteButton.addEventListener("click", deleteTodoFromLocalStorage);
      deleteButton.addEventListener("click", toggleStyle);
      todoDiv.appendChild(deleteButton);

      todoList.appendChild(todoDiv);
    });
  }
}

function deleteTodoFromLocalStorage(e) {
  const todo = e.target.parentElement.innerText;
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(todos.indexOf(todo), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
