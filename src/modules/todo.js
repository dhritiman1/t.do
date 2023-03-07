const NewTodo = (title, priority, checked) => {
  const thisTitle = title;
  const thisPriority = priority;
  const thisChecked = checked;

  const setTitle = (newTitle) => (thisTitle = newTitle);
  const getTitle = () => thisTitle;

  const setPriority = (newPriority) => (thisPriority = newPriority);
  const getPriority = () => thisPriority;

  const setChecked = (newChecked) => (thisChecked = newChecked);
  const getChecked = () => thisChecked;

  return {
    setTitle,
    setPriority,
    getTitle,
    getPriority,
    setChecked,
    getChecked,
  };
};

export default NewTodo;
