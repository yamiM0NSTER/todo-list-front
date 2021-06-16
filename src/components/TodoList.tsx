import { IconButton, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { Events } from '../utils/constants';
import { TaskStatusDto } from '../utils/types';
import { Task } from './Task';

import AddBoxIcon from '@material-ui/icons/AddBox';

import classes from './TodoList.module.scss';
import { AddTaskDialog } from './AddTaskDialog';

interface Props {
  tasks: TaskStatusDto[];
}

const TodoList = ({ tasks }: Props) => {
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

  const onAddButtonClick = () => {
    setShowAddDialog(true);
    console.log('add');
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
  };

  return (
    <>
      <Paper elevation={1} className={classes['paper']}>
        <div className={classes['header']}>
          <Typography variant="h5" className={classes['text']}>
            Tasks:
          </Typography>
          <div className={classes['add']}>
            <IconButton
              aria-label="add"
              className={classes['button']}
              onClick={onAddButtonClick}
            >
              <AddBoxIcon />
            </IconButton>
          </div>
        </div>
        {tasks.map(task => {
          return <Task key={task.guid} status={task} />;
        })}
      </Paper>
      {showAddDialog && <AddTaskDialog handleClose={handleCloseDialog} />}
    </>
  );
};

export { TodoList };
