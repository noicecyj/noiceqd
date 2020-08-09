import entitycreaterService from '../services/entitycreater'

export default {

  namespace: 'entitycreater',

  state: {
    formItemLayout: {
      labelCol: { fixedSpan: 8 },
      wrapperCol: { span: 40 }
    },
    ENTITY_TYPE: [],
    YES_NO: [],
    OVERRIDE_METHOD: [],
    DATA_TYPE: [],
    entityData: [],
    primaryKey: 1,
    entityFormData: {},
    drawerVisible: false,
    code: '',
    entityName: '',
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload }
    }
  },

  effects: (dispatch) => ({
    addEntityData(data) {
      const formArr = [];
      let index = 1;
      const newEntity = {
        id: index,
        entityName: 'entityName',
        entityProperty: 'String'
      }
      const entityData = [...data.entityData, newEntity]
      entityData.forEach(item => {
        formArr.push({
          id: index,
          entityName: item.entityName,
          entityProperty: item.entityProperty
        })
        index++;
      })
      const payload = {
        entityData: formArr
      }
      dispatch.entitycreater.setState(payload);
    },
    setEntityData(data) {
      const formArr = [];
      data.entityData.forEach(item => {
        if (item.id === data.record.id) {
          if (data.type === 'input') {
            formArr.push({ ...data.record, entityName: data.entityName });
          } else if (data.type === 'select') {
            formArr.push({ ...data.record, entityProperty: data.entityProperty });
          }
        } else {
          formArr.push(item);
        }
      })
      const payload = {
        entityData: formArr
      }
      dispatch.entitycreater.setState(payload);
    },
    deleteEntityData(data) {
      const formArr = [];
      let index = 1;
      data.entityData.forEach(item => {
        if (item.id !== data.index) {
          formArr.push({
            id: index,
            entityName: item.entityName,
            entityProperty: item.entityProperty,
          })
          index++;
        }
      })
      const payload = {
        entityData: formArr
      }
      dispatch.entitycreater.setState(payload);
    },
    createEntity(data) {
      if (!data.errors) {
        entitycreaterService.createEntity(data).then(res => {
          const payload = {
            code: res.data[0],
            entityName: res.data[1],
            drawerVisible: true
          }
          dispatch.entitycreater.setState(payload);
        })
      } else {
        return false;
      }
    },
    createEntityFile(data) {
      if (!data.errors) {
        entitycreaterService.createEntityFile(data).then(res => {
          const payload = {
            code: res.data[0],
            entityName: res.data[1],
            drawerVisible: true
          }
          dispatch.entitycreater.setState(payload);
        })
      } else {
        return false;
      }
    },
    download(data) {
      const pom = document.createElement('a');
      pom.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data.code)}`);
      pom.setAttribute('download', data.entityName);
      if (document.createEvent) {
        const event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
      } else {
        pom.click();
      }
    },
    findCatalogByValue(data) {
      entitycreaterService.findCatalogByValue(data).then(res => {
        const formArr = [];
        res.data.forEach(item => {
          formArr.push({
            label: item.dictionaryName,
            value: item.dictionaryValue,
          })
        })
        const payload = JSON.parse(JSON.stringify({
          data: formArr,
        }).replace(/data/g, data));
        dispatch.entitycreater.setState(payload);
      })
    },
    upEntityData(data) {
      const formArr = [];
      const formArr2 = [];
      const temp1 = data.entityData[data.index];
      const temp2 = data.entityData[data.index - 1];
      if (temp2) {
        data.entityData.forEach((item, index) => {
          if (index === data.index - 1) {
            formArr.push(temp1)
          } else if (index === data.index) {
            formArr.push(temp2)
          } else {
            formArr.push(item)
          }
        })
        let index = 1;
        formArr.forEach((item) => {
          formArr2.push({
            id: index,
            entityName: item.entityName,
            entityProperty: item.entityProperty,
          })
          index++;
        })
        const payload = {
          entityData: formArr2
        }
        dispatch.entitycreater.setState(payload);
      }
    },
    downEntityData(data) {
      const formArr = [];
      const formArr2 = [];
      const temp1 = data.entityData[data.index];
      const temp2 = data.entityData[data.index + 1];
      if (temp2) {
        data.entityData.forEach((item, index) => {
          if (index === data.index + 1) {
            formArr.push(temp1)
          } else if (index === data.index) {
            formArr.push(temp2)
          } else {
            formArr.push(item)
          }
        })
        let index = 1;
        formArr.forEach((item) => {
          formArr2.push({
            id: index,
            entityName: item.entityName,
            entityProperty: item.entityProperty,
          })
          index++;
        })
        const payload = {
          entityData: formArr2
        }
        dispatch.entitycreater.setState(payload);
      }
    },
  })
};