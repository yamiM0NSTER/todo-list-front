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
import { DateTimePicker } from './DateTimePicker';
import { TextInput } from './materialHooked/TextField';

interface Props {
  handleClose: () => void;
}

interface AddTask {
  title: string;
  text: string;
}

const AddTaskDialog = ({ handleClose }: Props) => {
  const [, loading, error, request] = useApi({
    config: {
      url: '/api/tasks',
      method: 'POST',
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
    addMinutes(new Date(), 10)
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
      <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
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

export { AddTaskDialog };
