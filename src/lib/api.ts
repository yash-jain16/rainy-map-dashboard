
/**
 * API utilities for connecting to the external PostgreSQL database API
 */

// Set your API base URL here
const API_BASE_URL = "http://localhost:5000/api"; // Change this to your actual API URL

/**
 * Generic fetch function with error handling
 */
export async function fetchFromAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Include auth token if available (from localStorage)
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle non-2xx responses
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API error: ${response.status} ${response.statusText}`
    );
  }

  // Parse JSON response
  return await response.json();
}

/**
 * Auth-related API functions
 */
export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchFromAPI<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  
  getCurrentUser: async () => {
    return fetchFromAPI<{ user: any }>("/auth/me");
  },
};

/**
 * Project-related API functions (example)
 */
export const projectsAPI = {
  getProjects: async () => {
    return fetchFromAPI<any[]>("/projects");
  },
  
  getProjectById: async (id: string) => {
    return fetchFromAPI<any>(`/projects/${id}`);
  },
};

/**
 * Weather-related API functions (example)
 */
export const weatherAPI = {
  getRainfallData: async (projectId: string) => {
    return fetchFromAPI<any[]>(`/weather/rainfall/${projectId}`);
  },
};
