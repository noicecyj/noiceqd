import { createStore } from 'ice';
import dataForm from './models/dataForm';
import dataFormItem from './models/dataFormItem';

const store = createStore({
  dataForm,
  dataFormItem,
});

export default store;