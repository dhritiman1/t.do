const errorCheck = (title, priority, type) => {
  const error = document.querySelector(`.${type}-error-msg`);
  if ((title == "" && priority == "") || title == "" || priority == "") {
    error.textContent =
      "you forgot to fill in some fields. please fill them up.";
    return false;
  } else {
    error.textContent = "";
    return true;
  }
};

export default errorCheck;
