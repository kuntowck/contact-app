const fs = require("fs");

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

// mengambil data contacts dari file contacts.json
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const json = JSON.parse(fileBuffer);

  return json;
};

const detailContact = (nama) => {
  const json = loadContact();
  // cari contact berdasarkan nama
  return json.find((e) => e.nama.toLowerCase() === nama.toLowerCase());
};

// menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// menambahkan data contact baru
const addContact = (contact) => {
  const json = loadContact();
  json.push(contact);
  saveContacts(json);
};

// cek nama yang duplikat
const cekDuplikat = (nama) => {
  const json = loadContact();
  return json.find((e) => e.nama === nama);
};

module.exports = { loadContact, detailContact, addContact, cekDuplikat };
