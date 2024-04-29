const { type } = require("os");
const { argv } = require("process");
const yargs = require("yargs");
const {
  simpanContacts,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

// mengambil argument dari terminal
yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email",
        demandOption: false,
        type: "string",
      },
      noTelp: {
        describe: "no telepon",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanContacts(argv.nama, argv.email, argv.noTelp);
    },
  })
  .demandCommand(); // mengatasi command line tanpa argument

// menampilkan daftar semua nama contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama dan no telepon contact.",
  handler() {
    listContact();
  },
});

// menampilkan detail contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail contact.",
  builder: {
    nama: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// menghapus contact
yargs.command({
  command: "delete",
  describe: "Menghapus contact berdasarkan nama.",
  builder: {
    nama: {
      describe: "nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});
yargs.parse();
