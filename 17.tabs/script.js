const navElements = [...document.querySelector(".navbar").children];
const contentElements = [...document.querySelector(".content").children];

navElements.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    removeActiveTabs();
    removeActiveContentPage();
    tab.classList.add("active");
    setActiveContentPage(tab.id);
  });
});

function removeActiveTabs() {
  navElements.forEach((tab) => {
    tab.classList.remove("active");
  });
}

function removeActiveContentPage() {
  contentElements.forEach((page) => {
    page.classList.remove("active");
  });
}

function setActiveContentPage(pageName) {
  contentElements.forEach((page) => {
    if (page.id === pageName) {
      page.classList.add("active");
      return;
    }
  });
}
