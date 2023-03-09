const NewProject = (title, priority, desc) => {
  const _projectTitle = title;
  const _projectPriority = priority;
  const _projectDesc = desc;
  const _projectTasks = {};

  const setTitle = (newTitle) => (_projectTitle = newTitle);
  const getTitle = () => _projectTitle;

  const setDesc = (newDesc) => (_projectDesc = newDesc);
  const getDesc = () => _projectDesc;

  const setPriority = (newPriority) => (_projectPriority = newPriority);
  const getPriority = () => _projectPriority;

  const setTasks = (newTasks) => (_projectTasks = newTasks);
  const getTasks = () => _projectTasks;

  return {
    setTitle,
    setPriority,
    setTasks,
    setDesc,
    getTitle,
    getPriority,
    getTasks,
    getDesc,
  };
};

export default NewProject;
