const Storage = () => {
  if (localStorage.getItem("todolist") === null) {
    localStorage.setItem("todolist", JSON.stringify({}));
    localStorage.setItem("projectlist", JSON.stringify({}));
  }

  const storeTodos = (todolist) => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  };

  const getTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todolist"));
    return todos;
  };

  const setProjects = (project) => {
    localStorage.setItem("projectlist", JSON.stringify(project));
  };

  const getProjects = () => {
    const projects = JSON.parse(localStorage.getItem("projectlist"));
    return projects;
  };

  return { storeTodos, getTodos, setProjects, getProjects };
};

export default Storage;
