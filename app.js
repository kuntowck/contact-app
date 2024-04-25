const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout 
});

rl.question('Masukkan nama Anda: ', nama => {
   rl.question('Masukkan nomor telepon: ', noHp => {
      const contact = {nama, noHp};
      const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
      const json = JSON.parse(fileBuffer);

      json.push(contact);

      fs.writeFileSync('data/contacts.json', JSON.stringify(json));

      console.log('Terima kasih sudah menginputkan data.');

      rl.close();
   });
});