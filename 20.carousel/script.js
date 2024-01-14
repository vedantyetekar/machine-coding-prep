const list = [...document.querySelector("ul").children];
const buttons = [...document.querySelectorAll("button")];

let currActive = 0;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.className === "next") {
      ++currActive;
    } else {
      --currActive;
    }
    if (currActive >= list.length || currActive < 0) {
      if (currActive >= list.length) {
        currActive = list.length - 1;
      } else {
        currActive = 0;
      }
      return;
    }
    removeActiveImages();
    setActiveImage(currActive);
  });
});

function removeActiveImages() {
  list.forEach((image) => {
    image.dataset.active = "0";
  });
}

function setActiveImage(indx) {
  list[indx].dataset.active = "1";
}
