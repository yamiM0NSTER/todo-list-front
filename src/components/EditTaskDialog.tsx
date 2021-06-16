import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { addMinutes, subSeconds } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '../hooks/useApi';
import { TaskStatusDto } from '../utils/types';
import { DateTimePicker } from './DateTimePicker';
import { TextInput } from './materialHooked/TextField';

interface Props {
  handleClose: () => void;
  task: TaskStatusDto;
}

interface AddTask {
  title: string;
  text: string;
}

const EditTaskDialog = ({ handleClose, task }: Props) => {
  const [, loading, error, request] = useApi({
    config: {
      url: `/api/tasks/${task.guid}`,
      method: 'PATCH',
    },
  });

  const submit = async () => {
    await request({
      title: 'XD',
      notificationText: 'xF',
      notificationTime: new Date(Date.now().valueOf() + 60 * 1000),
    });
    handleClose();
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(task.notificationTime)
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const { control, handleSubmit } = useForm<AddTask>();

  const handleFormSubmit = async (payload: AddTask) => {
    await request({
      title: payload.title,
      notificationText: payload.text,
      notificationTime: subSeconds(selectedDate!, selectedDate!.getSeconds()),
    });
    handleClose();
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
      <DialogContent>
        <TextInput
          // autoFocus
          // margin="dense"
          // id="name"
          label="Title"
          // type="email"
          fullWidth
          name="title"
          control={control}
          defaultValue={task.title}
        />
        <TextInput
          // autoFocus
          // margin="dense"
          // id="name"
          label="Text"
          // type="email"
          fullWidth
          name="text"
          control={control}
          defaultValue={task.notificationText}
        />
        <DateTimePicker
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          color="primary"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { EditTaskDialog };
