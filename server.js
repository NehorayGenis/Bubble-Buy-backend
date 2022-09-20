const express = require("express")
const cookieParser = require("cookie-parser")

const noteService = require("./services/note.service.js")
const app = express()
const port = 3030

app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json())

//LIST
app.get("/api/note", (req, res) => {
    const filterBy = req.query
    noteService
        .query(filterBy)
        .then((notes) => res.send(notes))
        .catch((err) => res.status(500).send("Cannot get notes"))
})

// CREATE
app.post("/api/note", (req, res) => {
    // const { nickname } = req.cookies
    //for later use
    const { data } = req.body
    const { title, content, author } = data
    const note = {
        title,
        content,
        author,
    }
    noteService
        .save(note)
        .then((savednote) => res.send(savednote))
        .catch((err) => res.status(500).send("Cannot save note"))
})

// UPDATE
app.put("/api/note/:noteId", (req, res) => {
    const { username } = req.cookies
    const { _id, title, content, author, creator, date } = req.body
    if (username !== creator.username) {
        return res.status(500).send("Wrong user")
    }
    const note = {
        _id,
        title,
        content,
        author,
        date,
    }

    noteService
        .save(note)
        .then((savedNote) => res.send(savedNote))
        .catch((err) => res.status(500).send("Cannot save note"))
})

// DOWNLOAD
app.get("/api/note/export", (req, res) => {
    res.download("./data/notes.json")
})

// GET BUGS DATA

app.get("/api/note/data", (req, res) => {
    noteService.getNotesData().then((data) => {
        res.send(data)
    })
})

// READ
app.get("/api/note/:noteId", (req, res) => {
    const { noteId } = req.params
    noteService
        .getById(noteId)
        .then((note) => res.send(note))
        .catch((err) => res.status(500).send("Cannot get note"))
})

// DELETE
app.delete("/api/note/:noteId", (req, res) => {
    const { noteId } = req.params
    // const tryingUser = req.cookies.username
    noteService
        .getById(noteId)
        .then((note) => {
            noteService
                .remove(noteId)
                .then(() => res.send("Removed!"))
                .catch((err) => res.status(500).send("Cannot remove note"))
            //for user check later
            // if (note.creator.username === tryingUser) {
            // } else {
            //   res.status(500).send('Wrong user!!')
            // }
        })
        .catch((err) => {
            console.log("err", err)
            res.send("Could not find note")
        })
})

//LOGIN
app.post("/api/login", (req, res) => {
    const { username } = req.body
    // const userName = req.body.username || ''
    if (username) {
        res.cookie("username", username)
        res.send(username)
    } else {
        res.status(500).send("error as oocured when trying to log in")
    }
})

//LOGOUT
app.post("/api/logout", (req, res) => {
    res.clearCookie("username")
    res.send("logged out")
})

app.listen(port, () => {
    console.log(`server live at http://localhost:${port}`)
})
