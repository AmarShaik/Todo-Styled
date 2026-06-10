import React from 'react'

function TodoList({ todos, onToggleComplete, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <section className="panel empty-state">
        <p>No tasks match your search yet. Try adding a new one.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Task list</p>
          <h2>Your todos</h2>
        </div>
        <span className="pill">{todos.length} items</span>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-card ${todo.completed ? 'done' : ''}`}>
            <label className="todo-check">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
              />
              <span>{todo.title}</span>
            </label>
            <div className="task-meta">
              {todo.dueDate ? <span className="due-badge">Due {todo.dueDate}</span> : <span className="due-badge muted">No due date</span>}
            </div>
            <div className="action-row">
              <button className="ghost-btn" type="button" onClick={() => onEdit(todo)}>
                Edit
              </button>
              <button className="delete-btn" type="button" onClick={() => onDelete(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TodoList
