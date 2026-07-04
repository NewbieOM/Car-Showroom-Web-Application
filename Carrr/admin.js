// function showSection(section) {
//   document.querySelectorAll("section").forEach(s => s.style.display = "none");

//   if (section === "test") document.getElementById("testSection").style.display = "block";
//   if (section === "booking") document.getElementById("bookingSection").style.display = "block";
//   if (section === "cars") loadCars();
//   if (section === "services") loadServices();
//   if (section === "users") loadUsers();
//   if (section === "reviews") loadReviews();
//   if (section === "messages") loadMessages();
// }







// ===============================
// LOAD TEST DRIVE BOOKINGS (ADMIN)
// ===============================

// fetch("http://localhost:3000/admin/test-drives")
//   .then(res => res.json())
//   .then(data => {

//     if (!data.success) {
//       alert("Failed to load test drives");
//       return;
//     }

//     const tbody = document.querySelector("#testDriveTable tbody");
//     tbody.innerHTML = "";

//     data.data.forEach((item, index) => {

//       const row = `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${item.user_name}</td>
//           <td>${item.user_email}</td>
//           <td>${item.car_name}</td>
//           <td>${new Date(item.created_at).toLocaleString()}</td>
//         </tr>
//       `;

//       tbody.innerHTML += row;
//     });
//   })
//   .catch(() => alert("Server error"));



// Car Bookings


// fetch("http://localhost:3000/admin/bookings")
// .then(res => res.json())
// .then(bookings => {
//     const tbody = document.querySelector("#bookingTable tbody");

//     bookings.forEach(b => {
//         const row = `
//           <tr>
//             <td>${b.id}</td>
//             <td>${b.car_name}</td>
//             <td>${b.full_name}</td>
//             <td>${b.email}</td>
//             <td>${b.mobile}</td>
//             <td>${b.city}</td>
//             <td>${b.payment_method}</td>
//             <td>${new Date(b.created_at).toLocaleString()}</td>
//           </tr>
//         `;
//         tbody.innerHTML += row;
//     });
// });









//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user || user.role !== "admin") {
//     alert("Access denied");
//     window.location.href = "index.html";
// }


//   function showSection(section) {
//   document.querySelectorAll("section").forEach(s => s.style.display = "none");

//   if (section === "test") document.getElementById("testSection").style.display = "block";
//   if (section === "booking") document.getElementById("bookingSection").style.display = "block";
//   if (section === "cars") loadCars();
//   if (section === "services") loadServices();
//   if (section === "users") loadUsers();
//   if (section === "reviews") loadReviews();
//   if (section === "messages") loadMessages();
// }




// const headers = { role: "admin", "Content-Type": "application/json" };

// function loadCars() {
//   document.getElementById("carsSection").style.display = "block";

//   fetch("http://localhost:3000/cars")
//     .then(res => res.json())
//     .then(data => {
//       let html = "";
//       data.forEach(c => {
//         html += `
//           <div>
//             ${c.name} - ${c.price}
//             <button onclick="deleteCar(${c.id})">Delete</button>
//           </div>`;
//       });
//       document.getElementById("carsList").innerHTML = html;
//     });
// }

// function addCar() {
//   fetch("http://localhost:3000/admin/cars", {
//     method: "POST",
//     headers,
//     body: JSON.stringify({
//       name: carName.value,
//       brand: carBrand.value,
//       price: carPrice.value
//     })
//   }).then(loadCars);
// }

// function deleteCar(id) {
//   fetch(`http://localhost:3000/admin/cars/${id}`, {
//     method: "DELETE",
//     headers
//   }).then(loadCars);
// }

// const API = "http://localhost:3000";
// const headers = {
//   "Content-Type": "application/json",
//   "role": "admin"
// };

// function loadCars() {
//   fetch(API + "/cars")
//     .then(res => res.json())
//     .then(data => {
//       let html = "";

//       data.forEach(c => {
//         html += `
//           <div>
//             ${c.name} - ₹${c.price}
//             <button onclick="deleteCar(${c.id})">Delete</button>
//           </div>
//         `;
//       });

//       document.getElementById("carsList").innerHTML = html;
//     });
// }


// function addCar() {
//   const name = document.getElementById("carName").value;
//   const brand = document.getElementById("carBrand").value;
//   const price = document.getElementById("carPrice").value;

