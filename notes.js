const fs = require('fs')
const chalk = require('chalk');

const addNote = (title, body) =>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title, 
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('Note added successfully'))
    } else{
        console.log(chalk.bgRed('Note title already exists!'))
      
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const keepNotes = notes.filter((note) => note.title !== title)
    if(keepNotes.length < notes.length){
        saveNotes(keepNotes)
        console.log(chalk.bgGreen('Note removed successfully'))     
    } else{
        console.log(chalk.bgRed('Note with given title does not exist'))
    }
}
const listNotes = () =>{
    console.log(chalk.magenta('Your Notes'))
    const notes = loadNotes()
    notes.forEach((note) =>{
        console.log(chalk.blue(note.title))
    })
}

const readNotes = (title) =>{
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.magenta(note.title))
        console.log(chalk.dim(note.body))
    } else{
        console.log(chalk.bgRed('Note with given title does not exist'))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e){
            return []
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}