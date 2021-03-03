const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

//* finding a note by its title.
const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
};

//* add a new note
const addNotes = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    // no duplicate note
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green('new note added'));
  } else {
    // there is a duplicate note
    console.log(chalk.yellowBright('note title taken!'));
  }
};

//* remove a note
const removeNotes = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse('no note with the title found'));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.green('note deleted'));
  }
};

//* listing out all the notes
const listNotes = () => {
  console.log(chalk.inverse('Listing all the notes'));
  const notes = loadNotes();

  notes.forEach((note) => {
    console.log(note.title);
  });
};

//* save the note to database json file
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('./notes.json', dataJSON);
};

//* calling the database and retrieve the data
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes,
};
