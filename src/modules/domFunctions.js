import { format } from "date-fns";
import newTodo from "./todo";
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
          todos.addTodo(newTodo(title.value, priority.value));
          fillList(todos.getTodos());
          storageFunc.storeTodos(todos.getTodos());
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
      makeTodo(todos[key].title, todos[key].priority);
    });
  };

  let i = 0;
  const makeTodo = (title, priority) => {
    const todo = document.createElement("div");
    todo.classList.add("todo", "flex-row", "top-border");
    todo.setAttribute("id", `todo-${i}`);
    todo.setAttribute("data-index-number", `${i++}`);
    todo.innerHTML = `
      <div class="check-box custom-checkbox center">
        <input type="checkbox" name="check" id="check" />
      </div>
      <div class="title-box">
        <p>${title}</p>
      </div>
      <div class="priority-box center">
        <div class="priority ${priority}">${priority}</div>
      </div>
      <div class="del-btn center img-del">
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
