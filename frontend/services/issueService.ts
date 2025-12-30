
import { Issue, IssuePriority, IssueStatus, IssueFilters } from '../types';

const STORAGE_KEY = 'nexus_issues_db_v1';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initialData: Issue[] = [
  {
    id: '1',
    title: '3D Background Flickering',
    description: 'The background grid appears to flicker when scrolling rapidly on high-refresh monitors.',
    priority: IssuePriority.MEDIUM,
    status: IssueStatus.OPEN,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    title: 'Security: API Token Exposure',
    description: 'Recent logs show potential exposure of development API keys in client-side error boundaries.',
    priority: IssuePriority.HIGH,
    status: IssueStatus.IN_PROGRESS,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
  }
];

const getStoredIssues = (): Issue[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

const setStoredIssues = (issues: Issue[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
};

export const issueService = {
  getIssues: async (filters?: IssueFilters): Promise<Issue[]> => {
    await delay(300);
    let issues = getStoredIssues();

    if (filters) {
      if (filters.status) {
        issues = issues.filter(i => i.status === filters.status);
      }
      if (filters.priority) {
        issues = issues.filter(i => i.priority === filters.priority);
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        issues = issues.filter(i => 
          i.title.toLowerCase().includes(query) || 
          i.description.toLowerCase().includes(query)
        );
      }
    }

    return issues;
  },

  createIssue: async (data: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue> => {
    await delay(400);
    const issues = getStoredIssues();
    const newIssue: Issue = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setStoredIssues([newIssue, ...issues]);
    return newIssue;
  },

  updateIssue: async (id: string, updates: Partial<Issue>): Promise<Issue> => {
    await delay(300);
    const issues = getStoredIssues();
    const index = issues.findIndex(i => String(i.id) === String(id));
    if (index === -1) throw new Error('Issue not found');

    const updatedIssue = {
      ...issues[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const newIssues = [...issues];
    newIssues[index] = updatedIssue;
    setStoredIssues(newIssues);
    return updatedIssue;
  },

  deleteIssue: async (id: string): Promise<void> => {
    await delay(300);
    const issues = getStoredIssues();
    const filteredIssues = issues.filter(i => String(i.id) !== String(id));
    setStoredIssues(filteredIssues);
  }
};
