import { createStore } from 'ice';
import appService from './models/appService';

const store = createStore({
  appService,
});

export default store;