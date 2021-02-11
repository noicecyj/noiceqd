import { createStore } from 'ice';
import api from './models/api';

const store = createStore({
  api,
});

export default store;