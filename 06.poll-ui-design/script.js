const poll = document.querySelector(".container");
const progress = document.querySelectorAll(".progress");

poll.addEventListener("click", (e) => {
  if (e.target.type === "radio") {
    const selectedProgressBar =
      e.target.closest(".option-details").children[1].children[0];
    e.target.closest(".option-details").style.borderColor = "rgb(27, 76, 235)";
    for (let i = 0; i < progress.length; ++i) {
      progress[i].style.display = "flex";
      const div =
        progress[i].closest(".option-details").children[0].children[1];
      progress[i].closest(
        ".option-details"
      ).children[0].children[0].children[0].style.cursor = "not-allowed";
      div.textContent = progress[i].dataset.fill + "%";
      if (progress[i].children[0] === selectedProgressBar) {
        progress[i].children[0].style.backgroundColor = "rgb(27, 76, 235)";
      } else {
        progress[i].children[0].style.backgroundColor = "rgb(205, 205, 205)";
      }
      progress[i].children[0].style.width = progress[i].dataset.fill + "%";
    }
  }
});