//   fetch(API + "/admin/cars", {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ name, brand, price })
//   })
//   .then(res => res.json())
//   .then(() => {
//     alert("Car Added ✅");
//     loadCars();
//   })
//   .catch(err => console.log(err));
// }

// DELETE CAR
// function deleteCar(id) {
//   fetch(API + "/admin/cars/" + id, {
//     method: "DELETE",
//     headers
//   })
//   .then(() => {
//     alert("Deleted ✅");
//     loadCars();
//   })
//   .catch(err => console.log(err));
// }




// function loadServices() {
//   document.getElementById("servicesSection").style.display = "block";

//   fetch("http://localhost:3000/admin/services", { headers })
//     .then(res => res.json())
//     .then(data => {
//       let html = "";
//       data.forEach(s => {
//         html += `
//           <div>
//             ${s.name}
//             <button onclick="deleteService(${s.id})">Delete</button>
//           </div>`;
//       });
//       servicesList.innerHTML = html;
//     });
// }

// function addService() {
//   fetch("http://localhost:3000/admin/services", {
//     method: "POST",
//     headers,
//     body: JSON.stringify({
//       name: sName.value,
//       description: sDesc.value,
//       price: sPrice.value
//     })
//   }).then(loadServices);
// }

// function deleteService(id) {
//   fetch(`http://localhost:3000/admin/services/${id}`, {
//     method: "DELETE",
//     headers
//   }).then(loadServices);
// }





// function loadUsers() {
//   document.getElementById("usersSection").style.display = "block";

//   fetch("http://localhost:3000/admin/users", { headers })
//     .then(res => res.json())
//     .then(data => {
//       let html = "";
//       data.forEach(u => {
//         html += `<div>${u.name} - ${u.email}</div>`;
//       });
//       usersList.innerHTML = html;
//     });
// }







// function loadReviews() {
//   document.getElementById("reviewsSection").style.display = "block";

//   fetch("http://localhost:3000/admin/reviews", { headers })
//     .then(res => res.json())
//     .then(data => {
//       let html = "";
//       data.forEach(r => {
//         html += `
//           <div>
//             ${r.message}
//             <button onclick="deleteReview(${r.id})">Delete</button>
//           </div>`;
//       });
//       reviewsList.innerHTML = html;
//     });
// }

// function deleteReview(id) {
//   fetch(`http://localhost:3000/admin/reviews/${id}`, {
//     method: "DELETE",
//     headers
//   }).then(loadReviews);
// }






// function loadMessages() {
//   document.getElementById("messagesSection").style.display = "block";

//   fetch("http://localhost:3000/admin/contact-messages", { headers })
//     .then(res => res.json())
//     .then(data => {
//       let html = "";
//       data.forEach(m => {
//         html += `<div>${m.name}: ${m.message}</div>`;
//       });
//       messagesList.innerHTML = html;
//     });
// }




// ================= ADMIN ACCESS CHECK =================
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
  alert("Access denied");
  window.location.href = "index.html";
}

// ================= GLOBAL CONFIG =================
const API = "http://localhost:3000";

const headers = {
  "Content-Type": "application/json",
  "role": "admin"
};

// ================= SECTION SWITCH =================
function showSection(section) {
  document.querySelectorAll("section").forEach(s => s.style.display = "none");

  if (section === "test") {
    document.getElementById("testSection").style.display = "block";
  }

  if (section === "booking") {
    document.getElementById("bookingSection").style.display = "block";
  }

  if (section === "cars") {
    document.getElementById("carsSection").style.display = "block";
    loadCars(); // 🔥 FIXED
  }

  if (section === "services") {
    document.getElementById("servicesSection").style.display = "block";
    loadServices();
  }

  if (section === "users") {
    document.getElementById("usersSection").style.display = "block";
    loadUsers();
  }

  if (section === "reviews") {
    document.getElementById("reviewsSection").style.display = "block";
    loadReviews();
  }

  if (section === "messages") {
    document.getElementById("messagesSection").style.display = "block";
    loadMessages();
  }
}

