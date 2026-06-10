import React from 'react'

function Navbar({ searchTerm, onSearchChange }) {
  return (
    <header className="navbar-card navbar-top">
      <div className="navbar-copy">
        <p className="eyebrow"><b>Simple planning</b></p>
        <h1>My Todo App</h1>
        <p className="subcopy">
          Add tasks, search instantly, and keep your daily plan in check.
        </p>
      </div>

      <label className="search-shell compact-search">
        <span className="sr-only">Search tasks</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
        />
      </label>
    </header>
  )
}

export default Navbar
