import { NextResponse } from 'next/server';
import { getTaskById, updateTask, deleteTask } from '../../../../lib/tasks';

export async function GET(request, context) {
  const { params } = context;
  const username = request.headers.get('x-username');
  if (!username) return NextResponse.json({ message: 'Username is required' }, { status: 401 });

  const task = getTaskById(username, params.id);
  return task ? NextResponse.json(task) : NextResponse.json({ message: 'Task not found' }, { status: 404 });
}

export async function PUT(request, context) {
  const { params } = context;
  const username = request.headers.get('x-username');
  if (!username) return NextResponse.json({ message: 'Username is required' }, { status: 401 });

  const data = await request.json();
  const updatedTask = updateTask(username, params.id, data);
  return updatedTask ? NextResponse.json(updatedTask) : NextResponse.json({ message: 'Task not found' }, { status: 404 });
}

export async function DELETE(request, context) {
  const { params } = context;
  const username = request.headers.get('x-username');
  if (!username) return NextResponse.json({ message: 'Username is required' }, { status: 401 });
  
  const success = deleteTask(username, params.id);
  return success ? new NextResponse(null, { status: 204 }) : NextResponse.json({ message: 'Task not found' }, { status: 404 });
}