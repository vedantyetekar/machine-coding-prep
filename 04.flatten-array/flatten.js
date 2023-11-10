function flattenArray(arr) {
  let flatArray = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flatArray = flatArray.concat(flattenArray(item));
    } else {
      flatArray.push(item);
    }
  });
  return flatArray;
}

let arr = [1, 2, [3, 4], [5, [44, 455, [11, 22]]], 6];
const res = flattenArray(arr);

console.log(res);
