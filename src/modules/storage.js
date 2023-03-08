const storage = () => {
  if (localStorage.getItem("todolist") === null) {
    localStorage.setItem("todolist", JSON.stringify({}));
  }

  const storeTodos = (todolist) => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  };

  const getTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todolist"));
    return todos;
  };

  return { storeTodos, getTodos };
};

export default storage;
