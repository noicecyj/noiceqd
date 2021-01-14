import dictionaryService from '../services/dictionary';

export default {

  namespace: 'dictionary',

  state: {
    dictionary: [],
    tableDataSource: [],
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
    /**
     * 获取表格字典
     *
     * @param {*} data
     */
    async findTableCatalogByValue(data) {
      const results = [];
      const formArray = [];
      for (let i = 0; i < data.items.length; i++) {
        const obj = JSON.parse(data.items[i].jsonData);
        if (obj.dataSourceType === 'dictionary' || obj.dataSourceType === 'dataBase') {
          if (obj.dataSourceType === 'dictionary') {
            for (let j = 0; j < data.dataSource.length; j++) {
              results.push(dictionaryService.findDictionaryByCatalogValueAndDictionaryKey({ value: obj.value, key: obj.id }).then(res => {
                console.log(res, 222);
              }));
            }
          } else if (obj.dataSourceType === 'dataBase') {
            for (let k = 0; k < data.dataSource.length; k++) {
              if (data.dataSource[k][obj.dataIndex]) {
                results.push(dictionaryService.selectFindById({ tableName: obj.dataSource, id: data.dataSource[k][obj.dataIndex] }).then(res => {
                  res.data.forEach(item => {
                    const jsonitem = `{"${obj.dataIndex}": "${item.name}"}`;
                    const objitem = JSON.parse(jsonitem);
                    formArray.push({ ...data.dataSource[k], ...objitem });
                  });
                }));
              } else {
                formArray.push({ ...data.dataSource[k] });
              }
            }
          }
        }
      }
      await Promise.all(results);
      console.log(formArray);
      const payload = {
        tableDataSource: formArray
      };
      dispatch.dictionary.setState(payload);

    },
  }),
};
