// API utility functions
const API_BASE_URL = 'http://localhost:5000/api';

export interface ChatMessage {
  message: string;
  role: 'student' | 'teacher';
}

export interface ChatResponse {
  response: string;
}

export const chatAPI = {
  sendMessage: async (message: string, role: 'student' | 'teacher'): Promise<ChatResponse> => {
    const response = await fetch(`${API_BASE_URL}/chat/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Add authorization header when auth is implemented
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message, role }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  },
};