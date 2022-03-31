import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Text,
  useDisclosure,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';
import { ModalTaskDetail } from '../../components/Modal/ModalTaskDetail';
import { TaskList } from './TaskList';
import { FirstTask } from './FirstTask';
import { NotFound } from './NotFound';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [actualTask, setActualTask] = useState({} as Task);

  const {
 tasks, loadTasks, notFound, taskNotFound,
} = useTasks();

  const { user, accessToken } = useAuth();

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false));
  }, []);

  const { onClose: onDetailClose, onOpen: onDetailOpen, isOpen: isDetailOpen } = useDisclosure();

  const handleClick = (task: Task) => {
    setActualTask(task);
    onDetailOpen();
  };

  if (notFound) {
    return (
      <NotFound
        isDetailOpen={isDetailOpen}
        onDetailClose={onDetailClose}
        actualTask={actualTask}
        taskNotFound={taskNotFound}
      />
    );
  }

  return (
    <>
      <ModalTaskDetail task={actualTask} onClose={onDetailClose} isOpen={isDetailOpen} />

      {tasks.length === 0 && !loading ? (
        <FirstTask />
      ) : (
        <TaskList handleClick={handleClick} loading={loading} tasks={tasks} />
      )}
    </>
  );
};
