const DOMFunctions = () => {
  const toggleMenu = (() => {
    const menu = document.querySelector(".menu");
    const menubtn = document.querySelector(".btn");

    menubtn.addEventListener("click", () => {
      menu.classList.toggle("toggle-display");
      menubtn.classList.toggle("cross");
    });
  })();

  

  return {};
};

export default DOMFunctions;
