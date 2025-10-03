export interface Tasks {
  searchTasks: string;
  addTask: string;
}

export interface TaskApi {
  id: number;
  id_user: number;
  titulo: string;
  status_label: string; // Enum
  status: string; // booleano
  created_at: string;
  updated_at: string;
}

export interface modalAddEdit {
  status: string;
}

export interface OptionsStatus {
  value: string;
  label: string;
  inactive?: boolean;
}
