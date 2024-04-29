const { type } = require("os");
const { argv } = require("process");
const yargs = require("yargs");
const { simpanContacts } = require("./contacts");

// mengambil argument dari terminal
yargs.command({
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
});

yargs.parse();
