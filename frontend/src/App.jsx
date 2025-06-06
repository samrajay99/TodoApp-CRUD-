import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Tasks from './Tasks'
import CreateTask from './CreateTask'
import UpdateTask from './UpdateTask'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks/>}/>
          <Route path="/create" element={<CreateTask/>} />
          <Route path="/update/:id" element={<UpdateTask/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
