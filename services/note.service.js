const fs = require('fs')
const notes = require('../data/notes.json')
const PAGE_SIZE = 2

module.exports = {
  query,
  getById,
  remove,
  save,
  getNotesData,
}

function query(filterBy = { txt: '', page: 0 }) {
  // const regex = new RegExp(filterBy.txt, 'i')
  // var filteredNotes = notes.filter(
  //   (note) => regex.test(note.title) || regex.test(note.description)
  // )

  // const startIdx = filterBy.page * PAGE_SIZE
  // filteredNotes = filteredNotes.slice(startIdx, startIdx + PAGE_SIZE)
  //added this if frontend want to display some of the notes everytime
  const notDeletedNotes=notes.filter((note)=> {
    note.is_deleted===0
    delete note.is_deleted
  })
  return Promise.resolve(notes)
}

function getNotesData() {
  const data = {
    totalPages: Math.floor(notes.length / PAGE_SIZE),
    totalNotes: notes.length,
    pageSize: PAGE_SIZE,
  }
  return Promise.resolve(data)
}

function getById(noteId) {
  const note = notes.find((note) => note._id === noteId)
  return note ? Promise.resolve(note) : Promise.reject(`Couldn't find ${noteId}`)
}

function remove(noteId) {
  const idx = notes.findIndex((note) => note._id === noteId)
  const note = notes.slice(idx, 1)
  notes[i].is_deleted=1
  return _saveNotesToFile().then(() => note)
}

function save(note) {
  if (note._id) {
    const idx = notes.findIndex((currNote) => currNote._id === note._id)
    if (idx === -1) return Promise.reject('Could not fint the note')
    notes[idx] = note
  } else {
    note._id = _makeId()
    note.date = Date.now()
    note.is_deleted=0
    notes.push(note)
  }
  return _saveNotesToFile().then(() => note)
}

function _saveNotesToFile() {
  return new Promise((resolve, reject) => {
    const content = JSON.stringify(notes, null, 2)
    fs.writeFile('./data/notes.json', content, (err) => {
      if (err) {
        console.error(err)
        reject()
        return
      }
      resolve()
    })
  })
}

function _makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
