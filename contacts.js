const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout 
});

// membuat directory data
const dir = './data';
if (!fs.existsSync(dir)){
   fs.mkdirSync(dir);
}
// membuat file contacts.json
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)){ 
   fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) => {
   return new Promise((resolve, reject) => {
      rl.question(pertanyaan, nama => {
         resolve(nama);
      });
   });
};

const simpanContacts = (nama, email, noHp) => {
   const contact = {nama, email, noHp};
   const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
   const json = JSON.parse(fileBuffer);

   json.push(contact);

   fs.writeFileSync('data/contacts.json', JSON.stringify(json));

   console.log('Terima kasih sudah menginputkan data.');

   rl.close();
}

module.exports = {
   tulisPertanyaan,
   simpanContacts
};