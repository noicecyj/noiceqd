import { createStore } from 'ice';
import catalog from './models/catalog';
import dictionary from './models/dictionary';

const store = createStore({
  catalog,
  dictionary,
});

export default store;