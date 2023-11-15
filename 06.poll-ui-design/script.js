const container = document.querySelector(".poll-container");
const percentages = document.querySelectorAll(".option-top span:last-child");
const fillBars = document.querySelectorAll(".option-bottom");
const allOptions = document.querySelectorAll(".option");
const inputs = document.querySelectorAll("input");

container.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    resetPoll(e);
    const path = e.composedPath();
    path.forEach((item) => {
      if (item?.classList?.contains("option")) {
        item.classList.add("selected");
      }
    });
    percentages.forEach((item) => {
      item.style.display = "flex";
    });
    fillBars.forEach((item) => {
      item.style.display = "block";
      item.children[0].classList.add("fill");
      item.children[0].style.width = item.children[0].dataset.fillPercent + "%";
    });
  }
});

function resetPoll(e) {
  allOptions.forEach((item) => {
    if (item?.classList?.contains("selected")) {
      item.classList.remove("selected");
    }
  });
  inputs.forEach((item) => {
    if (item.checked && item !== e.target) {
      item.checked = false;
    }
  });
  percentages.forEach((item) => {
    item.style.display = "none";
  });
  fillBars.forEach((item) => {
    item.style.display = "none";
    item.children[0].classList.remove("fill");
  });
}
