import Storage from "./storage";

const projectList = () => {
  let storage = Storage();

  let _projects = {};
  let i = Object.keys(storage.getProjects()).length;

  const addProject = (project) => {
    _projects[`project-${i++}`] = {
      title: project.getTitle(),
      description: project.getDesc(),
      priority: project.getPriority(),
      tasks: project.getTasks(),
    };
  };

  const getProjects = () => {
    return _projects;
  };

  const setProjects = (newProjects) => {
    _projects = newProjects;
  };

  return { addProject, getProjects, setProjects };
};

export default projectList;
