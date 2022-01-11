import MessageIcon from '@material-ui/icons/Message';
import MessagesList from './messagesList';
import MessagesShow from './messagesShow';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  list: MessagesList,
  show: MessagesShow,
  icon: MessageIcon,
};
