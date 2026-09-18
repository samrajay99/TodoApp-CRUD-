import { connectDatabase, memory } from '@/lib/db'
import Task from '@/models/Task'

export async function GET() {
  try {
    if (await connectDatabase()) return Response.json(await Task.find().sort({ createdAt: -1 }).lean())
    return Response.json(memory)
  } catch (error) { return Response.json({ error: error.message }, { status: 500 }) }
}

export async function POST(request) {
  try {
    const input = await request.json()
    if (!input.title?.trim()) return Response.json({ error: 'Title is required' }, { status: 400 })
    const data = { title: input.title.trim(), description: input.description?.trim() || '', priority: input.priority || 'medium', dueDate: input.dueDate || '', completed: false }
    if (await connectDatabase()) return Response.json(await Task.create(data), { status: 201 })
    const task = { ...data, _id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    memory.unshift(task)
    return Response.json(task, { status: 201 })
  } catch (error) { return Response.json({ error: error.message }, { status: 500 }) }
}