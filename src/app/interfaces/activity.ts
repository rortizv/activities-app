export interface Activity {
  activityId: string;
  title: string;
  type: string;
  startDate?: string | null;
  endDate?: string | null;
  status?: string | null;
}

export interface ActivityType {
  name: string;
  value: string;
}

export interface ActivityStatus {
  name: string;
  value: string;
}
