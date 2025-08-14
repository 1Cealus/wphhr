'use client';

import TaskForm from '../../../components/TaskForm';
import { useRouter } from 'next/navigation';
import { getUsername } from '../../../lib/auth';

export default function CreateTaskPage() {
  const router = useRouter();
  const username = getUsername();

  const handleCreateTask = async (taskData) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Username': username
        },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error('Failed to create task');
      router.push('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Create New Task</h1>
      <TaskForm onSubmit={handleCreateTask} />
    </div>
  );
}