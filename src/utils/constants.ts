export enum Events {
  Connect = 'connect',
  Reconnect = 'reconnect',
  Disconnect = 'disconnect',
  TaskStatuses = 'task-statuses',
  TaskStatus = 'task-status',
  TaskNotify = 'task-notify',
}

export enum EventStatuses {
  NEW = 1000,
  SHOWN = 2000,
  DELETED = 3000,
}
