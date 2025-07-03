import { useState, useCallback } from 'react'

export function useTasks() {
    const [tasks, setTasks] = useState([])

    const addTask = useCallback((title) => {
        setTasks(tasks => [...tasks, { id: Date.now(), title, completed: false }])
    }, [])

    const toggleTask = useCallback((id) => {
        setTasks(tasks =>
            tasks.map(t =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        )
    }, [])

    const deleteTask = useCallback((id) => {
        setTasks(tasks => tasks.filter(t => t.id !== id))
    }, [])

    const completedCount = tasks.filter(t => t.completed).length
    const total = tasks.length

    return { tasks, completedCount, total, addTask, toggleTask, deleteTask }
}
