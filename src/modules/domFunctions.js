import { format } from "date-fns";
import todo from "./todo";
import toggle from "../func/toggle";
import form from "../func/form";
import save from "../func/save";

const DOMFunctions = () => {
  const todoFunc = todo();
  const toggleFunc = toggle();
  const formFunc = form();

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

  const makeTodo = (title, priority) => {
    let i = 0;
    const todo = document.createElement("div");
    todo.classList.add("todo", "flex-row", "top-border");
    todo.setAttribute("id", `${i}`);
    todo.innerHTML =
      '<div class="check-box custom-checkbox center">\n' +
      '  <input type="checkbox" name="check" id="check" />\n' +
      "</div>\n" +
      '<div class="title-box">\n' +
      `  <p>${title}</p>\n` +
      "</div>\n" +
      `<div class="priority-box center">\n` +
      `  <div class="priority ${priority}">${priority}</div>\n` +
      "</div>\n" +
      '<div class="del-btn center img-del">\n' +
      "  <img\n" +
      '    class="todo-del"\n' +
      '    src="assets/icons/icons8-delete-document-24.png"\n' +
      '    alt="delete"\n' +
      "  />\n" +
      "</div>";
    i += 1;

    const dailyList = document.querySelector(".daily-list");
    dailyList.appendChild(todo);
  };

  return { makeTodo };
};

export default DOMFunctions;
