import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SubscriptionsCreate from './subscriptionsCreate';
import SubscriptionsEdit from './subscriptionsEdit';
import SubscriptionsList from './subscriptionsList';
import SubscriptionsShow from './subscriptionsShow';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  list: SubscriptionsList,
  create: SubscriptionsCreate,
  edit: SubscriptionsEdit,
  show: SubscriptionsShow,
  icon: SubscriptionsIcon,
};
