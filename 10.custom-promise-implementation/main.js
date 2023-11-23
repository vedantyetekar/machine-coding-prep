const myPromise = require("./myPromise");

const userDetails = { name: "Vedant Yetekar", rollNumber: 53, age: 21 };

function getUserDetails() {
  return new myPromise((resolve, reject) => {
    if (userDetails) {
      return resolve(userDetails);
    }
    reject("Something went wrong!");
  });
}

async function logger() {
  try {
    const data = await getUserDetails();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

logger();
