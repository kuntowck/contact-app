const contacts = require('./contacts');
// const {tulisPertanyaan, simpanContacts} = require('./contacts'); //object distractring

const main = async () => {
   const nama = await contacts.tulisPertanyaan('Masukkan nama: ');
   const email = await contacts.tulisPertanyaan('Masukkan email: ');
   const noHp = await contacts.tulisPertanyaan('Masukkan noHp: ');

   contacts.simpanContacts(nama, email, noHp);
} 

main();

