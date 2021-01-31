import { createStore } from 'ice';
import entityName from './models/entityName';
import entity from './models/entity';

const store = createStore({
  entityName,
  entity,
});

export default store;