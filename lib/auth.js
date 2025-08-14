const AUTH_KEY = 'task-manager-user';

export const login = (username) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, username);
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
};

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem(AUTH_KEY);
  }
  return false;
};

export const getUsername = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_KEY);
  }
  return null;
};