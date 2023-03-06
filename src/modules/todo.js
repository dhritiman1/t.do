const newTodo = (title, priority) => {
  const thisTitle = title;
  const thisPriority = priority;

  const setTitle = (newTitle) => (thisTitle = newTitle);
  const getTitle = () => thisTitle;

  const setPriority = (newPriority) => (thisPriority = newPriority);
  const getPriority = () => thisPriority;

  return { setTitle, setPriority, getTitle, getPriority };
};

export default newTodo;
