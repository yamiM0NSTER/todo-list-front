import { TaskStatusDto } from './types';

export const sortStatuses = (statuses: TaskStatusDto[]) => {
  return statuses.sort((a, b) => {
    if (
      new Date(a.notificationTime).valueOf() <
      new Date(b.notificationTime).valueOf()
    ) {
      return -1;
    }
    return 1;
  });
};
