export interface Task {
  id: string;
  description: string;
  title: string;
  status: string;
  dueDate: string;
}

export interface UpdateTask {
  title?: string;
  description?: string;
  status?: string;
  dueDate?: string;
}
