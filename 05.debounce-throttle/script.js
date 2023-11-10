const input = document.querySelector("input");
const defaultBehaviour = document.querySelector(".default");
const debouncedBehaviour = document.querySelector(".debounce");
const throttledBehaviour = document.querySelector(".throttle");

const debouncedText = makeDebounced((text) => {
  debouncedBehaviour.textContent = text;
}, 1000);

const throttledText = makeThrottled((text) => {
  throttledBehaviour.textContent = text;
}, 1000);

input.addEventListener("input", (e) => {
  defaultBehaviour.textContent = e.target.value;
  debouncedText(e.target.value);
  throttledText(e.target.value);
});

function makeDebounced(fn, d) {
  let timer;
  return function (...args) {
    if (timer) clearInterval(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, d);
  };
}

function makeThrottled(fn, d) {
  let last = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - last < d) return;
    last = now;
    fn(...args);
  };
}
