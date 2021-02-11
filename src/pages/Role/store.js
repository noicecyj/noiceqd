import { createStore } from 'ice';
import role from './models/role';

const store = createStore({
  role,
});

export default store;