const express = require("express");
const cors = require("cors");

const app = express();
const ApiError = require("./app/middleware/api-error");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the borrow book application.",
  });
});

const sachRouter = require("./app/routes/sach.route");
app.use("/api/sach", sachRouter);

const nxbRouter = require("./app/routes/nxb.route");
app.use("/api/nxb", nxbRouter);

const managerRouter = require("./app/routes/nhanvien.route");
app.use("/api/nhanvien", managerRouter);

const userRouter = require("./app/routes/docgia.route");
app.use("/api/docgia", userRouter);

const muonSachRouter = require("./app/routes/muonsach.route");
app.use("/api/muonsach", muonSachRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});
module.exports = app;
