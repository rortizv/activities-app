export interface Activity {
  activityId: string;
  title: string;
  type: string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  status?: string | null;
}
