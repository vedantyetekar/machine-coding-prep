const stars = document.querySelectorAll("[data-position]");
const starContainer = document.getElementsByClassName("star-container")[0];

let ratedTillIndex = -1;

starContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("star")) {
    let currentClicked = e.target.dataset.position;
    for (let i = 0; i <= ratedTillIndex; ++i) {
      stars[i].classList.remove("active");
    }
    ratedTillIndex = currentClicked;
    for (let i = 0; i <= ratedTillIndex; ++i) {
      stars[i]?.classList.add("active");
    }
    hasClicked = true;
  }
});

starContainer.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("star")) {
    for (let i = stars.length - 1; i > ratedTillIndex; --i) {
      stars[i].classList.remove("active");
    }
    let currentClicked = e.target.dataset.position;
    for (let i = 0; i <= currentClicked; ++i) {
      stars[i].classList.add("active");
    }
  }
});

starContainer.addEventListener("mouseleave", (e) => {
  for (let i = stars.length - 1; i > ratedTillIndex; --i) {
    stars[i].classList.remove("active");
  }
});
