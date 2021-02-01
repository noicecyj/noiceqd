import { createStore } from 'ice';
import dataTable from './models/dataTable';
import dataTableItem from './models/dataTableItem';

const store = createStore({
  dataTable,
  dataTableItem,
});

export default store;