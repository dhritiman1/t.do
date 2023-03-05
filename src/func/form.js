const form = () => {
  const openForm = (btn, btnBox, form, type) => {
    btn.addEventListener("click", () => {
      if (form.classList.contains("toggle-display")) {
        form.classList.toggle("toggle-display");
        btn.classList.toggle("toggle-display");
      }
      if (btnBox.classList.contains("bottom-border")) {
        btnBox.classList.toggle("bottom-border");
      }
    });

    const closebtn = document.querySelector(`.close-${type}-form`);
    closebtn.addEventListener("click", () => {
      closeForm(form, btn, btnBox);
    });
  };

  const closeForm = (form, btn, btnBox) => {
    if (!form.classList.contains("toggle-display")) {
      form.classList.toggle("toggle-display");
      btn.classList.toggle("toggle-display");
    }
    if (!btnBox.classList.contains("bottom-border")) {
      btnBox.classList.toggle("bottom-border");
    }
  };

  return { openForm, closeForm };
};

export default form;
