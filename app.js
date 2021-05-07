const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

if (process.argv.length < 3) {
  //? this runs if there is no arguments passed when running the script, So show help/info on how to use the script.
  console.log('\n');
  console.log(chalk.red('You did not passed any flags with arguments.'));
  console.log('\n');
  console.log(chalk.inverse('For adding a new note'));
  console.log(
    '=> node app.js add --title="your title" --body="your description"'
  );
  console.log('\n');
  console.log(chalk.inverse('For deleting a specific note'));
  console.log('=> node app.js remove --title="title of the note"');
  console.log('\n');
  console.log(chalk.inverse('For listing all the notes'));
  console.log('=> node app.js list');
  console.log('\n');
  console.log(chalk.inverse('For reading a note'));
  console.log('=> node app.js read --title"tile of the note"');
} else {
  //? RUN THE APP THE WHOLE THING
  // app.js --version will show this on cli
  yargs.version('1.0.0');

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
}
