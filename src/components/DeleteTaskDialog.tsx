import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useApi } from '../hooks/useApi';
import { TaskStatusDto } from '../utils/types';

interface Props {
  handleClose: () => void;
  task: TaskStatusDto;
}

interface AddTask {
  title: string;
  text: string;
}

const DeleteTaskDialog = ({ handleClose, task }: Props) => {
  const [, loading, error, request] = useApi({
    config: {
      url: `/api/tasks/${task.guid}`,
      method: 'DELETE',
    },
  });

  const handleFormSubmit = async () => {
    await request();
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
        <DialogContentText>
          Are you sure you want to remove selected task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeleteTaskDialog };
