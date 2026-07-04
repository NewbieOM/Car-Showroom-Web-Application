let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

document.querySelector('#login-btn').onclick = () => {
    document.querySelector('.login-form-container').classList.toggle('active');
}

document.querySelector('#close-login-form ').onclick = () => {
    document.querySelector('.login-form-container').classList.remove('active');
}



window.onscroll = () => {

    if (window.scrollY > 0) {
        document.querySelector('.header').classList.add('active');
    } else {
        document.querySelector('.header').classList.remove('active');
    }

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}


window.onload = () => {
    if (window.scrollY > 0) {
        document.querySelector('.header').classList.add('active');
    } else {
        document.querySelector('.header').classList.remove('active');
    }

}

document.querySelector('.home').onmousemove = (e) => {

    document.querySelectorAll('.home-parallax').forEach(elm => {

        let speed = elm.getAttribute('data-speed');

        let x = (window.innerWidth - e.pageX * speed) / 90;
        let y = (window.innerHeight - e.pageY * speed) / 90;

        elm.style.transform = `translateX(${y}px) translateY(${y}px)`;

    });
};

document.querySelector('.home').onmouseleave = () => {

    document.querySelectorAll('.home-parallax').forEach(elm => {

        elm.style.transform = `translateX(0px) translateY(0px)`;

    });
};

fetch("http://localhost:3000/cars")
    .then(res => res.json())
    .then(cars => {
        const container = document.getElementById("carsContainer");
        container.innerHTML = "";

        cars.forEach(car => {
            const carCard = `
        <div class="swiper-slide box">
          <img src="${car.image}" alt="${car.name}">
          <div class="content">
            <h3>${car.name}</h3>
            <p>${car.fuel}</p>
            <div class="price">${car.price}</div>
            <button class="btn buy-now-btn" data-car="${car.car_key}">
  Buy Now
</button>

          </div>
        </div>
      `;

            container.innerHTML += carCard;
        });

        // 🔁 IMPORTANT: Re-initialize swiper AFTER data loads
        new Swiper(".vehicles-slider", {
            loop: true,
            centeredSlides: true,
            grabCursor: true,
            spaceBetween: 20,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
        initBuyNowButtons();

    })
    .catch(err => {
        console.error("Failed to load cars:", err);
    });


// ================= BOOK NOW POPUP =================













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



function showComparison(car1, car2) {
    compareContainer.classList.remove("hidden");
    compareBody.innerHTML = "";

    document.getElementById("car1-name").innerText = carData[car1].name;
    document.getElementById("car2-name").innerText = carData[car2].name;

    const features = ["price", "engine", "fuel", "transmission", "mileage", "topSpeed"];

    features.forEach(feature => {
        const row = `
            <tr>
                <td>${feature.toUpperCase()}</td>
                <td>${carData[car1][feature]}</td>
                <td>${carData[car2][feature]}</td>
            </tr>
        `;
        compareBody.innerHTML += row;
    });

    // 🔽 Scroll to compare section
    document.getElementById("compare").scrollIntoView({ behavior: "smooth" });

    // 🔄 AUTO RESET AFTER COMPARISON
    setTimeout(() => {
        // Hide compare section
        compareContainer.classList.add("hidden");

        // Clear selected cars
        selectedCars = [];

        // Reset checkboxes
        checkboxes.forEach(box => {
            box.checked = false;
            box.disabled = false;
            box.closest(".compare-check").classList.remove("disabled");
        });
    }, 4000); // ⏱️ 4 seconds (you can change)
}




// ================= TEST DRIVE MODAL =================

const testDriveContainer = document.getElementById("test-drive-container");
const testCarInput = document.getElementById("testCarName");


// Close test drive modal
document.getElementById("close-test-drive").onclick = () => {
    testDriveContainer.classList.remove("active");
    document.getElementById("testDriveForm").reset();
};




// ===============================
// SUBMIT TEST DRIVE → DATABASE
// ===============================

document.getElementById("testDriveForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const carName = document.getElementById("testCarName").value;

    if (!user) {
        alert("Please login first");
        return;
    }

    fetch("http://localhost:3000/book-test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: user.id,
            carName: carName
        })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            document.getElementById("test-drive-container").classList.remove("active");
            e.target.reset();
        })
        .catch(() => alert("Booking failed"));
});





