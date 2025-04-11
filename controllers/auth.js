const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const uploadsDir = path.join(__dirname, "../public/assets/berita");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("gambar");

exports.upload = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send(err);
    }

    const { judul_berita, penulis, date, isi } = req.body;
    const gambar = req.file ? req.file.filename : null;

    if (!judul_berita || !penulis || !date || !isi || !gambar) {
      return res.render("upload", {
        message: "Semua Harus Terisi",
      });
    }

    const query =
      "INSERT INTO berita (judul_berita, penulis, date, isi, gambar) VALUES (?, ?, ?, ?, ?)";

    db.query(
      query,
      [judul_berita, penulis, date, isi, gambar],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Internal Server Error");
        } else {
          console.log(results);
          res.redirect("/");
        }
      }
    );
  });
};

exports.login = (req, res) => {
  console.log(req.body);

  const { Username, Password } = req.body;

  db.query(
    "SELECT Username FROM tb_reglogin WHERE Username = ?",
    [Username],
    async (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      if (result.length > 0) {
        console.log(result);
        if (Username === "adminAnni" && Password === "pwpbannisa") {
          res.redirect("/DashAdmin");
        } else {
          res.redirect("/dashboard");
        }
      } else {
        return res.render("login", {
          message: "Username or Password Not Found, please try again",
        });
      }
    }
  );
};
