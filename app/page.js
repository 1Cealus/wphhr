'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TaskCard from '../components/TaskCard';
import { getUsername } from '../lib/auth';

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {

    setUsername(getUsername());
  }, []);


  const fetchTasks = async () => {
    if (!username) return; 
    try {
      setLoading(true);
      const res = await fetch('/api/tasks', {
        headers: { 'X-Username': username }
      });
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [username]); 


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'X-Username': username }
        });
        if (!res.ok) throw new Error('Failed to delete task');
        fetchTasks(); 
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const tasksToDo = tasks.filter(task => task.status === 'To Do');
  const tasksInProgress = tasks.filter(task => task.status === 'In Progress');
  const tasksCompleted = tasks.filter(task => task.status === 'Completed');

  if (loading) return <p className="text-center mt-8">Loading tasks...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Task Board</h1>
        <Link href="/task/create" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          + Add New Task
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 border-b-2 border-red-400 pb-2">To Do ({tasksToDo.length})</h2>
          <div className="space-y-4">
            {tasksToDo.length > 0 ? tasksToDo.map(task => <TaskCard key={task.id} task={task} onDelete={handleDelete} />) : <p className="text-gray-500 text-center pt-4">No tasks here!</p>}
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 border-b-2 border-yellow-400 pb-2">In Progress ({tasksInProgress.length})</h2>
          <div className="space-y-4">
            {tasksInProgress.length > 0 ? tasksInProgress.map(task => <TaskCard key={task.id} task={task} onDelete={handleDelete} />) : <p className="text-gray-500 text-center pt-4">No tasks in progress.</p>}
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700 border-b-2 border-green-400 pb-2">Completed ({tasksCompleted.length})</h2>
          <div className="space-y-4">
            {tasksCompleted.length > 0 ? tasksCompleted.map(task => <TaskCard key={task.id} task={task} onDelete={handleDelete} />) : <p className="text-gray-500 text-center pt-4">No completed tasks yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}