// Back to main page from test drive popup
document.querySelector(".back-btn").addEventListener("click", () => {
    testDriveContainer.classList.remove("active");
    document.getElementById("testDriveForm").reset();
});






// ===============================
// LOAD SERVICES DYNAMICALLY
// ===============================

fetch("http://localhost:3000/services")
    .then(res => res.json())
    .then(services => {
        const container = document.getElementById("servicesContainer");
        container.innerHTML = "";

        services.forEach(service => {
            const serviceHTML = `
        <div class="box">
          <i class="${service.icon}"></i>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </div>
      `;

            container.innerHTML += serviceHTML;
        });
    })
    .catch(err => {
        console.error("Error loading services:", err);
    });


// ===============================
// LOAD REVIEWS DYNAMICALLY
// ===============================

fetch("http://localhost:3000/reviews")
    .then(res => res.json())
    .then(reviews => {
        const container = document.getElementById("reviewsContainer");
        container.innerHTML = "";

        reviews.forEach(review => {

            // ⭐ generate stars dynamically
            let starsHTML = "";
            const fullStars = Math.floor(review.rating);
            const halfStar = review.rating % 1 !== 0;

            for (let i = 0; i < fullStars; i++) {
                starsHTML += `<i class="fas fa-star"></i>`;
            }

            if (halfStar) {
                starsHTML += `<i class="fas fa-star-half-alt"></i>`;
            }

            const reviewHTML = `
        <div class="swiper-slide box">
          <img src="${review.image}" alt="${review.client_name}">
          <div class="content">
            <p>${review.review}</p>
            <h3>${review.client_name}</h3>
            <div class="stars">
              ${starsHTML}
            </div>
          </div>
        </div>
      `;

            container.innerHTML += reviewHTML;
        });

        // 🔁 IMPORTANT: initialize swiper AFTER data loads
        new Swiper(".reviews-slider", {
            loop: true,
            centeredSlides: true,
            grabCursor: true,
            spaceBetween: 20,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".pagination-3",
                clickable: true,
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    })
    .catch(err => {
        console.error("Error loading reviews:", err);
    });




// ===============================
// LOAD FEATURED CARS DYNAMICALLY
// ===============================

fetch("http://localhost:3000/featured-cars")
    .then(res => res.json())
    .then(cars => {

        const container1 = document.getElementById("featuredContainer1");
        const container2 = document.getElementById("featuredContainer2");

        container1.innerHTML = "";
        container2.innerHTML = "";

        cars.forEach((car, index) => {

            const carHTML = `
        <div class="swiper-slide box" data-car="${car.car_key}">
          <img src="${car.image}" alt="${car.name}">
          <h3>${car.name}</h3>

          <label class="compare-check">
            <input type="checkbox" class="compare-box">
            Compare
          </label>

          <button class="btn test-drive-btn" data-car="${car.car_key}">
            Book Test Drive
          </button>

          <div class="stars">
            ${generateStars(car.rating)}
          </div>

          <div class="price">${car.price}</div>
         <button class="btn buy-now-btn" data-car="${car.car_key}">
  Buy Now
</button>

        </div>
      `;

            // first 4 → slider 1, rest → slider 2
            if (index < 4) {
                container1.innerHTML += carHTML;
            } else {
                container2.innerHTML += carHTML;
            }
        });

        // INIT BOTH SWIPERS AFTER DATA LOAD
        new Swiper(".slider-1", {
            loop: true,
            grabCursor: true,
            spaceBetween: 20,
            autoplay: { delay: 9500 },
            pagination: { el: ".pagination-1", clickable: true },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });

        new Swiper(".slider-2", {
            loop: true,
            grabCursor: true,
            spaceBetween: 20,
            autoplay: { delay: 9500 },
            pagination: { el: ".pagination-2", clickable: true },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
        initBuyNowButtons();

    })
    .catch(err => console.error("Featured cars error:", err));


// ⭐ helper function for stars
function generateStars(rating) {
    let stars = "";
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    for (let i = 0; i < full; i++) {
        stars += `<i class="fas fa-star"></i>`;
    }
    if (half) {
        stars += `<i class="fas fa-star-half-alt"></i>`;
    }
    return stars;
}




// ===============================
// COMPARE FEATURE (EVENT DELEGATION)
// ===============================

let selectedCars = [];

document.addEventListener("change", function (e) {
    if (!e.target.classList.contains("compare-box")) return;

    const currentBox = e.target;
    const carBox = currentBox.closest(".box");
    const carKey = carBox.dataset.car;

    if (currentBox.checked) {
        if (selectedCars.length >= 2) {
            currentBox.checked = false;
            return;
        }
        selectedCars.push(carKey);
    } else {
        selectedCars = selectedCars.filter(c => c !== carKey);
    }

    // ✅ When 2 cars selected
    if (selectedCars.length === 2) {

        document.querySelectorAll(".compare-check").forEach(label => {
            label.style.pointerEvents = "none"; // disable clicking
            label.style.opacity = "0.4";        // faded look
        });

        // Save & redirect
        localStorage.setItem("compareCars", JSON.stringify(selectedCars));
        window.location.href = "compare.html";

        // 🔄 RESET after redirect trigger
        resetCompare();


    }
});

function resetCompare() {
    selectedCars = [];

    document.querySelectorAll(".compare-box").forEach(box => {
        box.checked = false;
        box.disabled = false;
    });

    document.querySelectorAll(".compare-check").forEach(label => {
        label.style.display = "block";
    });
}



// ===============================
// USER-ONLY TEST DRIVE MODAL OPEN
// ===============================

document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("test-drive-btn")) return;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login to book a test drive");
        document.querySelector(".login-form-container").classList.add("active");
        return;
    }

    const carName = e.target.dataset.car;
    testCarInput.value = carName;
    testDriveContainer.classList.add("active");
});








// ===============================
// LOGIN AND SIGNUP
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const loginBox = document.querySelector(".login-form-container");
    const signupBox = document.querySelector(".signup-form-container");
    const forgotBox = document.querySelector(".forgot-form-container");


    // open login
    document.getElementById("login-btn").onclick = () => {
        loginBox.classList.add("active");
    };

    // close login
    document.getElementById("close-login-form").onclick = () => {
        loginBox.classList.remove("active");
    };

    // open signup
    document.getElementById("showSignup").onclick = () => {
        loginBox.classList.remove("active");
        signupBox.classList.add("active");
    };

    // back to login
    document.getElementById("showLogin").onclick = () => {
        signupBox.classList.remove("active");
        loginBox.classList.add("active");
    };

    // close signup
    document.getElementById("close-signup-form").onclick = () => {
        signupBox.classList.remove("active");
    };

    //forgot popup
    document.querySelector(".forget-link").onclick = () => {
        loginBox.classList.remove("active");
        forgotBox.classList.add("active");
    };

    document.getElementById("close-forgot-form").onclick = () => {
        forgotBox.classList.remove("active");
    };

    // ================= SIGNUP =================
    document.getElementById("signupForm").addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })

        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                signupBox.classList.remove("active");
                loginBox.classList.add("active");
            })
            .catch(() => alert("Signup failed"));
    });

    // ================= LOGIN =================
    document.getElementById("loginForm").addEventListener("submit", e => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })

        })
            .then(res => res.json())
            // .then(data => {
            //     if (data.success) {
            //         alert("Welcome " + data.user.name);
            //         loginBox.classList.remove("active");
            //         localStorage.setItem("user", JSON.stringify(data.user));
            //     } else {
            //         alert(data.message);
            //     }
            // })

            .then(data => {
                if (data.success) {
                    alert("Welcome " + data.user.name);

                    // Save user
                    localStorage.setItem("user", JSON.stringify(data.user));

                    // Close login popup
                    loginBox.classList.remove("active");

                    // 🔥 IMPORTANT: reload page to update navbar
                    location.reload();
                } else {
                    alert(data.message);
                }
            })

            .catch(() => alert("Login failed"));
    });

});

