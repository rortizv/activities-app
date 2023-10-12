export interface Activity {
  activityId: number;
  title: string;
  type: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  status: string | null;
}
