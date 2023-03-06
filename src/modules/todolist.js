const todoList = () => {
  const _todos = {};
  let i = 0;
  const addTodo = (todo) => {
    _todos[`todo-${i++}`] = {
      title: todo.getTitle(),
      priority: todo.getPriority(),
    };
  };

  const getTodos = () => {
    return _todos;
  };

  return { addTodo, getTodos };
};

export default todoList;
