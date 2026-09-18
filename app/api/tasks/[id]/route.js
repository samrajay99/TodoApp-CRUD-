import { connectDatabase, memory } from '@/lib/db'
import Task from '@/models/Task'

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const input = await request.json()
    if (await connectDatabase()) {
      const task = await Task.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true }).lean()
      return task ? Response.json(task) : Response.json({ error: 'Task not found' }, { status: 404 })
    }
    const task = memory.find((item) => item._id === id)
    if (!task) return Response.json({ error: 'Task not found' }, { status: 404 })
    Object.assign(task, input, { updatedAt: new Date().toISOString() })
    return Response.json(task)
  } catch (error) { return Response.json({ error: error.message }, { status: 500 }) }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    if (await connectDatabase()) {
      const task = await Task.findByIdAndDelete(id)
      return task ? Response.json({ success: true }) : Response.json({ error: 'Task not found' }, { status: 404 })
    }
    const index = memory.findIndex((item) => item._id === id)
    if (index < 0) return Response.json({ error: 'Task not found' }, { status: 404 })
    memory.splice(index, 1)
    return Response.json({ success: true })
  } catch (error) { return Response.json({ error: error.message }, { status: 500 }) }
}