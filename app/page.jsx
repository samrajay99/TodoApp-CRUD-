'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Check, ChevronDown, Circle, Clock3, ListFilter, Plus, Search, Sparkles, Trash2, X } from 'lucide-react'

const filters = ['all', 'active', 'completed']

function formatDate(date) {
  if (!date) return 'No due date'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00:00`))
}

function TaskForm({ task, onSave, onCancel, saving }) {
  const [form, setForm] = useState(task || { title: '', description: '', priority: 'medium', dueDate: '' })
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <form className="task-form" onSubmit={(event) => { event.preventDefault(); onSave(form) }}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">{task ? 'Refine task' : 'New task'}</span>
          <h2>{task ? 'Make it actionable' : 'What needs doing?'}</h2>
        </div>
        <button className="icon-button" type="button" onClick={onCancel} aria-label="Close form"><X size={18} /></button>
      </div>
      <label>Title<input required maxLength={100} value={form.title} onChange={(event) => set('title', event.target.value)} placeholder="e.g. Send the project brief" autoFocus /></label>
      <label>Notes<span className="optional">Optional</span><textarea maxLength={500} value={form.description} onChange={(event) => set('description', event.target.value)} placeholder="Add the useful context..." rows={4} /></label>
      <div className="form-grid">
        <label>Priority<select value={form.priority} onChange={(event) => set('priority', event.target.value)}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label>
        <label>Due date<span className="optional">Optional</span><input type="date" value={form.dueDate || ''} onChange={(event) => set('dueDate', event.target.value)} /></label>
      </div>
      <div className="form-actions"><button type="button" className="button button-quiet" onClick={onCancel}>Cancel</button><button className="button button-dark" disabled={saving}>{saving ? 'Saving...' : task ? 'Save changes' : 'Add task'}</button></div>
    </form>
  )
}

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tasks')
      if (!response.ok) throw new Error('Could not load tasks')
      setTasks(await response.json())
    } catch (loadError) { setError(loadError.message) } finally { setLoading(false) }
  }

  useEffect(() => { loadTasks() }, [])

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesFilter = filter === 'all' || (filter === 'active' ? !task.completed : task.completed)
    const searchText = `${task.title} ${task.description}`.toLowerCase()
    return matchesFilter && searchText.includes(query.toLowerCase())
  }), [tasks, filter, query])

  const completed = tasks.filter((task) => task.completed).length
  const saveTask = async (form) => {
    setSaving(true); setError('')
    try {
      const response = await fetch(editing ? `/api/tasks/${editing._id}` : '/api/tasks', { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error('Could not save task')
      const saved = await response.json()
      setTasks((current) => editing ? current.map((task) => task._id === saved._id ? saved : task) : [saved, ...current])
      setShowForm(false); setEditing(null)
    } catch (saveError) { setError(saveError.message) } finally { setSaving(false) }
  }

  const toggleTask = async (task) => {
    const response = await fetch(`/api/tasks/${task._id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !task.completed }) })
    if (response.ok) { const updated = await response.json(); setTasks((current) => current.map((item) => item._id === updated._id ? updated : item)) }
  }

  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return
    const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    if (response.ok) setTasks((current) => current.filter((task) => task._id !== id))
  }

  return <main className="shell">
    <aside className="sidebar"><div className="brand"><span className="brand-mark"><Sparkles size={17} /></span><span>daymark</span></div><div className="side-label">Workspace</div><button className="nav-item active"><ListFilter size={17} /> My tasks <span className="count">{tasks.length}</span></button><div className="side-note"><Clock3 size={16} /><div><strong>Keep the day moving.</strong><span>One clear next step at a time.</span></div></div></aside>
    <section className="content"><header className="topbar"><div><span className="eyebrow">Monday, September 19</span><h1>Good morning, Samraj.</h1></div><button className="button button-dark" onClick={() => { setEditing(null); setShowForm(true) }}><Plus size={17} /> Add task</button></header>
      {error && <div className="error-banner">{error}</div>}
      <div className="summary"><div><span className="summary-number">{tasks.length - completed}</span><span className="summary-label">open tasks</span></div><div className="progress"><div className="progress-track"><span style={{ width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%` }} /></div><span>{completed} of {tasks.length} complete</span></div><div className="today"><CalendarDays size={17} /><span>Today<br /><strong>{tasks.filter((task) => task.dueDate === new Date().toISOString().slice(0, 10) && !task.completed).length} due</strong></span></div></div>
      <div className="toolbar"><div className="tabs">{filters.map((item) => <button key={item} className={filter === item ? 'tab selected' : 'tab'} onClick={() => setFilter(item)}>{item[0].toUpperCase() + item.slice(1)} <span>{item === 'all' ? tasks.length : item === 'active' ? tasks.length - completed : completed}</span></button>)}</div><label className="search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks" /></label></div>
      <div className="task-list">{loading ? <div className="empty-state"><div className="loader" />Loading your tasks...</div> : visibleTasks.length === 0 ? <div className="empty-state"><Circle size={28} /><h3>{query ? 'No matching tasks' : filter === 'completed' ? 'Nothing completed yet' : 'Your list is clear'}</h3><p>{query ? 'Try a different search term.' : 'Add a task and make some progress.'}</p></div> : visibleTasks.map((task) => <article className={task.completed ? 'task completed-task' : 'task'} key={task._id}><button className={task.completed ? 'check checked' : 'check'} onClick={() => toggleTask(task)} aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}>{task.completed && <Check size={15} />}</button><div className="task-copy"><div className="task-title-row"><h3>{task.title}</h3><span className={`priority ${task.priority}`}>{task.priority}</span></div>{task.description && <p>{task.description}</p>}<span className="due"><CalendarDays size={13} /> {formatDate(task.dueDate)}</span></div><div className="task-actions"><button className="text-button" onClick={() => { setEditing(task); setShowForm(true) }}>Edit</button><button className="icon-button danger" onClick={() => deleteTask(task._id)} aria-label={`Delete ${task.title}`}><Trash2 size={16} /></button></div></article>)}</div>
    </section>
    {showForm && <div className="modal-backdrop"><TaskForm task={editing} onSave={saveTask} onCancel={() => { setShowForm(false); setEditing(null) }} saving={saving} /></div>}
  </main>
}