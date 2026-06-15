export interface UserTask {
  id: number;
  userId: number;
  title: string;
  status: string;

  dueTime: string;
  completedAt: string | null;
  rating: number;
  projectId: number | null;
}
