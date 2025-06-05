import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Tasks = () => {

  const[tasks, setTasks] = useState([{
    Id:1,
    Title: 'Task 1',
    Description: 'Description for Task 1',
    Status: 'Pending'
  }])
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
       <div className='w-50 bg-white rounded p-3'>
         <Link to='/create' className='btn btn-success mb-3'>Add Task +</Link>
          <table className='border-1'>
             <thead>
                <tr>
                   <th>Id</th>
                    <th>Title</th>
                   <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  tasks.map((task) => (
                     <tr key={task.Id}>
                      <td>{task.Id}</td>
                      <td>{task.Title}</td>
                      <td>{task.Description}</td>
                      <td>{task.Status}</td>
                      <td>
                       <Link to='/create' className='btn btn-success mb-3'>Update</Link>
                        <button className='btn btn-danger'>Delete</button>
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