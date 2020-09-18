import entitycreaterService from '../services/entitycreater'

export default {

  namespace: 'entitycreater',

  state: {
    entityNameTableData: [],
    entityNameVisible: false,
    entityNameFormData: {},
    entityNameTotal: 0,
    entityNameCurrent: 1,
    entityNameLoadingVisible: true,
    entityTableData: [],
    entityVisible: false,
    entityFormData: {},
    entityTotal: 0,
    entityCurrent: 1,
    entityLoadingVisible: true,
    divVisible: true,
    entityNameId: '',
    formItemLayout: {
      labelCol: {
        fixedSpan: 5
      },
      wrapperCol: {
        span: 40
      }
    },
    ENTITY_TYPE: [],
    DATA_TYPE: []
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload }
    }
  },

  effects: (dispatch) => ({
    entityNamePage(data) {
      entitycreaterService.entityNamePage(data).then(res => {
        if (data === 1) {
          const payload = {
            entityNameTotal: res.data.totalElements,
            entityNameTableData: res.data.content,
            entityNameLoadingVisible: false
          }
          dispatch.entitycreater.setState(payload);
        } else {
          const payload = {
            entityNameTotal: res.data.totalElements,
            entityNameTableData: res.data.content,
            entityNameLoadingVisible: false,
            divVisible: true
          }
          dispatch.entitycreater.setState(payload);
        }
      })
    },
    entityNameEdit(data) {
      if (data) {
        const payload = {
          entityNameFormData: data,
          entityNameVisible: true
        }
        dispatch.entitycreater.setState(payload);
      } else {
        const payload = {
          entityNameFormData: {},
          entityNameVisible: true
        }
        dispatch.entitycreater.setState(payload);
      }
    },
    entityNameDelete(data) {
      entitycreaterService.entityNameDelete(data.record).then(() => {
        entitycreaterService.entityNamePage(data.entityNameCurrent).then(res => {
          const payload = {
            entityNameTotal: res.data.totalElements,
            entityNameTableData: res.data.content,
            entityNameCurrent: data.entityNameCurrent,
            divVisible: true
          }
          dispatch.entitycreater.setState(payload);
        })
      })
    },
    entityNameSave(data) {
      entitycreaterService.entityNameSave(data.entityNameFormData).then(() => {
        entitycreaterService.entityNamePage(data.entityNameCurrent).then(res => {
          const payload = {
            entityNameTotal: res.data.totalElements,
            entityNameTableData: res.data.content,
            entityNameCurrent: data.entityNameCurrent,
            divVisible: true
          }
          dispatch.entitycreater.setState(payload);
        })
      })
      const payload = { entityNameVisible: false }
      dispatch.entitycreater.setState(payload);
    },
    entityPage(data) {
      entitycreaterService.entityPage(data.id, data.current).then(res => {
        const payload = {
          entityTotal: res.data.totalElements,
          entityTableData: res.data.content,
          entityLoadingVisible: false
        }
        dispatch.entitycreater.setState(payload);
      })
    },
    entityEdit(data) {
      if (data) {
        const payload = { entityFormData: data, entityVisible: true }
        dispatch.entitycreater.setState(payload);
      } else {
        const payload = { entityFormData: {}, entityVisible: true }
        dispatch.entitycreater.setState(payload);
      }
    },
    entityDelete(data) {
      entitycreaterService.entityDelete(data.record).then(() => {
        entitycreaterService.entityPage(data.record.id, data.entityCurrent).then(res => {
          const payload = {
            entityTotal: res.data.totalElements,
            entityTableData: res.data.content,
            entityCurrent: data.entityCurrent
          }
          dispatch.entitycreater.setState(payload);
        })
      })
    },
    entitySave(data) {
      entitycreaterService.entitySave(data.entityFormData, data.entityNameId).then(() => {
        entitycreaterService.entityPage(data.entityNameId, data.entityCurrent).then(res => {
          const payload = {
            entityTotal: res.data.totalElements,
            entityTableData: res.data.content,
            entityCurrent: data.entityCurrent
          }
          dispatch.entitycreater.setState(payload);
        })
      })
      const payload = { entityVisible: false }
      dispatch.entitycreater.setState(payload);
    },
    onRowClick(data) {
      entitycreaterService.entityPage(data.record.id, 1).then(res => {
        const payload = {
          divVisible: !data.selected,
          entityTotal: res.data.totalElements,
          entityTableData: res.data.content,
          entityCurrent: 1
        }
        dispatch.entitycreater.setState(payload);
      });
      const payload = {
        entityNameId: data.record.id,
        entityLoadingVisible: false
      }
      dispatch.entitycreater.setState(payload);
    },
    findCatalogByValue(data) {
      entitycreaterService.findCatalogByValue(data).then(res => {
        const formArr = [];
        res.forEach(item => {
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
    upEntity(data) {
      entitycreaterService.upEntity(data.record.id).then(() => {
        entitycreaterService.entityPage(data.record.pid, data.entityCurrent).then(res => {
          const payload = {
            entityTotal: res.data.totalElements,
            entityTableData: res.data.content,
            entityCurrent: data.entityCurrent
          }
          dispatch.entitycreater.setState(payload);
        })
      })
      const payload = { entityVisible: false }
      dispatch.entitycreater.setState(payload);
    },
    downEntity(data) {
      entitycreaterService.downEntity(data.record.id).then(() => {
        entitycreaterService.entityPage(data.record.pid, data.entityCurrent).then(res => {
          const payload = {
            entityTotal: res.data.totalElements,
            entityTableData: res.data.content,
            entityCurrent: data.entityCurrent
          }
          dispatch.entitycreater.setState(payload);
        })
      })
      const payload = { entityVisible: false }
      dispatch.entitycreater.setState(payload);
    },
    createEntityFile(data) {
      entitycreaterService.createEntityFile(data);
    },
  })
};