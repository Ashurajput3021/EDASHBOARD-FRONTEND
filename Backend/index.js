const express = require("express");
const User = require("./db/User");
require("./db/config");
const cors = require("cors");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const jwtKey = "e-comm";

// Register
app.post("/register", async (req, res) => {
  let newUser = new User(req.body);
  let result = await newUser.save();
  result = result.toObject();
  delete result.password;

  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) return res.send({ result: "Something went wrong" });
    res.send({ result, auth: token });
  });
});

// Login
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body).select("-password");
  if (user) {
    Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) return res.send({ result: "Something went wrong" });
      res.send({ user, auth: token });
    });
  } else {
    res.status(404).send({ error: "User not found" });
  }
});

// Product Routes (secured)
app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  res.send(products.length ? products : { result: "No products found" });
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  res.send(result || { result: "No Record Found..." });
});

app.put("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// ✅ Fixed Profile Update Route
app.put("/profile/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, result: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Token Middleware
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) return res.status(401).send({ result: "Invalid Token" });
      next();
    });
  } else {
    res.status(403).send({ result: "Token required" });
  }
}

// Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
