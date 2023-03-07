import { format } from "date-fns";
import NewTodo from "./todo";
import toggle from "../func/toggle";
import form from "../func/form";
import errorCheck from "../func/errorCheck";
import todoList from "./todolist";
import storage from "./storage";

const DOMFunctions = () => {
  const toggleFunc = toggle();
  const formFunc = form();
  const todos = todoList();
  const storageFunc = storage();

  const dispDate = (() => {
    const date = document.querySelector(".curr-date");
    date.textContent = format(new Date(), "dd.MM.yyyy");
  })();

  const updateNoOfTodos = (todos) => {
    let todoNum = 0;
    const todoNumContainer = document.querySelector("#todo-num-container");

    Object.keys(todos).forEach((key) => {
      if (todos[key].checked === false) {
        todoNum += 1;
      }
    });

    if (todoNumContainer.classList.contains("toggle-display")) {
      todoNumContainer.classList.toggle("toggle-display");
    }

    if (
      todoNum === 0 &&
      !todoNumContainer.classList.contains("toggle-display")
    ) {
      todoNumContainer.classList.toggle("toggle-display");
    }

    const noOfTodos = document.querySelector(".no-of-todo");
    noOfTodos.textContent = todoNum;
  };

  const changeList = (() => {
    const loadDailyList = document.querySelector("#load-daily-todos");
    const loadProjectList = document.querySelector("#load-projects");

    const dailyList = document.querySelector(".daily-list-container");
    const projectsList = document.querySelector(".projects-container");

    loadDailyList.addEventListener("click", () => {
      toggleFunc.toggleList(dailyList, projectsList, "daily-todos.");
      toggleFunc.toggleActive(loadDailyList, loadProjectList);
    });
    loadProjectList.addEventListener("click", () => {
      toggleFunc.toggleList(projectsList, dailyList, "projects.");
      toggleFunc.toggleActive(loadProjectList, loadDailyList);
    });
  })();

  const save = (type) => {
    const saveBtn = document.querySelector(`#save-${type}`);
    const title = document.querySelector(`#${type}-title`);
    const priority = document.querySelector(`#${type}-priority`);

    saveBtn.addEventListener("click", () => {
      if (errorCheck(title.value, priority.value, `${type}`)) {
        if (type === "todo") {
          todos.addTodo(NewTodo(title.value, priority.value));
          storageFunc.storeTodos(todos.getTodos());
          fillList(storageFunc.getTodos(), "");
          updateNoOfTodos(storageFunc.getTodos());
        }
        document.getElementById(`${type}-form`).reset();
        formFunc.closeForm(
          document.querySelector(`.${type}-form`),
          document.querySelector(`#add-${type}`),
          document.querySelector(`.add-${type}`)
        );
      }
    });
  };

  const fillList = (todos) => {
    clearList();
    Object.keys(todos).forEach((key) => {
      makeTodo(todos[key].title, todos[key].priority, todos[key].checked, key);
    });
  };

  let i = 0;
  const makeTodo = (title, priority, checked, id) => {
    const todo = document.createElement("div");
    todo.classList.add("todo", "flex-row", "top-border");
    if (checked === true) {
      todo.classList.add("checked");
    }
    todo.setAttribute("id", `${id}`);

    const isChecked = checked === true ? "checked" : "";

    todo.innerHTML = `
      <div class="check-box custom-checkbox center">
        <input type="checkbox" name="check" id="check-${i}" ${isChecked}/>
      </div>
      <div class="title-box">
        <p>${title}</p>
      </div>
      <div class="priority-box center">
        <div class="priority ${priority}">${priority}</div>
      </div>
      <div class="del-btn del-${i} center img-del">
        <img
          class="todo-del"
          src="assets/icons/icons8-delete-document-24.png"
          alt="delete"
        />
      </div>`;

    const hightodos = document.querySelector(".high-todo");
    const mediumtodos = document.querySelector(".medium-todo");
    const lowtodos = document.querySelector(".low-todo");

    if (priority == "high") {
      hightodos.appendChild(todo);
    } else if (priority == "medium") {
      mediumtodos.appendChild(todo);
    } else {
      lowtodos.appendChild(todo);
    }

    const del = document.querySelector(`.del-${i}`);
    del.addEventListener("click", () => {
      removeTodo(todo);
    });

    const check = document.querySelector(`#check-${i}`);
    check.addEventListener("click", () => {
      manageCheckedTodo(todo, check.checked);
    });

    i++;
  };

  const manageCheckedTodo = (todo, checked) => {
    const id = todo.id;
    const allTodos = todos.getTodos();
    allTodos[id].checked = checked;

    storageFunc.storeTodos(allTodos);
    fillList(storageFunc.getTodos());
    updateNoOfTodos(storageFunc.getTodos());

    console.log(allTodos[id]);
  };

  const removeTodo = (todo) => {
    const id = todo.id;
    const allTodos = todos.getTodos();
    delete allTodos[id];

    storageFunc.storeTodos(allTodos);
    fillList(storageFunc.getTodos());
    updateNoOfTodos(storageFunc.getTodos());
  };

  const clearList = () => {
    i = 0;
    const hightodos = document.querySelector(".high-todo");
    const mediumtodos = document.querySelector(".medium-todo");
    const lowtodos = document.querySelector(".low-todo");
    hightodos.innerHTML = "";
    mediumtodos.innerHTML = "";
    lowtodos.innerHTML = "";
  };

  const todoForm = (() => {
    const btn = document.querySelector("#add-todo");
    const btnBox = document.querySelector(".add-todo");
    const form = document.querySelector(".todo-form");

    formFunc.openForm(btn, btnBox, form, "todo");
    save("todo");
  })();

  const projectFrom = (() => {
    const btn = document.querySelector("#add-project");
    const btnBox = document.querySelector(".add-project");
    const form = document.querySelector(".project-form");

    formFunc.openForm(btn, btnBox, form, "project");
    save("project");
  })();
};

export default DOMFunctions;
