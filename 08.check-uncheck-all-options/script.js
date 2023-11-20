const checkBoxes = document.querySelectorAll("input[type='checkbox']");
const selectAll = document.querySelector("#select-all");

selectAll.addEventListener("click", (e) => {
  if (e.target.checked) {
    toggleCheckBoxes(e.target, true);
  } else {
    toggleCheckBoxes(e.target, false);
  }
});

function toggleCheckBoxes(selectAllCheckBox, toggle) {
  checkBoxes.forEach((checkBox) => {
    if (selectAllCheckBox !== checkBox) {
      checkBox.checked = toggle;
    }
  });
}
