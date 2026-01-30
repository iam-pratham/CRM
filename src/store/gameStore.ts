import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'completed';
export type Priority = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  title: string;
  client: string;
  status: 'Active' | 'In Review' | 'Planning' | 'Blocked' | 'Completed';
  progress: number;
  dueDate: string;
  members: string[];
  color: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  points: number; // This will now represent the BASE value
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
}

export interface UserState {
  name: string;
  role: 'admin' | 'employee';
  points: number;
  streak: number;
  completedTasks: number;
  level: number;
}

interface GameStore {
  user: UserState;
  tasks: Task[];
  projects: Project[];
  
  // Actions
  login: (name: string, role: 'admin' | 'employee') => void;
  logout: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'status' | 'points' | 'completedAt'>) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'progress' | 'members' | 'color'>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  addPoints: (amount: number) => void;
  incrementStreak: () => void;
}

// Point Configuration
const POINTS_CONFIG = {
  CREATION_REWARD: 10, // Points for creating a task
  BASE: {
    low: 50,
    medium: 100,
    high: 200,
  },
  ON_TIME_BONUS: 20,
  LATE_PENALTY_MULTIPLIER: 0.5,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      user: {
        name: '',
        role: 'employee',
        points: 0,
        streak: 0,
        completedTasks: 0,
        level: 1,
      },
      tasks: [
        {
          id: '1',
          title: 'Design Dashboard UI',
          description: 'Create the main dashboard layout with stats.',
          status: 'in_progress',
          priority: 'high',
          points: 200,
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        },
        {
          id: '2',
          title: 'Setup Database Schema',
          description: 'Define tables for users, tasks, and points.',
          status: 'completed',
          priority: 'high',
          points: 200,
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        },
      ],
      projects: [
        {
          id: '1',
          title: "Q1 Marketing Campaign",
          client: "Acme Corp",
          status: "Active",
          progress: 65,
          dueDate: "2024-03-31",
          members: ["AM", "SC", "JD"],
          color: "bg-emerald-500",
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: "Website Redesign",
          client: "Globex Inc",
          status: "In Review",
          progress: 90,
          dueDate: "2024-02-15",
          members: ["AM", "BW"],
          color: "bg-indigo-500",
          createdAt: new Date().toISOString(),
        },
      ],
      
      login: (name, role) =>
        set((state) => ({
          user: { ...state.user, name, role },
        })),

      logout: () =>
        set((state) => ({
          user: { ...state.user, name: '', role: 'employee' },
        })),
      
      addProject: (project) =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              ...project,
              id: Math.random().toString(36).substring(7),
              progress: 0,
              members: ["AM"], // Default to current user
              color: "bg-blue-500", // Default color
              createdAt: new Date().toISOString(),
            }
          ]
        })),

      addTask: (task) =>
        set((state) => {
          // Award creation points immediately
          const newPoints = state.user.points + POINTS_CONFIG.CREATION_REWARD;
          
          return {
            user: { ...state.user, points: newPoints },
            tasks: [
              ...state.tasks,
              {
                ...task,
                id: Math.random().toString(36).substring(7),
                status: 'todo',
                points: POINTS_CONFIG.BASE[task.priority], // Auto-assign base points
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }),
        
      updateTaskStatus: (taskId, status) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          const isCompleting = status === 'completed' && task?.status !== 'completed';
          
          if (isCompleting && task) {
             const now = new Date();
             const dueDate = task.dueDate ? new Date(task.dueDate) : null;
             let finalPoints = task.points;
             
             // Check if late
             if (dueDate && now > dueDate) {
               finalPoints = Math.floor(task.points * POINTS_CONFIG.LATE_PENALTY_MULTIPLIER);
             } else if (dueDate) {
               // On time bonus
               finalPoints += POINTS_CONFIG.ON_TIME_BONUS;
             }

             return {
               tasks: state.tasks.map((t) =>
                 t.id === taskId ? { ...t, status, completedAt: now.toISOString() } : t
               ),
               user: {
                 ...state.user,
                 points: state.user.points + finalPoints,
                 completedTasks: state.user.completedTasks + 1,
               }
             };
          }
          
          return {
            tasks: state.tasks.map((t) =>
              t.id === taskId ? { ...t, status } : t
            ),
          };
        }),
        
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),
        
      addPoints: (amount) =>
        set((state) => ({
          user: { ...state.user, points: state.user.points + amount },
        })),
        
      incrementStreak: () =>
        set((state) => ({
          user: { ...state.user, streak: state.user.streak + 1 },
        })),
    }),
    {
      name: 'gamified-crm-storage',
    }
  )
);
