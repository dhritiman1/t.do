const NewTodo = (title, priority) => {
  const _todoTitle = title;
  const _todoPriority = priority;
  const _todoChecked = false;

  const setTitle = (newTitle) => (_todoTitle = newTitle);
  const getTitle = () => _todoTitle;

  const setPriority = (newPriority) => (_todoPriority = newPriority);
  const getPriority = () => _todoPriority;

  const setChecked = (newChecked) => (_todoChecked = newChecked);
  const getChecked = () => _todoChecked;

  return {
    setTitle,
    setPriority,
    setChecked,
    getTitle,
    getPriority,
    getChecked,
  };
};

export default NewTodo;
