const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { validationResult, check, body } = require("express-validator");
const {
  loadContact,
  detailContact,
  addContact,
  cekDuplikat,
} = require("./utils/contacts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// ejs config
app.set("view engine", "ejs");

// third-party middleware
app.use(expressLayouts);
app.use(cookieParser("secret")); // config flash
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: "true",
    saveUninitialized: true, // config session
  })
);
app.use(flash()); // config flash

// built-in middleware
app.use(express.static("public")); // untuk file static
app.use(express.urlencoded({ extended: true })); // untuk parse data URL

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
  const mahasiswa = [
    {
      nama: "Kunto Wicaksono",
      email: "kunto.wicaksono@gmail.com",
    },
    {
      nama: "Sri Indarti",
      email: "sri.indarti@gmail.com",
    },
    {
      nama: "Sultan Anugrah",
      email: "sultan.anugrah@gmail.com",
    },
  ];

  res.render("index", {
    nama: "Kunto",
    title: "Home",
    mahasiswa,
    layout: "layouts/main",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/main", title: "About" });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main",
    title: "Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main",
    title: "Tambah Data Contact",
  });
});

// proses data contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama contact sudah terdaftar!");
      }

      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("notelp", "Nomor telepon tidak valid!").isMobilePhone(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        layout: "layouts/main",
        title: "Tambah Data Contact",
        errors: errors.array(),
      });
    } else {
      addContact(req.body); // data form
      req.flash("msg", "Data contact berhasil ditambahkan!"); // kirim flash massage
      res.redirect("/contact"); // menjalankan route app get contact
    }
  }
);

// halaman detail contact
app.get("/contact/:nama", (req, res) => {
  const contact = detailContact(req.params.nama);
  res.render("detail", {
    layout: "layouts/main",
    title: "Detail Contact",
    contact,
  });
});

// menjalankan request apa pun
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
