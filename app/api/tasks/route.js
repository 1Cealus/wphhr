import { NextResponse } from 'next/server';
import { getTasks, createTask } from '../../../lib/tasks';

export async function GET(request) {
  const username = request.headers.get('x-username');
  if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 401 });
  }
  const tasks = getTasks(username);
  return NextResponse.json(tasks);
}

export async function POST(request) {
  const username = request.headers.get('x-username');
  if (!username) {
      return NextResponse.json({ message: 'Username is required' }, { status: 401 });
  }
  const taskData = await request.json();
  if (!taskData.title || !taskData.dueDate) {
    return NextResponse.json({ message: 'Title and Due Date are required.' }, { status: 400 });
  }
  const newTask = createTask(username, taskData);
  return NextResponse.json(newTask, { status: 201 });
}