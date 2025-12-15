import Note from "../models/Note.js"
import { now } from "mongoose";

export  async function getAllNotes(req,res){
    try {
        const notes= await Note.find().sort({createdAt:-1}) //newest first
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({message:"failed to fetch data from the table"})
    }
};


export  async function getNoteById(req,res){
    try {
        const note= await Note.findById(req.params.id)
        if(!note)
            return res.status(404).json({message:"not found"})
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({message:"failed to fetch data from the table"})
    }
};

export async function createNote(req,res){
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });  

        const savedNotes = await note.save();

        res.status(201).json(savedNotes);
    } catch (error) {
        console.error(error);                         
        res.status(500).json({ message:"failed to create post" });
    }
}


export async function updateNote(req,res){
    try {
        const {title,content}=req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new:true
            }
        );

        if(!updateNote)
            return res.status(404).json({message:"post not found"});

        res.status(200).json(updateNote);
    } catch (error) {
         console.error(error);                         
        res.status(500).json({ message:"failed to update post" });
    }
    
}; 


export const deleteNote=async (req,res)=>{

     try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);

        if(!deleteNote)
            return res.status(404).json({message:"post not found"});

        res.status(200).json(
            {
                message:"deleted",
                deleteNote
            });
    } catch (error) {
         console.error(error);                         
        res.status(500).json({ message:"failed to delete post" });
    }
}; 