// ================= TEST DRIVES =================
fetch(API + "/admin/test-drives")
  .then(res => res.json())
  .then(data => {
    if (!data.success) return alert("Failed to load test drives");

    const tbody = document.querySelector("#testDriveTable tbody");
    tbody.innerHTML = "";

    data.data.forEach((item, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.user_name}</td>
          <td>${item.user_email}</td>
          <td>${item.car_name}</td>
          <td>${new Date(item.created_at).toLocaleString()}</td>
        </tr>
      `;
    });
  })
  .catch(() => alert("Server error"));

// ================= BOOKINGS =================
fetch(API + "/admin/bookings")
  .then(res => res.json())
  .then(bookings => {
    const tbody = document.querySelector("#bookingTable tbody");
    tbody.innerHTML = "";

    bookings.forEach(b => {
      tbody.innerHTML += `
        <tr>
          <td>${b.id}</td>
          <td>${b.car_name}</td>
          <td>${b.full_name}</td>
          <td>${b.email}</td>
          <td>${b.mobile}</td>
          <td>${b.city}</td>
          <td>${b.payment_method}</td>
          <td>${new Date(b.created_at).toLocaleString()}</td>
        </tr>
      `;
    });
  });

// ================= CARS =================

// LOAD
function loadCars() {
  fetch(API + "/cars")
    .then(res => res.json())
    .then(data => {
      let html = "";

      data.forEach(c => {
        html += `
  <div class="car-card">
    <img src="${
      c.image && c.image.startsWith("http") || c.image?.startsWith("/Assets")
        ? c.image
        : "http://localhost:3000/uploads/" + c.image
    }" width="200" />

    <h3>${c.name}</h3>
    <p>₹${c.price}</p>
    <p>${c.fuel_type || ""}</p>

    <button onclick="deleteCar(${c.id})">Delete</button>
  </div>
`;
      });

      document.getElementById("carsList").innerHTML = html;
    });
}

// ADD
// function addCar() {
//   const name = document.getElementById("carName").value;
//   const price = document.getElementById("carPrice").value;

//   fetch(API + "/admin/cars", {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ name,  price })
//   })
//   .then(res => res.json())
//   .then(() => {
//     alert("Car Added ✅");
//     loadCars();
//   })
//   .catch(err => console.log(err));
// }

// function addCar() {
//   const name = document.getElementById("carName").value;
//   const price = document.getElementById("carPrice").value;

//   if (!name || !price) {
//     alert("Enter all fields");
//     return;
//   }

//   console.log("Sending car:", name, price); // 🔥 DEBUG

//   fetch("http://localhost:3000/admin/cars", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "role": "admin"
//     },
//     body: JSON.stringify({ name, price })
//   })


//     .then(res => res.json())
//     .then(data => {
//       console.log("Response:", data); // 🔥 DEBUG

//       if (data.success) {
//         alert("Car Added ✅");
//         loadCars();
//       } else {
//         alert("Failed to add car");
//       }
//     })
//     .catch(err => {
//       console.error("ERROR:", err);
//       alert("Server error");
//     });
// }


function addCar() {
  const name = document.getElementById("carName").value;
  const price = document.getElementById("carPrice").value;
  const image = document.getElementById("carImage").files[0];
  const fuel_type = document.getElementById("fuelType").value;

console.log(name, price, fuel_type, image);

  if (!name || !price || !image || !fuel_type) {
    alert("Fill all fields");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("image", image);
  formData.append("fuel_type", fuel_type);

  fetch("http://localhost:3000/admin/cars", {
    method: "POST",
    headers: {
      role: "admin"   // ✅ ONLY THIS (NO Content-Type)
    },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      console.log("Response:", data);

      if (data.success) {
        alert("Car Added ✅");
        loadCars();
      } else {
        alert("Failed ❌");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Server error ❌");
    });
}




function deleteCar(id) {
  console.log("Deleting:", id); // 🔥 DEBUG

  fetch(`http://localhost:3000/admin/cars/${id}`, {
    method: "DELETE",
    headers: {
      "role": "admin"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("Delete response:", data);

      if (data.success) {
        alert("Deleted ✅");
        loadCars();
      } else {
        alert("Delete failed");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Server error");
    });
}




// ================= SERVICES =================


function loadServices() {
  fetch("http://localhost:3000/admin/services", {
    headers: { role: "admin" }
  })
    .then(res => res.json())
    .then(data => {
      let html = "";

      data.forEach(s => {
        html += `
       <div class="card">
                <strong>${s.title}</strong> 
                <p>${s.description}</p>
                <button onclick="deleteService(${s.id})">Delete</button>
              </div>
      `;
      });

      document.getElementById("servicesList").innerHTML = html;
    })
    .catch(err => console.log(err));
}



function addService() {
  const title = document.getElementById("sName").value;
  const description = document.getElementById("sDesc").value;

  if (!title || !description) {
    alert("Fill all fields");
    return;
  }

  fetch("http://localhost:3000/admin/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "role": "admin"
    },
    body: JSON.stringify({ title, description })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Service Added ✅");
        loadServices();
      } else {
        alert("Failed ❌");
      }
    });
}


