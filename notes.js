const fs = require('fs')
const { default: chalk } = require('chalk')
module.exports = {
    getNote: (title) => {
        const notes = loadNote()
        let note = notes.find((note) => note.title === title)
        if(!note){
            console.log(chalk.red.inverse("Note not found!!!"))
        }else{
            note = JSON.stringify(note)
            console.log(chalk.green.inverse(`Note : ${note}`))
        }
    },
    addNote: (title, body) => {
        const notes = loadNote()
        //const dupNotes = notes.filter((note) => note.title === title) //goes through all the notes
        const dupNote = notes.find((note) => note.title === title) //stops when the first condition is met
        if(!dupNote){
            notes.push({
                title:title,
                body:body
            })
            saveNotes(notes)
            console.log("New note added!!!")
        }else{
            console.log("Duplicate Note !!")
        }
        
    },
    removeNote: (title) => {
        const notes = loadNote()
        const newData = notes.filter((note) =>  note.title !== title)
        if(newData.length < notes.length){
            saveNotes(newData)
            console.log(chalk.green.inverse(`removed note${title}`))
        }else{
            console.log(chalk.red.inverse("no new notes to remove"))
        }     
    },
    listNote: () => {
        const notes = loadNote()
        console.log(chalk.blueBright("Your Notes!!"))
        const titles = notes.map((note) => note.title)
        console.log(titles)
    }
}

function loadNote(){
    try{
        const data = fs.readFileSync('./notes.json')
        const dataString = data.toString()
        return JSON.parse(dataString)
    }catch(e){
        return []
    }
        
      
}

function saveNotes(notes){ 
    const data = JSON.stringify(notes)
    fs.writeFileSync('./notes.json',data)   
}