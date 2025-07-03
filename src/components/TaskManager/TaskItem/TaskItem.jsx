import React from 'react'
import "./styles.css"

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={onToggle}
            />
            <span>{task.title}</span>
            <button onClick={onDelete}>🗑</button>
        </div>
    )
}
