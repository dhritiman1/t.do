const toggle = () => {
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

  return { toggleList, toggleActive };
};

export default toggle;
