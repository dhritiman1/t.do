const storage = () => {
  const storeTodos = (todolist) => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
    console.log(localStorage);
  };

  const getTodos = () => {
    const todos = localStorage.getItem("todolist");
    console.log(todos);
    return todos;
  };

  return { storeTodos, getTodos };
};

export default storage;
