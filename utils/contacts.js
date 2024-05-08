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

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const json = JSON.parse(fileBuffer);

  return json;
};

const detailContact = (nama) => {
  const json = loadContact();
  const contact = json.find((e) => e.nama.toLowerCase() === nama.toLowerCase());

  return contact;
};

module.exports = { loadContact, detailContact };
