'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from '../../../../components/TaskForm';
import { getUsername } from '../../../../lib/auth';

export default function EditTaskPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [task, setTask] = useState(null);
  const username = getUsername();

  useEffect(() => {
    if (id && username) {
      const fetchTask = async () => {
        const res = await fetch(`/api/tasks/${id}`, {
            headers: { 'X-Username': username }
        });
        if (res.ok) {
          const data = await res.json();
          setTask(data);
        }
      };
      fetchTask();
    }
  }, [id, username]);

  const handleUpdateTask = async (taskData) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Username': username
        },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error('Failed to update task');
      router.push('/');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!task) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Edit Task</h1>
      <TaskForm onSubmit={handleUpdateTask} existingTask={task} />
    </div>
  );
}