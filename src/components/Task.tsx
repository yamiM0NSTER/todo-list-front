import { IconButton, Paper, Typography } from '@material-ui/core';
import { TaskStatusDto } from '../utils/types';
import { format, parseISO } from 'date-fns';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import classes from './Task.module.scss';
import { EventStatuses } from '../utils/constants';
import { useEffect, useState } from 'react';
import { EditTaskDialog } from './EditTaskDialog';
import { DeleteTaskDialog } from './DeleteTaskDialog';

interface Props {
  status: TaskStatusDto;
}

const Task = ({ status }: Props) => {
  const [showButtons, setShowButtons] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    console.log(status);
    setShowButtons(status.status === EventStatuses.NEW);
  }, [status]);

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  return (
    <Paper
      elevation={1}
      className={classes['paper']}
      classes={{
        root:
          status.status === EventStatuses.NEW
            ? classes['paper-root']
            : classes['paper-root-shown'],
      }}
    >
      <Typography variant="h6">
        {format(new Date(status.notificationTime), 'yyyy-MM-dd HH:mm')} |{' '}
        {status.title} | {status.assignee}
      </Typography>
      {showButtons && (
        <div className={classes['buttons']}>
          <IconButton
            aria-label="edit"
            className={classes['button']}
            onClick={() => {
              setShowEditDialog(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            className={classes['button']}
            onClick={() => {
              setShowDeleteDialog(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {showEditDialog && (
        <EditTaskDialog handleClose={handleCloseEditDialog} task={status} />
      )}
      {showDeleteDialog && (
        <DeleteTaskDialog handleClose={handleCloseDeleteDialog} task={status} />
      )}
    </Paper>
  );
};

export { Task };
