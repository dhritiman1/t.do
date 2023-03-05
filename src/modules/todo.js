const todo = () => {
  function todoObj(title, priority) {
    return { title, priority };
  }

  const _todos = [];

  const createTodo = (title, priority) => {
    const newTodo = todoObj(title, priority);
    _todos.push(newTodo);
    dom.makeTodo(title, priority);
    console.log(_todos);
  };

  return { createTodo };
};

export default todo;
