export interface TaskStatusDto {
  guid: string;
  title: string;
  notificationText: string;
  notificationTime: Date;
  assignee: string;
  status: number;
}

export {};
