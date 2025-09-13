const API_URL = 'http://localhost:3001/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('streamix-token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || 'An API error occurred');
    }
    if (response.status === 204) { // No Content
        return null;
    }
    return response.json();
};

export const apiService = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);
    },
    post: async <T>(endpoint: string, body: any): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return handleResponse(response);
    },
    put: async <T>(endpoint: string, body: any): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return handleResponse(response);
    },
    delete: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);
    },
};