// ================= forgot =================

document.getElementById("forgotForm").addEventListener("submit", e => {
    e.preventDefault();

    fetch("http://localhost:3000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: forgotEmail.value,
            newPassword: newPassword.value
        })
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            document.querySelector(".forgot-form-container").classList.remove("active");
            document.querySelector(".login-form-container").classList.add("active");
        });
});



// ================= CONTACT FORM =================
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: contactName.value.trim(),
            email: contactEmail.value.trim(),
            phone: contactPhone.value.trim(),
            message: contactMessage.value.trim()
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("✅ Message sent successfully!");
                this.reset();
            } else {
                alert("❌ Failed to send message");
            }
        })
        .catch(() => alert("❌ Server error"));
});


/// ===============================
// LOGIN STATE + LOGOUT BUTTON
// ===============================

const user = JSON.parse(localStorage.getItem("user"));
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

// If user is logged in
if (user) {
    // Change Login → Hi, Name (same button design)
    loginBtn.innerText = `Hi, ${user.name}`;

    // Prevent login popup from opening again
    loginBtn.onclick = () => {
        alert(`You are logged in as ${user.name}`);
    };

    // Show logout button
    logoutBtn.style.display = "inline-block";
}

// Logout click
logoutBtn.onclick = () => {
    localStorage.removeItem("user");
    location.reload(); // reset UI cleanly
};


/// ===============================
// BUY NOW POPUP (FINAL FIX)
// ===============================


// ===============================
// BOOK CAR FORM → SAVE TO DATABASE
// ===============================

document.getElementById("bookCarForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login again");
        return;
    }

    const form = this;

    const bookingData = {
        userId: user.id,
        carName: document.getElementById("bookCarName").value,
        fullName: form.querySelector('input[placeholder="Full Name"]').value,
        email: form.querySelector('input[placeholder="Email"]').value,
        mobile: form.querySelector('input[placeholder="Mobile Number"]').value,
        city: form.querySelector('input[placeholder="City"]').value,
        paymentMethod: form.querySelector("select").value
    };

    fetch("http://localhost:3000/buy-car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {

                // close booking popup
                document.getElementById("book-car-container").classList.remove("active");

                // show success popup
                document.getElementById("booking-success-popup").classList.add("active");

                form.reset();

            } else {
                alert("❌ Booking failed. Please try again.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("❌ Server error. Try again later.");
        });
});


// close success popup
document.getElementById("close-success-popup").onclick = () => {
    document.getElementById("booking-success-popup").classList.remove("active");
};




function initBuyNowButtons() {
    const buyCarContainer = document.getElementById("book-car-container");
    const buyCarNameInput = document.getElementById("bookCarName");

    document.querySelectorAll(".buy-now-btn").forEach(btn => {
        btn.onclick = () => {
            const carKey = btn.dataset.car;
            if (!carKey) return; // ignore swiper clones

            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                alert("Please login to buy a car");
                document.getElementById("login-btn").click();
                return;
            }

            buyCarNameInput.value = carKey.replace(/-/g, " ").toUpperCase();
            buyCarContainer.classList.add("active");
        };
    });

    document.getElementById("close-book-car").onclick = () => {
        buyCarContainer.classList.remove("active");
        document.getElementById("bookCarForm").reset();
    };

    buyCarContainer.querySelector(".back-btn").onclick = () => {
        buyCarContainer.classList.remove("active");
        document.getElementById("bookCarForm").reset();
    };
}
