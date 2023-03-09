const sort = (type, collection, priority) => {
  const low = document.querySelector(`.l-${type}`);
  const medium = document.querySelector(`.m-${type}`);
  const high = document.querySelector(`.h-${type}`);

  if (priority === "low") {
    low.appendChild(collection);
  } else if (priority === "medium") {
    medium.appendChild(collection);
  } else {
    high.appendChild(collection);
  }
};

export default sort;
