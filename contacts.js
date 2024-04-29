const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// membuat directory data
const dir = "./data";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
// membuat file contacts.json
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const json = JSON.parse(fileBuffer);

  return json;
};

const simpanContacts = (nama, email, noTelp) => {
  const contact = { nama, email, noTelp };
  const json = loadContact();

  // cek duplikasi nama
  const duplikat = json.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse("Kontak sudah terdaftar. Mohon gunakan nama lain!")
    );
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse("Email tidak valid!"));

      return false;
    }
  }

  // cek no telepon
  if (!validator.isMobilePhone(noTelp, "id-ID")) {
    console.log(chalk.red.inverse("No telepon tidak valid!"));

    return false;
  }

  json.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(json));

  console.log(chalk.green.inverse("Terima kasih sudah menginputkan data."));
};

const listContact = () => {
  const json = loadContact();
  console.log(chalk.yellow.inverse("Daftar kontak: "));
  json.forEach((e, i) => {
    console.log(`${i + 1}. ${e.nama} - ${e.noTelp}`);
  });
};

const detailContact = (nama) => {
  const json = loadContact();
  const contact = json.find((e) => e.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red.inverse(`${nama} tidak ditemukan!`));

    return false;
  }

  console.log(contact.nama);
  console.log(contact.noTelp);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const json = loadContact();
  const contact = json.filter(
    (e) => e.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contact.length === json.length) {
    console.log(chalk.red.inverse(`${nama} tidak ditemukan!`));

    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(contact));

  console.log(chalk.green.inverse(`Data kontak ${nama} berhasil dihapus!`));
};

module.exports = { simpanContacts, listContact, detailContact, deleteContact };
