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

const simpanContacts = (nama, email, noTelp) => {
  const contact = { nama, email, noTelp };
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const json = JSON.parse(fileBuffer);

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

module.exports = { simpanContacts };
