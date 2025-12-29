// API utility functions
const API_BASE_URL = 'http://localhost:3001/api';

// Auth token management
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
  localStorage.setItem('authToken', token);
};

export const getAuthToken = (): string | null => {
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  return authToken;
};

export const clearAuthToken = () => {
  authToken = null;
  localStorage.removeItem('authToken');
};

// Auth API
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string; role: 'student' | 'teacher' | 'admin' }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  getProfile: async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get profile');
    }

    return response.json();
  },
};

export interface ChatMessage {
  message: string;
  role: 'student' | 'teacher';
}

export interface ChatResponse {
  response: string;
}

export const chatAPI = {
  sendMessage: async (message: string, role: 'student' | 'teacher'): Promise<ChatResponse> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/chat/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({ message, role }),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error: ${response.status}`);
      } catch (e) {
        if (e instanceof Error) {
          throw e;
        }
        throw new Error(`Server error: ${response.status}`);
      }
    }

    return response.json();
  },
};