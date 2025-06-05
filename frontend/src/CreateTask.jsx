import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const CreateTask = () => {
  const[tasks, setTasks] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const Submit = async (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/createTask',{title, description})
         .then((response) => console.log(response))
         .catch((error) => console.error( error))
           
    setTasks(data)
    setTitle('')
    setDescription('')
  }
  return (
    <div>
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <h2 className='text-center'>Create Task</h2>
          <form onSubmit={Submit} >
            <div className='mb-3'>
              <label className='form-label'>Title</label>
              <input type='text' className='form-control' placeholder='Enter task title' onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea className='form-control' placeholder='Enter task description' onChange={e=>setDescription(e.target.value)}></textarea>
            </div>
            <button type='submit' className='btn btn-success w-100'>Create Task</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTask