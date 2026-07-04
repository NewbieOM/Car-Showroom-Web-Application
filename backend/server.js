const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });




// 1️⃣ Import packages
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

// 2️⃣ Initialize express app FIRST
const app = express();

// 3️⃣ Middlewares
app.use(cors());
app.use(express.json());


app.use("/uploads", express.static("uploads"));



// 4️⃣ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Teju@2510",
  database: "car_showroom",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }
  console.log("MySQL connected successfully");
});



app.get("/cars", (req, res) => {
  const sql = "SELECT * FROM cars";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("FETCH CARS ERROR:", err); // 🔥 IMPORTANT
      return res.status(500).json([]);
    }

    res.json(result);
  });
});
















// Get all services API
app.get("/services", (req, res) => {
  const sql = "SELECT * FROM services";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});


// Get all reviews API
app.get("/reviews", (req, res) => {
  const sql = "SELECT * FROM reviews";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});


// Featured Cars API
app.get("/featured-cars", (req, res) => {
  db.query("SELECT * FROM featured_cars", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});



const bcrypt = require("bcryptjs");

// ================= SIGNUP =================
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  // encrypt password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json(err);
    }

    res.json({ message: "Signup successful" });
  });
});







// ================= LOGIN API =================

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result[0];

    // ✅ bcrypt password check
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ success: false, message: "Wrong password" });
    }

    // ✅ LOGIN SUCCESS
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
});

// ================= Reset API =================

app.post("/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const sql = "UPDATE users SET password = ? WHERE email = ?";

  db.query(sql, [hashedPassword, email], (err, result) => {
    if (err) return res.json({ message: "Server error" });

    if (result.affectedRows === 0) {
      return res.json({ message: "Email not found" });
    }

    res.json({ message: "Password reset successful" });
  });
});



// ================= CONTACT FORM =================
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  const sql = `
    INSERT INTO contact_messages (name, email, phone, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, message], (err) => {
    if (err) {
      console.error(err);
      return res.json({ success: false });
    }

    res.json({ success: true, message: "Message sent successfully!" });
  });
});


// ================= TEST DRIVE =================


app.post("/book-test-drive", (req, res) => {
  const { userId, carName } = req.body;

  console.log("Received:", userId, carName); // 🔍 DEBUG

  if (!userId || !carName) {
    return res.status(400).json({ message: "Missing data" });
  }

  const sql =
    "INSERT INTO test_drives (user_id, car_name) VALUES (?, ?)";

  db.query(sql, [userId, carName], (err) => {
    if (err) {
      console.error("DB Error:", err); // 🔴 VERY IMPORTANT
      return res.status(500).json({ message: "Booking failed" });
    }

    res.json({ message: "Test drive booked successfully!" });
  });
});



// ===============================
// ADMIN – VIEW TEST DRIVES
// ===============================

app.get("/admin/test-drives", (req, res) => {

  const sql = `
    SELECT 
      test_drives.id,
      users.name AS user_name,
      users.email AS user_email,
      test_drives.car_name,
      test_drives.created_at
    FROM test_drives
    JOIN users ON test_drives.user_id = users.id
    ORDER BY test_drives.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    res.json({ success: true, data: results });
  });
});




// ================= SAVE BOOKING =================

app.post("/buy-car", (req, res) => {
    const {
        userId,
        carName,
        fullName,
        email,
        mobile,
        city,
        paymentMethod
    } = req.body;

    const sql = `
        INSERT INTO car_bookings
        (user_id, car_name, full_name, email, mobile, city, payment_method)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [userId, carName, fullName, email, mobile, city, paymentMethod],
        (err) => {
            if (err) {
                console.error(err);
                return res.json({ success: false });
            }
            res.json({ success: true, message: "Booking saved" });
        }
    );
});

// ================= API for ADMIN to VIEW bookings  =================


app.get("/admin/bookings", (req, res) => {
    db.query("SELECT * FROM car_bookings ORDER BY created_at DESC", (err, rows) => {
        if (err) return res.json([]);
        res.json(rows);
    });
});




// ================= ADMIN CHECK =================
const isAdmin = (req, res, next) => {
  console.log("Role header:", req.headers.role); // debug

  if (req.headers.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied" });
  }

  next();
};



app.post("/admin/cars", isAdmin, upload.single("image"), (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price, fuel_type } = req.body;

    if (!name || !price || !fuel_type) {
      return res.json({ success: false, message: "Missing data" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Image not received" });
    }

    const image = req.file.filename;

    db.query(
      "INSERT INTO cars (name, price, image, fuel_type) VALUES (?, ?, ?, ?)",
      [name, price, image, fuel_type],
      (err) => {
        if (err) {
          console.error("DB ERROR:", err);
          return res.status(500).json({ success: false });
        }

        res.json({ success: true });
      }
    );

  } catch (error) {
    console.error("SERVER CRASH:", error);
    res.status(500).json({ success: false });
  }
});


// app.post("/admin/cars", isAdmin, upload.single("image"), (req, res) => {

//   console.log("BODY:", req.body);
//   console.log("FILE:", req.file);

//   const { name, price, fuel_type } = req.body;

//   // 🔥 SAFE CHECK
//   if (!req.file) {
//     console.log("❌ FILE NOT RECEIVED");
//     return res.json({ success: false, message: "Image not received" });
//   }

//   const image = req.file.filename;

//   db.query(
//     "INSERT INTO cars (name, price, image, fuel_type) VALUES (?, ?, ?, ?)",
//     [name, price, image, fuel_type],
//     (err) => {
//       if (err) {
//         console.error("DB ERROR:", err);
//         return res.status(500).json({ success: false });
//       }

//       res.json({ success: true });
//     }
//   );
// });






// DELETE CAR
app.delete("/admin/cars/:id", isAdmin, (req, res) => {
  db.query("DELETE FROM cars WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});






// USERS****************************************


app.get("/admin/users", isAdmin, (req, res) => {
  db.query("SELECT id, name, email FROM users", (err, data) => res.json(data));
});



app.delete("/admin/users/:id", isAdmin, (req, res) => {
  const userId = req.params.id;

  console.log("Deleting user:", userId); // DEBUG

  db.query("DELETE FROM users WHERE id=?", [userId], (err) => {
    if (err) {
      console.error("DELETE ERROR:", err);
      return res.status(500).json({ success: false });
    }

    res.json({ success: true });
  });
});





// SERVICES************************************

// GET SERVICES
app.get("/admin/services", isAdmin, (req, res) => {
  db.query("SELECT * FROM services ORDER BY id DESC", (err, data) => {
    if (err) return res.json([]);
    res.json(data);
  });
});


// ADD SERVICE
app.post("/admin/services", isAdmin, (req, res) => {
  const { title, description } = req.body;

  console.log("Incoming Service:", req.body);

  if (!title || !description) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  db.query(
    "INSERT INTO services (title, description) VALUES (?, ?)",
    [title, description],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true });
    }
  );
});


// DELETE SERVICE
app.delete("/admin/services/:id", isAdmin, (req, res) => {
  db.query("DELETE FROM services WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});








// REVIEWS
app.get("/admin/reviews", isAdmin, (req, res) => {
  db.query("SELECT * FROM reviews", (err, data) => res.json(data));
});

// app.delete("/admin/reviews/:id", isAdmin, (req, res) => {
//   db.query("DELETE FROM reviews WHERE id=?", [req.params.id], () => res.send("Deleted"));
// });


app.delete("/admin/reviews/:id", isAdmin, (req, res) => {
  db.query("DELETE FROM reviews WHERE id=?", [req.params.id], (err) => {
    
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    res.json({ success: true }); // ✅ FIXED
  });
});





// CONTACT
app.get("/admin/contact-messages", isAdmin, (req, res) => {
  db.query("SELECT * FROM contact_messages", (err, data) => res.json(data));
});

app.post("/admin/reply", isAdmin, (req, res) => {
  const { id, reply } = req.body;

  console.log("Reply request:", id, reply); // 🔥 DEBUG

  if (!id || !reply) {
    return res.status(400).json({ success: false });
  }

  db.query(
    "UPDATE contact_messages SET reply=? WHERE id=?",
    [reply, id],
    (err) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true });
    }
  );
});



app.post("/admin/reply", isAdmin, (req, res) => {
  const { id, reply } = req.body;

  db.query(
    "UPDATE contact_messages SET reply=? WHERE id=?",
    [reply, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.json({ success: false });
      }

      res.json({ success: true });
    }
  );
});


// 6️⃣ Start server (LAST)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
