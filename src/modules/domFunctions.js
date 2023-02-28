const DOMFunctions = () => {
  const changeList = (() => {
    const loadDailyList = document.querySelector("#load-daily-todos");
    const loadProjectList = document.querySelector("#load-projects");

    const dailyList = document.querySelector(".daily-list-container");
    const projectsList = document.querySelector(".projects-container");

    loadDailyList.addEventListener("click", () => {
      toggleList(dailyList, projectsList, "daily-todos.");
      toggleActive(loadDailyList, loadProjectList);
    });
    loadProjectList.addEventListener("click", () => {
      toggleList(projectsList, dailyList, "projects.");
      toggleActive(loadProjectList, loadDailyList);
    });
  })();

  const toggleList = (display, hide, title) => {
    const titleContainer = document.querySelector(".list-title");
    titleContainer.textContent = title;

    if (display.classList.contains("toggle-display")) {
      display.classList.toggle("toggle-display");
    }
    if (!hide.classList.contains("toggle-display")) {
      hide.classList.toggle("toggle-display");
    }
  };

  const toggleActive = (active, inactive) => {
    if (!active.classList.contains("active-list")) {
      active.classList.toggle("active-list");
      active.classList.toggle("inactive-list");

      inactive.classList.toggle("active-list");
      inactive.classList.toggle("inactive-list");
    }
  };

  return {};
};

export default DOMFunctions;
