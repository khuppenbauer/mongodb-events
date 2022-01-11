import * as React from 'react';
import { Admin, Resource } from 'react-admin';

import './App.css';
import dataProvider from './components/admin/dataProvider/dataProvider';
import theme from './components/admin/themes/default'
import messages from './components/admin/resources/messages';
import tasks from './components/admin/resources/tasks';
import subscriptions from './components/admin/resources/subscriptions';
import logs from './components/admin/resources/logs';

const App = () => (
  <Admin theme={theme} dataProvider={dataProvider} disableTelemetry>
    <Resource name="messages" {...messages} />
    <Resource name="tasks" {...tasks} />
    <Resource name="subscriptions" {...subscriptions} />
    <Resource name="logs" {...logs} />
  </Admin>
);

export default App;
