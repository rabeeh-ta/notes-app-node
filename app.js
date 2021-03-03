const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// customize yargs version

yargs.version('1.1.1');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'note tittle',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'more info about the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});
// creating the remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'delete a note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  },
});
// creating the list command
yargs.command({
  command: 'list',
  describe: 'listing all note',
  handler() {
    notes.listNotes();
  },
});
// creating the read command
yargs.command({
  command: 'read',
  describe: 'reading a note',
  builder: {
    title: {
      describe: 'read a note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNotes(argv.title);
  },
});

yargs.parse();
