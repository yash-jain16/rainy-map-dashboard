
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsAPI } from '@/lib/api';
import { toast } from 'sonner';

export interface Project {
  id: string;
  name: string;
  location: string;
  coordinates?: string;
  startDate: string;
  endDate: string;
  status: string;
  rainyDays: {
    predicted: number;
    actual: number;
    remaining: number;
  };
  riskLevel: string;
  lastIncident?: string;
  rainfall?: {
    date: string;
    rainfall: number;
    isRainyDay: boolean;
  }[];
}

export function useProjects() {
  const queryClient = useQueryClient();

  // Get all projects
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsAPI.getProjects,
  });

  // Get a single project by ID
  const getProject = (id: string) => {
    return useQuery({
      queryKey: ['project', id],
      queryFn: () => projectsAPI.getProjectById(id),
      enabled: !!id,
    });
  };

  // Example mutation for creating a project (you'd implement this in your API)
  const createProject = useMutation({
    mutationFn: (newProject: Omit<Project, 'id'>) => 
      fetchFromAPI('/projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
      }),
    onSuccess: () => {
      toast.success('Project created successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });

  return {
    projects: projects as Project[],
    isLoading,
    error,
    getProject,
    createProject,
  };
}

// Helper function (simplified from api.ts for this hook)
async function fetchFromAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const API_BASE_URL = "http://localhost:5000/api";
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Include auth token if available
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `API error: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}
