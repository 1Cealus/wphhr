import { NextResponse as NextResp } from 'next/server';
import { getTaskById, updateTask, deleteTask } from '../../../../lib/tasks';

export async function GET(request, { params }) {
  const username = request.headers.get('x-username');
  if (!username) return NextResp.json({ message: 'Username is required' }, { status: 401 });

  const task = getTaskById(username, params.id);
  return task ? NextResp.json(task) : NextResp.json({ message: 'Task not found' }, { status: 404 });
}

export async function PUT(request, { params }) {
  const username = request.headers.get('x-username');
  if (!username) return NextResp.json({ message: 'Username is required' }, { status: 401 });

  const data = await request.json();
  const updatedTask = updateTask(username, params.id, data);
  return updatedTask ? NextResp.json(updatedTask) : NextResp.json({ message: 'Task not found' }, { status: 404 });
}

export async function DELETE(request, { params }) {
  const username = request.headers.get('x-username');
  if (!username) return NextResp.json({ message: 'Username is required' }, { status: 401 });
  
  const success = deleteTask(username, params.id);
  return success ? new NextResp(null, { status: 204 }) : NextResp.json({ message: 'Task not found' }, { status: 404 });
}