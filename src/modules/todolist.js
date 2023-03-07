const todoList = () => {
  const _todos = {};
  let i = 0;

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

  const setTodos = (id) => {
    _todos[id] = newTodos;
  };

  return { addTodo, getTodos, setTodos };
};

export default todoList;
