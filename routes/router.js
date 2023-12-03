const express = require('express')
const router = express.Router();
const notes = require("../models/userSchema")

router.post('/addnotes', async (req, res) => {
    try {
        const note = new notes(req.body)
        // console.log(note)
        const savedNote = await note.save()
        // res.json(savedNote)
        console.log(savedNote)

        res.status(201).json({ status: 201, savedNote })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// fetch all notes from database
router.get("/notes", async (req, res) => {
    try {
        const note = await notes.find();
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// delete sticky notes from database using id

router.delete("/allnotes/:id", async (req, res) => {
    try {
        // take the id of particular note and delete than 
        const note = await notes.findByIdAndDelete({ _id: req.params.id });
        res.json(note)
        // console.log(note) 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

// edit our notes API 
router.put('/editnotes/:id', async (req, res) => {
    const { title, description } = req.body;
    // console.log(title.value)
    try {
        const editNote = {};
        if (title.value) { editNote.title = title.value };
        if (description.value) { editNote.description = description.value };
        //  console.log(editNote)
        const userData = await notes.findOneAndUpdate({ _id: req.params.id },
            { $set: editNote }, { new: true })
        res.status(201).json({ status: 201, userData })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports = router