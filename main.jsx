import React from 'react'
import ReactDOM from 'react-dom/client'
import TaskManager from './src/components/TaskManager/TaskManager.jsx'

const rootEl = document.getElementById('task-root')

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<TaskManager />)
} else {
  console.error('Elemento #task-root no encontrado en el DOM')
}
