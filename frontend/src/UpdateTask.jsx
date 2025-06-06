import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateTask = () => {
  const {id}=useParams()
   const[tasks, setTasks] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate =useNavigate()

  useEffect(()=>{
    axios.get('http://localhost:3001/getTask/'+ id)
    .then(result=>{console.log(result)
      setTasks(result.data)
      setTitle(result.data.title)
      setDescription(result.data.description)
    })
    .catch(err=>console.log(err))

  },[])

  const Update = async (e) => {
    e.preventDefault()
    axios.put('http://localhost:3001/updateTask/'+id, {title, description})
         .then((response) =>{ 
          console.log(response)
          navigate('/')
        })
         .catch((error) => console.error( error))
    alert('Task Updated Successfully')
    setTitle('')
    setDescription('')
  }
  return (
    <div>
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <h2 className='text-center'>Update Task</h2>
          <form onSubmit={Update}>
            <div className='mb-3'>
              <label className='form-label'>Id</label>
              <input type='text' className='form-control' placeholder='Enter task id' value={id} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Title</label>
              <input type='text' className='form-control' placeholder='Enter task title' value={title} onChange={e=>setTitle(e.target.value)} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea className='form-control' placeholder='Enter task description' value={description}onChange={e=>setDescription(e.target.value)}></textarea>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Status</label>
              <input type='text' className='form-control' placeholder='Enter task status'  />
            </div>
            <button type='submit' className='btn btn-success w-100'>Update Task</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateTask