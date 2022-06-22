const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = new express();

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/images", express.static("images"));
app.use(express.static("public"));
app.use("/docs", express.static("docs"));

const port = process.env.PORT || 5001;

const server = app.listen(port, () => {
  console.log("Server running at Port ", port);
});

// importing our routes for api

const db = require("./config/keys").mongoURI;
const veterans = require("./routes/api/Veteran");
const organizations = require("./routes/api/Organization");
const posts = require("./routes/api/Post");
const events = require("./routes/api/CommunityEvent");

mongoose.connect(db, () => {
  console.log("Connected to MongoDB :)");
});

app.use("/veterans", veterans);
app.use("/organizations", organizations);
app.use("/posts", posts);
app.use("/events", events);
