var express = require("express");
var router = express.Router();

const { auth, chartVisitors } = require("./controller");

/* GET home page. */
router.get("/visitors/chart", chartVisitors);
router.post("/auth", auth);

module.exports = router;
