const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});
const { format } = require("date-fns");

const identity = {
  title: "Geniciel Life",
  description: "Memberikan anda berita terbaru seputar kelas XI RPL 1",
};

router.get("/", (req, res) => {
  db.connect(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("connected...");
      var query = "SELECT * FROM berita ORDER BY no DESC";
      db.query(query, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          // Format each date
          results.forEach(function (item) {
            item.date = format(new Date(item.date), "dd/MM/yyyy");
            item.isi = item.isi.split(" ").slice(0, 10).join(" ") + " ...";
            item.judul_berita =
              item.judul_berita.split(" ").slice(0, 5).join(" ") + " ...";
          });
          res.locals.berita = results;
          res.render("index", { berita: results, identity: identity });
        }
      });
    }
  });
});

router.get("/upload", async (req, res) => {
  res.render("upload");
});

router.get("/berita/:no", (req, res) => {
  const no = req.params.no;
  db.connect(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("connected berita...");
      var query = "SELECT * FROM berita WHERE no = ?";
      db.query(query, [no], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            console.log("Berita ditemukan:", result[0]);
            result[0].date = format(new Date(result[0].date), "dd/MM/yyyy");

            // Retrieve all berita for sidebar
            var allQuery = "SELECT * FROM berita";
            db.query(allQuery, function (err, allResults) {
              if (err) {
                console.log(err);
              } else {
                allResults.forEach(function (item) {
                  item.date = format(new Date(item.date), "dd/MM/yyyy");
                  item.isi =
                    item.isi.split(" ").slice(0, 10).join(" ") + " ...";
                  item.judul_berita =
                    item.judul_berita.split(" ").slice(0, 5).join(" ") + " ...";
                });
                res.render("berita", {
                  that: result[0],
                  berita: allResults,
                  identity: identity,
                });
              }
            });
          } else {
            res.status(404).send("Berita tidak ditemukan");
          }
        }
      });
    }
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/DataKelas", (req, res) => {
  res.render("dashboard/dash-kelas");
});

router.get("/DashAdmin", (req, res) => {
  res.render("dashboard-admin/dash-admin");
});

router.get("/DataAdmin", async (req, res) => {
  db.connect(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("connected data admin...");
      var query = "SELECT * FROM tb_reglogin";
      db.query(query, function (err, results) {
        res.locals.admindata = results;
        res.render("dashboard-admin/data-admin");
      });
    }
  });
});

module.exports = router;
