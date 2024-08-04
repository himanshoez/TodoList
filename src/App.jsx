import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import Navbar from './components/Navbar'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
    
  }
  


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false }])
    setTodo("")
    console.log(todos)
    saveToLS()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container md:w-1/2 md:mx-auto my-5 bg-red-300 rounded-xl p-5 min-h-[80vh]">
        <h1 className='text-xl font-bold font-sans'>Add Todos</h1>
        <div className="addTodo flex gap-2 my-2" >
          <input onChange={handleChange} value={todo} className='w-11/12 px-2 rounded' type="text" placeholder='Task' />
          <button onClick={handleAdd} disabled={todo.length<1} className='bg-green-300 hover:bg-green-400 border-none rounded p-1 px-9 transition-all  cursor-pointer'>Save</button>
        </div>
        <div className='todos w-full m-2 '>
          <label className='mx-1' htmlFor="show">Show Finished</label>
       <input id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
       <hr/> 
          <h1 className='text-xl font-bold font-serif'>Your Todos</h1>
          {todos.length === 0 && <span className='text-lg text-gray-600' >No Todos To Display</span>}
          {todos.map(item => {
            return(showFinished || !item.isComplete) && <div key={item.id} className="todo flex justify-between m-2">
              <div>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isComplete} name={item.id} id="" />
                <span className={item.isComplete ? "line-through" : ""}>{item.todo}</span>
              </div>

              <div className=" flex buttons gap-2">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-200 hover:bg-violet-300 border-none rounded p-1 transition-all cursor-pointer'><CiEdit className='size-6' /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-200 hover:bg-violet-300 border-none rounded p-1 transition-all cursor-pointer'><AiOutlineDelete className='size-6' /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
