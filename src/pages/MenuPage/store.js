import { createStore } from 'ice';
import menuPage from './models/menuPage';

const store = createStore({
  menuPage,
});

export default store;