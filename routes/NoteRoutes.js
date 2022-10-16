const noteModel = require('../models/NotesModel.js');
const express = require('express');
const app = express()


//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', async (req, res) => {
    // Validate request
    console.log(req.body)
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    const note = new noteModel(req.body);
    try{
        await note.save();
        res.status(200).send("note saved")
    }catch (err){
        console.log("Error occured " + err)
        res.status(500).send(err);
    }
});

//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    const notes = await noteModel.find({});    
    try{
        res.send(notes);
    }catch(err){
        res.status(500).send(err);
    }

});

//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    // Validate request
    if(!req.params.noteId) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    const note = await noteModel.findById(req.params.noteId); 
    try{
        res.send(note);
    }catch(err){
        res.status(500).send(err);
    }

});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async(req, res) => {
    console.log(req.params.noteId)
    console.log(req.body)
    try{
        const updatedNote = await noteModel.findByIdAndUpdate(req.params.noteId, req.body)
        const note = await updatedNote.save()
        res.send(note)
    }catch (err){
        console.log(err)
        res.status(500).send(err);
    }

});

//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    // Validate request
    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId)
    
        if (!note) { 
            res.status(404).send("No item found")
        }
        res.status(200).send(note)
      } catch (err) {
        res.status(500).send(err)
      }
});

module.exports = app;