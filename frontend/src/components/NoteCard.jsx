import {Trash2Icon ,PenSquareIcon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import toast from 'react-hot-toast'
import api from "../lib/axios"

const NoteCard = ({note,setNotes}) => {

  const handleDelete = async(e,id)=>{
    e.preventDefault(); //actually the entire card is a link so whereever we click it navigate so inorder to prevent  we use this
    if(!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev)=>prev.filter(note=>note._id !==id))//remove deleted card
      toast.success("Note deleted succssfully")
    } catch (error) {
      console.log("failed to delete the note")
      toast.error("Error deleteing")
    }
  }

  return (
    <Link to={`/note/${note._id}`} 
    className="card bg-base-200/90 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#c5641e]">

      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className="size-4"/>
            <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handleDelete(e, note._id)}>

              <Trash2Icon className='size-4'/>
            </button>
          </div>

        </div>

      </div>
  </Link>
  )
}

export default NoteCard