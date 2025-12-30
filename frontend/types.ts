
export enum IssuePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum IssueStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in-progress',
  CLOSED = 'closed'
}

export interface User {
  fullName: string;
  role: string;
  age: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IssueFilters {
  status?: IssueStatus;
  priority?: IssuePriority;
  search?: string;
}

export interface AppState {
  issues: Issue[];
  loading: boolean;
  error: string | null;
  filters: IssueFilters;
}
