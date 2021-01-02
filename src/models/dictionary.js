import dictionaryService from '../services/dictionary';

export default {

  namespace: 'dictionary',

  state: {
    dictionary: [],
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    /**
     * 获取字典
     *
     * @param {*} data
     */
    async findCatalogByValue(data) {
      const formArray = [];
      const results = [];
      for (let i = 0; i < data.length; i++) {
        const obj = JSON.parse(data[i].jsonData);
        if (obj.dataSourceType === 'dictionary') {
          if ((obj.type === 'Select' || obj.type === 'Radio' || obj.type === 'Checkbox') && obj.dataSource !== null) {
            results.push(dictionaryService.findCatalogByValue(obj.dataSource).then(res => {
              const formArr = [];
              res.forEach(item => {
                formArr.push({
                  label: item.dictionaryName,
                  value: item.dictionaryValue,
                });
              });
              formArray.push({ ...obj, dataSource: formArr });
            }));
          }
        } else if (obj.dataSourceType === 'dataBase') {
          results.push(dictionaryService.selectFindAll(obj.dataSource).then(res => {
            const formArr = [];
            res.data.forEach(item => {
              formArr.push({
                label: item.name,
                value: item.id,
              });
            });
            formArray.push({ ...obj, dataSource: formArr });
          }));
        } else {
          formArray.push(obj);
        }
      }
      await Promise.all(results);
      const payload = {
        dictionary: formArray
      };
      dispatch.dictionary.setState(payload);
    },
  }),
};
