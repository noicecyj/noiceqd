import entitycreaterService from '../services/entitycreater';

export default {

  namespace: 'entitycreater',

  state: {
    ENTITY_TYPE: [],
    DATA_TYPE: [],
    SELECT_ENTITY: [],
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    findCatalogByValue(data) {
      entitycreaterService.findCatalogByValue(data).then(res => {
        const formArr = [];
        res.forEach(item => {
          formArr.push({
            label: item.dictionaryName,
            value: item.dictionaryValue,
          });
        });
        const payload = JSON.parse(JSON.stringify({
          data: formArr,
        }).replace(/data/g, data));
        dispatch.entitycreater.setState(payload);
      });
    },
    selectEntityFindAll(data) {
      entitycreaterService.selectEntityFindAll().then(res => {
        const formArr = [];
        res.data.forEach(item => {
          formArr.push({
            label: item.name,
            value: item.id,
          });
        });
        const payload = JSON.parse(JSON.stringify({
          datas: formArr,
        }).replace(/datas/g, data));
        dispatch.entitycreater.setState(payload);
      });
    },
    createEntityFile(data) {
      entitycreaterService.createEntityFile(data);
    },
    createComponentFile(data) {
      entitycreaterService.createComponentFile(data);
    },
  }),
};
