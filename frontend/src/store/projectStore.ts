import { create } from 'zustand'

interface Project {
  id: string
  nome: string
  descrizione?: string
  cliente: any
  responsabile: any
  statoAttuale: string
  dataScadenza?: string
  step: any[]
}

interface ProjectStore {
  projects: Project[]
  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  
  setProjects: (projects) => set({ projects }),
  
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      )
    })),
  
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id)
    }))
}))
