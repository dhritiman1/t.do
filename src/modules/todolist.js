import Storage from "./storage";

const todoList = () => {
  let storage = Storage();

  let _todos = {};
  let i = Object.keys(storage.getTodos()).length;

  const addTodo = (todo) => {
    _todos[`todo-${i++}`] = {
      title: todo.getTitle(),
      priority: todo.getPriority(),
      checked: todo.getChecked(),
    };
  };

  const getTodos = () => {
    return _todos;
  };

  const setTodos = (newTodos) => {
    _todos = newTodos;
  };

  return { addTodo, getTodos, setTodos };
};

export default todoList;
