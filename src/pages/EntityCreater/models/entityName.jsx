import entityNameService from '../services/entityName';

export default {

  namespace: 'entityName',

  state: {
    entityNameTableData: [],
    entityNameVisible: false,
    entityNameFormData: {},
    entityNameTotal: 0,
    entityNameCurrent: 1,
    entityNameLoadingVisible: true,
    formItemLayout: {
      labelCol: {
        fixedSpan: 5,
      },
      wrapperCol: {
        span: 40,
      },
    },
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    entityNamePage(data) {
      entityNameService.entityNamePage(data).then(res => {
        const payload = {
          entityNameTotal: res.data.totalElements,
          entityNameTableData: res.data.content,
          entityNameCurrent: data,
          entityNameLoadingVisible: false,
        };
        dispatch.entityName.setState(payload);
      });
    },
    entityNameEdit(data) {
      if (data) {
        const reg = /\[(.+?)\]/g;
        const fromData = { ...data, relEntity: data.relEntity === null ? null : data.relEntity.match(reg)[0].replace(reg, '$1').split(', ') }
        const payload = {
          entityNameFormData: fromData,
          entityNameVisible: true,
        };
        dispatch.entityName.setState(payload);
      } else {
        const payload = {
          entityNameFormData: {},
          entityNameVisible: true,
        };
        dispatch.entityName.setState(payload);
      }
    },
    entityNameDelete(data) {
      entityNameService.entityNameDelete(data.record).then(() => {
        entityNameService.entityNamePage(data.entityNameCurrent).then(res => {
          const payload = {
            entityNameTotal: res.data.totalElements,
            entityNameTableData: res.data.content,
            entityNameCurrent: data.entityNameCurrent,
          };
          dispatch.entityName.setState(payload);
        });
      });
    },
    entityNameSave(data) {
      entityNameService.entityNameSave(data.entityNameFormData).then(() => {
        entityNameService.entityNamePage(data.entityNameCurrent).then(res => {
          const payload = {
            entityNameTotal: res.data.totalElements,
            entityNameTableData: res.data.content,
            entityNameCurrent: data.entityNameCurrent,
          };
          dispatch.entityName.setState(payload);
        });
      });
      const payload = { entityNameVisible: false };
      dispatch.entityName.setState(payload);
    },
  })
};
