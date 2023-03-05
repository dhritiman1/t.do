import errorCheck from "./errorCheck";
import todo from "../modules/todo";
import DOMFunctions from "../modules/domFunctions";
import form from "./form";

const save = (type) => {
  const formFunc = form();
  const todoFunc = todo();
  const saveBtn = document.querySelector(`#save-${type}`);
  const title = document.querySelector(`#${type}-title`);
  const priority = document.querySelector(`#${type}-priority`);

  saveBtn.addEventListener("click", () => {
    if (errorCheck(title.value, priority.value, `${type}`)) {
      if (type === "todo") {
        todoFunc.createTodo(title.value, priority.value);
        dom.makeTodo(title.value, priority.value);
      }
      document.getElementById(`${type}-form`).reset();
      formFunc.closeForm(
        document.querySelector(`.${type}-form`),
        document.querySelector(`#add-${type}`),
        document.querySelector(`.add-${type}`)
      );
      console.log(`save the ${type}`);
    }
  });
};

export default save;
