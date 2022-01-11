import * as React from 'react';
import { Fragment } from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  Pagination,
  BulkDeleteButton,
} from 'react-admin';
import StatusField from '../../components/StatusField';
import MessagesFilter from './messagesFilter';
import BulkExecuteButton from '../../components/BulkExecuteButton';

const MessagesBulkActionButtons = (props) => (
  <Fragment>
    <BulkExecuteButton {...props} />
    <BulkDeleteButton {...props} />
  </Fragment>
);

const MessagesList = (props) => {
  return (
    <List {...props}
      perPage={25}
      filters={<MessagesFilter />}
      pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
      sort={{ field: 'createdAt', order: 'DESC' }}
      bulkActionButtons={<MessagesBulkActionButtons />}
    >
      <Datagrid
        rowClick="show"
      >
        <StatusField source="status" />
        <TextField source="app"/>
        <TextField source="event"/>
        <TextField source="foreignKey"/>
        <DateField source="createdAt" showTime/>
      </Datagrid>
    </List>
  );
};

export default MessagesList;
