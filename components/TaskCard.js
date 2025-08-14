import Link from 'next/link';

export default function TaskCard({ task, onDelete }) {
  const getPriorityBorder = (priority) => {
    switch (priority) {
      case 'High': return 'border-l-4 border-red-500';
      case 'Medium': return 'border-l-4 border-yellow-500';
      case 'Low': return 'border-l-4 border-green-500';
      default: return 'border-l-4 border-gray-300';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 transition-shadow hover:shadow-xl ${getPriorityBorder(task.priority)}`}>
      <Link href={`/task/${task.id}`} className="block mb-2">
        <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600">{task.title}</h3>
      </Link>
      <p className="text-sm text-gray-500 mb-3">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <div className="flex justify-end items-center space-x-2">
        <Link href={`/task/edit/${task.id}`} className="text-sm text-yellow-600 hover:text-yellow-800 font-medium">Edit</Link>
        <button onClick={() => onDelete(task.id)} className="text-sm text-red-600 hover:text-red-800 font-medium">Delete</button>
      </div>
    </div>
  );
}