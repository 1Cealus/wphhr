'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUsername } from '../../../lib/auth';

export default function TaskPage({ params }) {
  const { id } = params;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUsername(getUsername());
  }, []);

  useEffect(() => {
    if (id && username) {
      const fetchTask = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/tasks/${id}`, {
            headers: { 'X-Username': username }
          });
          if (!res.ok) throw new Error('Task not found');
          const data = await res.json();
          setTask(data);
        } catch (err) {
          setTask(null);
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [id, username]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'X-Username': username }
        });
        router.push('/');
      } catch (err) {
        alert('Failed to delete task.');
      }
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <p className="text-center mt-8">Loading task...</p>;
  if (!task) return <p className="text-center mt-8">Task not found.</p>;

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{task.title}</h1>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityClass(task.priority)}`}>{task.priority} Priority</span>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Status: <span className="font-medium text-gray-700">{task.status}</span></p>
          <p className="text-gray-500 text-sm">Due Date: <span className="font-medium text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</span></p>
        </div>
        <div className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p>{task.description}</p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link href={`/task/edit/${task.id}`} className="w-full sm:w-auto text-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition">Edit Task</Link>
          <button onClick={handleDelete} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition">Delete Task</button>
          <Link href="/" className="w-full sm:w-auto text-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition">Back to Board</Link>
        </div>
      </div>
    </div>
  );
}