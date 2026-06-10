import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)


  useEffect(() => {
    const savedTodos = localStorage.getItem('my-todo-app')

    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch {
        localStorage.removeItem('my-todo-app')
      }
    }

    fetch('https://jsonplaceholder.typicode.com/todos?_limit=6')
      .then((response) => response.json())
      .then((data) => {
        const fetchedTodos = data.map((item) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
        }))

        setTodos(fetchedTodos)
        localStorage.setItem('my-todo-app', JSON.stringify(fetchedTodos))
      })
      .catch(() => {
        if (!savedTodos) setTodos([])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('my-todo-app', JSON.stringify(todos))
    }
  }, [todos])

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTodo = (event) => {
    event.preventDefault()

    const title = task.trim()
    if (!title) return

    if (editingId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, title, dueDate } : todo
        )
      )
      setEditingId(null)
      setTask('')
      setDueDate('')
      return
    }

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      dueDate,
    }

    setTodos((prev) => [newTodo, ...prev])
    setTask('')
    setDueDate('')
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setTask('')
      setDueDate('')
    }
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setTask(todo.title)
    setDueDate(todo.dueDate || '')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setTask('')
    setDueDate('')
  }

  return (
    <main className="app-shell">
      <section className="app-card">
        <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="content-grid">
          <div className="left-stack">
            <TodoForm
              task={task}
              setTask={setTask}
              dueDate={dueDate}
              setDueDate={setDueDate}
              onAdd={handleAddTodo}
              editingId={editingId}
              onCancelEdit={cancelEdit}
            />

            <section className="panel status-panel">
              <p className="eyebrow">Overview</p>
              <h2>Progress</h2>
              <ul className="stat-list">
                <li><strong>{todos.length}</strong> total tasks</li>
                <li><strong>{todos.filter((todo) => todo.completed).length}</strong> completed</li>
              </ul>
              {loading && <p className="helper-text">Loading your tasks...</p>}
            </section>
          </div>

          <TodoList
            todos={filteredTodos}
            onToggleComplete={toggleComplete}
            onDelete={deleteTodo}
            onEdit={startEdit}
          />
        </div>
      </section>
    </main>
  )
}

export default App
