import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import toast  from "react-hot-toast"
import { useNavigate, useParams, Link } from "react-router"


import api from "../lib/axios"

function NoteDetailPage() {

  const[note,setNote]=useState(null)
  const[loading,setLoading]=useState(true)
  const[saving,setSaving]=useState(false)

  const navigate = useNavigate();

  const {id}=useParams();

  useEffect(()=>{
    const fetchNote=async()=>{
      try {
        const res= await api.get(`/notes/${id}`)
        setNote(res.data)

      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch note")
      } finally{
        setLoading(false)
      }
    }
    fetchNote()
  },[id])

  const handleDelete= async()=>{
    if(!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted succssfully")
      navigate("/")
    } catch (error) {
      console.log("failed to delete the note")
      toast.error("Error deleting")
    }
  }

   const handleSave= async()=>{
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content")
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`,note)
      toast.success("Note updated Succssfully!")
      navigate("/")
    } catch (error) {
      toast.error("Updation failed")
    }finally{
      setSaving(false)
    }
  }

  if (loading)
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    )
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className=" flex items-center justify-between mb-6 ">
              <Link to="/" className='btn btn-ghost mb-6'>
                <ArrowLeftIcon className='size-5'/>
                  Back to Notes
              </Link>
              <button className="btn btn-error btn-outline" onClick={handleDelete}>
                <Trash2Icon className="size-5"/>Delete Note
              </button>
          </div> 

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" 
                    placeholder="Note Title"
                    className="input input-bordered "
                    value={note.title}
                    onChange={(e)=>setNote({...note, title:e.target.value})}
                  />
              </div>

              <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea 
                    placeholder="Write your note here"
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={(e)=>setNote({...note, content:e.target.value})}
                  />

              </div>

              <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary" disabled={saving} onClick={handleSave}>
                      {saving ? "Saving" : "Save Changes"}
                    </button>
                </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default NoteDetailPage