import React, { useEffect } from 'react'
import { useTasks } from '../../hooks/useTask'
import TaskItem from './TaskItem/TaskItem'
import { emitEvent } from '../../utils/eventDispatcher'
import './styles.css'

export default function TaskManager() {
    const {
        tasks,
        completedCount,
        total,
        addTask,
        toggleTask,
        deleteTask
    } = useTasks()

    const [input, setInput] = React.useState('')

    useEffect(() => {
        function handleExternalTaskAdd(e) {
          const { title } = e.detail
          if (!title) return
          addTask(title)
        }
      
        window.addEventListener('external-task-add', handleExternalTaskAdd)
        return () => {
          window.removeEventListener('external-task-add', handleExternalTaskAdd)
        }
      }, [addTask])
      




    useEffect(() => {
        emitEvent('task-count-updated', { total, completed: completedCount })
    }, [total, completedCount])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!input.trim()) return
        addTask(input.trim())
        setInput('')
    }

    return (
        <div className="task-manager">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nueva tarea"
                />
                <button type="submit">Añadir</button>
            </form>

            <div className="task-list">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={() => toggleTask(task.id)}
                        onDelete={() => deleteTask(task.id)}
                    />
                ))}
            </div>

            <p>{completedCount} completadas / {total} tareas</p>
        </div>
    )
}
