import React from 'react'

function TodoForm({ task, setTask, dueDate, setDueDate, onAdd, editingId, onCancelEdit }) {
  return (
    <section className="panel">
      <div>
        <p className="eyebrow">Quick add</p>
        <h2>New task</h2>
      </div>
      <form className="todo-form" onSubmit={onAdd}>
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="What needs to be done?"
          required
        />
        <label className="due-date-field">
          <span>Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </label>
        <button type="submit">{editingId ? 'Update Task' : 'Add Task'}</button>
        {editingId ? (
          <button type="button" className="ghost-btn" onClick={onCancelEdit}>
            Cancel
          </button>
        ) : null}
      </form>
    </section>
  )
}

export default TodoForm
