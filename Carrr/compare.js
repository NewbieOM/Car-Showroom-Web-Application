// 📊 Car data for compare section

const carData = {

    "mercedes-g": {
        name: "mercedes-g",
        price: "₹2,20,00,000",        // approximate India on-road estimate
        engine: "4.0L V8 BiTurbo",
        fuel: "Petrol",
        transmission: "Automatic",
        mileage: "8 km/l",
        topSpeed: "230 km/h"
    },

    "fortuner": {
        name: "fortuner",
        price: "₹41,00,000",          // typical mid-range India price
        engine: "2.8L Diesel / 2.7L Petrol",
        fuel: "Diesel / Petrol",
        transmission: "Automatic / Manual",
        mileage: "10–14 km/l",
        topSpeed: "180 km/h"
    },

    "bmw-m2": {
        name: "bmw-m2",
        price: "₹1,03,00,000",        // India starting price ~₹1.03 Cr :contentReference[oaicite:1]{index=1}
        engine: "3.0L Turbo I6",
        fuel: "Petrol",
        transmission: "Automatic / Manual",
        mileage: "10.19 km/l",        // ARAI figure :contentReference[oaicite:2]{index=2}
        topSpeed: "250 km/h"
    },

    "mercedes-glk": {
        name: "mercedes-glk",
        price: "₹45,00,000",          // approximate historic India price
        engine: "2.1L Diesel / 3.0L Petrol",
        fuel: "Diesel / Petrol",
        transmission: "Automatic",
        mileage: "12–15 km/l",
        topSpeed: "210 km/h"
    },

    "lotus-evija": {
        name: "lotus-evija",
        price: "₹40,00,00,000",       // expected ~₹40 Cr launch price :contentReference[oaicite:3]{index=3}
        engine: "Electric (4 motors)",
        fuel: "Electric",
        transmission: "Single Speed",
        mileage: "N/A (Electric)",
        topSpeed: "320+ km/h"
    },

    "hilux": {
        name: "hilux",
        price: "₹35,00,000",          // approximate India price
        engine: "2.8L Diesel",
        fuel: "Diesel",
        transmission: "Manual / Automatic",
        mileage: "10–12 km/l",
        topSpeed: "175 km/h"
    },

    "tiguan": {
        name: "tiguan",
        price: "₹33,00,000",          // India mid-range price
        engine: "2.0L TSI Petrol",
        fuel: "Petrol",
        transmission: "Automatic",
        mileage: "13–15 km/l",
        topSpeed: "190 km/h"
    },

    "tata-sierra": {
        name: "tata-sierra",
        price: "₹20,00,000",          // range from ~₹11.49–25.28 lakh :contentReference[oaicite:4]{index=4}
        engine: "1.5L Turbo Petrol/Diesel",
        fuel: "Petrol / Diesel",
        transmission: "Manual / Automatic",
        mileage: "15–18 km/l",
        topSpeed: "190 km/h"
    }
}

// // load selected cars
// const selectedCars = JSON.parse(localStorage.getItem("compareCars"));

// if (!selectedCars || selectedCars.length !== 2) {
//     window.location.href = "index.html";
// }

// const [car1, car2] = selectedCars;

// document.getElementById("car1-name").innerHTML =
//     `<img src="${carData[car1].image}" height="80"><br>${carData[car1].name}`;

// document.getElementById("car2-name").innerHTML =
//     `<img src="${carData[car2].image}" height="80"><br>${carData[car2].name}`;

// const compareBody = document.getElementById("compare-body");
// const features = ["price", "engine", "fuel", "transmission", "mileage", "topSpeed"];

// features.forEach(feature => {
//     compareBody.innerHTML += `
//         <tr>
//             <td>${feature.toUpperCase()}</td>
//             <td>${carData[car1][feature]}</td>
//             <td>${carData[car2][feature]}</td>
//         </tr>
//     `;
// });

// function goBack() {
//     localStorage.removeItem("compareCars");
//     window.location.href = "index.html";
// }



const cars = JSON.parse(localStorage.getItem("compareCars"));

if (!cars || cars.length !== 2) {
  alert("Please select 2 cars to compare");
  window.location.href = "index.html";
}

const car1 = carData[cars[0]];
const car2 = carData[cars[1]];

document.getElementById("car1-name").innerText = car1.name;
document.getElementById("car2-name").innerText = car2.name;

const tbody = document.getElementById("compare-body");
const features = ["price", "engine", "fuel", "transmission", "mileage", "topSpeed"];

features.forEach(feature => {
  tbody.innerHTML += `
    <tr>
      <td>${feature.toUpperCase()}</td>
      <td>${car1[feature]}</td>
      <td>${car2[feature]}</td>
    </tr>
  `;
});

function goBack() {
  localStorage.removeItem("compareCars");
  window.location.href = "index.html#featured";
}

