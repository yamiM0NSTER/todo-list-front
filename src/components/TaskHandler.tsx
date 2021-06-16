import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { Events, EventStatuses } from '../utils/constants';
import { TaskStatusDto } from '../utils/types';
import { sortStatuses } from '../utils/utils';
import { TodoList } from './TodoList';

const TaskHandler = () => {
  const [sortedStatuses, setSortedStatuses] = useState<TaskStatusDto[]>([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useSocket<TaskStatusDto[]>(Events.TaskStatuses, statuses => {
    console.log('statuses received');
    console.log(statuses);

    setSortedStatuses(sortStatuses(statuses));
  });

  useSocket<TaskStatusDto>(Events.TaskStatus, status => {
    console.log('status received');
    console.log(status);

    const statuses = [...sortedStatuses];

    const taskIndex = statuses.findIndex(task => {
      return task.guid === status.guid;
    });

    if (taskIndex > -1) {
      if (status.status === EventStatuses.DELETED) {
        statuses.splice(taskIndex, 1);
      } else {
        statuses[taskIndex] = status;
      }
    } else {
      statuses.push(status);
    }
    setSortedStatuses(sortStatuses(statuses));
  });

  useEffect(() => {}, [sortStatuses]);

  useSocket<string>(Events.TaskNotify, guid => {
    console.log('Task notification received');
    console.log(guid);

    const task = sortedStatuses.find(task => {
      return task.guid === guid;
    });

    enqueueSnackbar(`${task?.title}: ${task?.notificationText}`);
  });

  return <TodoList tasks={sortedStatuses} />;
};

export { TaskHandler };
