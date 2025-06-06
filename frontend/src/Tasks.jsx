import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Tasks = () => {

  const[tasks, setTasks] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001')
    .then(result=>setTasks(result.data))
    .catch(err=>console.log(err))

  },[])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteTask/'+id)
         .then((response) =>{ 
          console.log(response)
          setTasks(tasks.filter(task => task._id !== id))
        })
         .catch((error) => console.error( error))
    alert('Task Deleted Successfully')
  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
       <div className='w-50 bg-white rounded p-3'>
         <Link to='/create' className='btn btn-success mb-3'>Add Task +</Link>
          <table className='table'>
             <thead>
                <tr>
                   <th>Id</th>
                    <th>Title</th>
                   <th>Description</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  tasks.map((task) => (
                     <tr>
                      <td>{task.id}</td>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.status}</td>
                      <td>{Date()}</td>
                      <td>
                       <Link to={`{/update}/${task._id}`} className='btn btn-success mb-3'>Update</Link>
                        <button className='btn btn-danger'onClick={(e)=>handleDelete(task._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
          </table>
       </div>
    </div>
  )
}

export default Tasks