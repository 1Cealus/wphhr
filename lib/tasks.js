const globalForTasks = global;
if (!globalForTasks.serverSideTasks) {
  globalForTasks.serverSideTasks = {};
}
const serverSideTasks = globalForTasks.serverSideTasks;

const getUserTasks = (username) => {
    if (!username) return [];
    if (!serverSideTasks[username]) {
        serverSideTasks[username] = [];
    }
    return serverSideTasks[username];
}

export const getTasks = (username) => {
    return getUserTasks(username);
};

export const getTaskById = (username, id) => {
    const userTasks = getUserTasks(username);
    return userTasks.find(t => t.id === id);
};

export const createTask = (username, data) => {
    const userTasks = getUserTasks(username);
    const newTask = { id: Date.now().toString(), ...data };
    userTasks.push(newTask);
    return newTask;
};

export const updateTask = (username, id, data) => {
    const userTasks = getUserTasks(username);
    const index = userTasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    userTasks[index] = { ...userTasks[index], ...data };
    return userTasks[index];
};

export const deleteTask = (username, id) => {
    const userTasks = getUserTasks(username);
    const initialLength = userTasks.length;
    serverSideTasks[username] = userTasks.filter(t => t.id !== id);
    return serverSideTasks[username].length < initialLength;
};