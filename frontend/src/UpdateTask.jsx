import React from 'react'

const UpdateTask = () => {
  return (
    <div>
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <h2 className='text-center'>Update Task</h2>
          <form>
            <div className='mb-3'>
              <label className='form-label'>Title</label>
              <input type='text' className='form-control' placeholder='Enter task title' />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea className='form-control' placeholder='Enter task description'></textarea>
            </div>
            <button type='submit' className='btn btn-success w-100'>Update Task</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateTask