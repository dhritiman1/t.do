const storage = () => {
  const storeTodos = (todolist) => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  };

  return { storeTodos };
};

export default storage;
