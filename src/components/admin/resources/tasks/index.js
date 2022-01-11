import TaskIcon from '@material-ui/icons/EventNote';
import TasksList from './tasksList';
import TasksShow from './tasksShow';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  list: TasksList,
  show: TasksShow,
  icon: TaskIcon,
};
