import * as React from 'react';
import {
  Show,
  TextField,
  DateField,
  TabbedShowLayout,
  Tab,
} from 'react-admin';
import JsonView from '../../components/JsonView';
import StatusField from '../../components/StatusField';
import ExecuteButton from '../../components/ExecuteButton';

const TaskShowActions = ({ data }) => (
  <ExecuteButton record={data}/>
);

const TaskShow = (props) => (
  <Show title="Task" actions={<TaskShowActions />} {...props}>
    <TabbedShowLayout>
      <Tab label="Task">
        <JsonView source="body" label="Task" />
      </Tab>
      <Tab label="Meta">
        <StatusField source="status" />
        <TextField source="foreignKey" />
        <TextField source="app" />
        <TextField source="event" />
        <DateField source="createdAt" showTime />
        <DateField source="updatedAt" showTime />
      </Tab>
      <Tab label="Request">
        <TextField source="httpMethod" />
        <TextField source="path" />
        <JsonView source="queryStringParameters" />
        <JsonView source="headers" />
        <JsonView source="body" />
      </Tab>
      <Tab label="Subscriptions">
        <JsonView source="task" label="Subscriptions" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default TaskShow;