function deleteService(id) {
  if (!confirm("Are you sure you want to delete?")) return;

  fetch(`http://localhost:3000/admin/services/${id}`, {
    method: "DELETE",
    headers: {
      role: "admin"   // 🔥 THIS IS REQUIRED
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Deleted ✅");
        loadServices();
      } else {
        alert("Delete failed ❌");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Server error ❌");
    });
}




// ================= USERS =================
function loadUsers() {
  fetch(API + "/admin/users", { headers })
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(u => {
        html += `
  <div class="user-card">
    <div>
      <div class="user-name">${u.name}</div>
      <div class="user-email">${u.email}</div>
    </div>

    <button onclick="deleteUser(${u.id})" class="delete-btn">
      Delete
    </button>
  </div>
`;
      });
      document.getElementById("usersList").innerHTML = html;
    });
}



function deleteUser(id) {
  if (!confirm("Delete this user?")) return;

  fetch(API + "/admin/users/" + id, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("User Deleted ✅");
        loadUsers();
      } else {
        alert("Delete failed ❌");
      }
    })
    .catch(() => alert("Server error"));
}

// ================= REVIEWS =================


function loadReviews() {
  fetch(API + "/admin/reviews", { headers })
    .then(res => res.json())
    .then(data => {
      console.log("Reviews:", data); // 🔥 DEBUG

      let html = "";

      data.forEach(r => {
        html += `
          <div class="card">
            <p>${r.review}</p>  <!-- 🔥 CHANGE THIS FIELD -->
            <button onclick="deleteReview(${r.id})">Delete</button>
          </div>
        `;
      });

      document.getElementById("reviewsList").innerHTML = html;
    });
}




function deleteReview(id) {
  fetch(API + "/admin/reviews/" + id, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Deleted ✅");
        loadReviews();
      } else {
        alert("Delete failed ❌");
      }
    })
    .catch(() => alert("Server error"));
}



// ================= MESSAGES =================
function loadMessages() {
  fetch(API + "/admin/contact-messages", { headers })
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(m => {

        html += `
  <div class="msg-card">
    
    <div class="msg-left">
      <div class="msg-name">${m.name}</div>
      <div class="msg-text">${m.message}</div>
    </div>

    <div class="msg-right">
      <input type="text" id="reply-${m.id}" placeholder="Type reply..." />
      <button onclick="sendReply(${m.id})">Send</button>
    </div>

  </div>
`;
      });
      document.getElementById("messagesList").innerHTML = html;
    });
}



// function sendReply(id) {
//   const reply = document.getElementById("reply-" + id).value;

//   if (!reply) {
//     alert("Enter reply");
//     return;
//   }

//   fetch(API + "/admin/reply", {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ id, reply })
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.success) {
//       alert("Reply sent ✅");
//       loadMessages(); // reload
//     } else {
//       alert("Failed ❌");
//     }
//   });
// }

function sendReply(id) {
  const input = document.getElementById("reply-" + id);

  if (!input) {
    alert("Input not found ❌");
    return;
  }

  const reply = input.value;

  if (!reply) {
    alert("Enter reply");
    return;
  }

  fetch("http://localhost:3000/admin/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "role": "admin"
    },
    body: JSON.stringify({ id, reply })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Reply response:", data); // 🔥 DEBUG

      if (data.success) {
        alert("Reply sent ✅");
        loadMessages();
      } else {
        alert("Failed ❌");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Server error ❌");
    });
}









// ================= DEFAULT LOAD =================
showSection("test");