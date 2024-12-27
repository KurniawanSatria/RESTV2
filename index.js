const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
const { fileURLToPath } = require("url");
const apiRoutes = require("./routes/api.js");



const app = express();
const PORT = process.env.PORT || 2008;

app.set("port", PORT);
app.set("json spaces", 2);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views'), { maxAge: '1d' }));

app.enable('trust proxy'); // Untuk mendapatkan alamat IP pengguna dengan benar di balik proxy
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/audio", (req, res) => {
  res.render('audio');
});

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
