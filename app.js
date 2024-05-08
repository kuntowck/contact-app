const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, detailContact } = require("./utils/contacts");
const app = express();
const port = 3000;

// ejs config
app.set("view engine", "ejs");

// third-party middleware
app.use(expressLayouts);

// built-in middleware untuk file static
app.use(express.static("public"));

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
  res.render("contact", { layout: "layouts/main", title: "Contact", contacts });
});

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
