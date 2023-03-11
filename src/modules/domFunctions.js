import { format } from "date-fns";
import NewTodo from "./todo";
import toggle from "../func/toggle";
import form from "../func/form";
import errorCheck from "../func/errorCheck";
import todoList from "./todolist";
import storage from "./storage";
import projectList from "./projectlist";
import NewProject from "./project";
import sort from "../func/sort";

const DOMFunctions = () => {
  const toggleFunc = toggle();
  const formFunc = form();
  const todos = todoList();
  const projects = projectList();
  const storageFunc = storage();

  const updateCount = (collection, type) => {
    let num = 0;
    const container = document.querySelector(`#${type}-num-container`);

    if (container.classList.contains("toggle-display")) {
      container.classList.toggle("toggle-display");
    }

    if (type === "todo") {
      Object.keys(collection).forEach((key) => {
        if (collection[key].checked === false) {
          num += 1;
        }
      });
    } else if (type === "project") {
      Object.keys(collection).forEach((key) => {
        num += 1;
      });
    }

    if (num === 0 && !container.classList.contains("toggle-display")) {
      container.classList.toggle("toggle-display");
    }

    const count = document.querySelector(`.no-of-${type}`);
    count.textContent = num;
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
    let description;

    if (type === "project") {
      description = document.querySelector(`#${type}-desc`);
    }

    saveBtn.addEventListener("click", () => {
      if (errorCheck(title.value, priority.value, `${type}`)) {
        if (type === "todo") {
          todos.addTodo(NewTodo(title.value, priority.value));
          storageFunc.storeTodos(todos.getTodos());
          fillList(storageFunc.getTodos(), "todo");
          updateCount(storageFunc.getTodos(), "todo");
        } else {
          projects.addProject(
            NewProject(title.value, priority.value, description.value)
          );
          storageFunc.setProjects(projects.getProjects());
          fillList(storageFunc.getProjects(), "project");
          updateNoOfProjects(storageFunc.getProjects());
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

  const fillList = (collections, type) => {
    clearList(type);
    if (type === "todo") {
      Object.keys(collections).forEach((key) => {
        makeTodo(
          collections[key].title,
          collections[key].priority,
          collections[key].checked,
          key
        );
      });
    }
    if (type === "project") {
      Object.keys(collections).forEach((key) => {
        makeProject(
          collections[key].title,
          collections[key].description,
          collections[key].priority,
          key
        );
      });
    }
  };

  let i = Object.keys(storageFunc.getTodos()).length;
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

    sort("todo", todo, priority);

    const del = document.querySelector(`.del-${i}`);
    del.addEventListener("click", () => {
      remove(todo, "todo");
    });

    const check = document.querySelector(`#check-${i}`);
    check.addEventListener("click", () => {
      manageCheckedTodo(todo, check.checked);
    });

    i++;
  };

  let j = Object.keys(storageFunc.getProjects()).length;
  const makeProject = (title, desc, priority, id) => {
    const project = document.createElement("div");
    project.classList.add("project", "top-border", "center", "flex-column");
    project.setAttribute("id", `${id}`);

    project.innerHTML = `
    <div class="project-priority ${priority}"></div>
    <div class="project-header flex-row">
      <div class="project-title">
        <p>${title}</p>
      </div>
      <div class="remove-project-box center">
          <img src="assets/icons/icons8-delete-document-24.png" alt="delete-project" class="click-effect del-pr-${j}">
      </div>
    </div>

    <div class="project-desc">
      <p>${desc}</p>
    </div>

    <div class="checklist center flex-column">
      <p class="check-list-header">tasks:</p>
      <div class="list-item-box flex-column">
        <div class="add add-text top-border bottom-border">
          <p class="click-effect" id="add-task-${j}">+ new</p>
        </div>
      </div>
    </div>
    `;

    sort("project", project, priority);

    const del = document.querySelector(`.del-pr-${j}`);
    del.addEventListener("click", () => {
      remove(project, "project");
    });

    const addTask = document.querySelector(`#add-task-${j}`);
    addTask.addEventListener("click", () => {
      console.log(`add-task-${j}`);
    });

    j++;
  };

  const manageCheckedTodo = (todo, checked) => {
    const id = todo.id;
    const allTodos = todos.getTodos();
    allTodos[id].checked = checked;

    storageFunc.storeTodos(allTodos);
    fillList(storageFunc.getTodos(), "todo");
    updateCount(storageFunc.getTodos(), "todo");
  };

  const remove = (element, type) => {
    const id = element.id;

    if (type === "todo") {
      const allTodos = todos.getTodos();
      delete allTodos[id];

      storageFunc.storeTodos(allTodos);
      fillList(storageFunc.getTodos(), "todo");
      updateCount(storageFunc.getTodos(), "todo");
    } else if (type === "project") {
      const allProjects = projects.getProjects();
      delete allProjects[id];

      storageFunc.setProjects(allProjects);
      fillList(storageFunc.getProjects(), "project");
      updateCount(storageFunc.getProjects(), "project");
    }
  };

  const clearList = (type) => {
    const high = document.querySelector(`.h-${type}`);
    const medium = document.querySelector(`.m-${type}`);
    const low = document.querySelector(`.l-${type}`);

    high.innerHTML = "";
    medium.innerHTML = "";
    low.innerHTML = "";
  };

  const todoForm = (() => {
    const btn = document.querySelector("#add-todo");
    const btnBox = document.querySelector(".add-todo");
    const form = document.querySelector(".todo-form");

    formFunc.openForm(btn, btnBox, form, "todo");
    save("todo");
  })();

  const projectForm = (() => {
    const btn = document.querySelector("#add-project");
    const btnBox = document.querySelector(".add-project");
    const form = document.querySelector(".project-form");

    formFunc.openForm(btn, btnBox, form, "project");
    save("project");
  })();

  const dispDate = (() => {
    const date = document.querySelector(".curr-date");
    date.textContent = format(new Date(), "dd.MM.yyyy");
  })();

  const initialLoad = (() => {
    const todoList = storageFunc.getTodos();
    const projectList = storageFunc.getProjects();
    todos.setTodos(todoList);
    projects.setProjects(projectList);

    updateCount(todoList, "todo");
    updateCount(projectList, "project");

    Object.keys(todoList).forEach((key) => {
      makeTodo(
        todoList[key].title,
        todoList[key].priority,
        todoList[key].checked,
        key
      );
    });
    Object.keys(projectList).forEach((key) => {
      makeProject(
        projectList[key].title,
        projectList[key].description,
        projectList[key].priority,
        key
      );
    });
  })();
};

export default DOMFunctions;
