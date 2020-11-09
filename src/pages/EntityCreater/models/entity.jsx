import entityService from '../services/entity';

export default {

  namespace: 'entity',

  state: {
    entityTableData: [],
    entityVisible: false,
    entityFormData: {},
    entityTotal: 0,
    entityCurrent: 1,
    entityLoadingVisible: true,
    divVisible: true,
    formItemLayout: {
      labelCol: {
        fixedSpan: 5,
      },
      wrapperCol: {
        span: 40,
      },
    },
    entityNameId: '',
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    entityPage(data) {
      entityService.entityPage(data.id, data.current).then(res => {
        const payload = {
          entityTotal: res.data.totalElements,
          entityTableData: res.data.content,
          entityLoadingVisible: false,
        };
        dispatch.entity.setState(payload);
      });
    },
    entityEdit(data) {
      if (data) {
        const payload = { entityFormData: data, entityVisible: true };
        dispatch.entity.setState(payload);
      } else {
        const payload = { entityFormData: {}, entityVisible: true };
        dispatch.entity.setState(payload);
      }
    },
    entityDelete(data) {
      entityService.entityDelete(data.record).then(() => {
        entityService.entityPage(data.record.id, data.entityCurrent).then(res => {
          const payload = {
            entityTotal: res.data.totalElements,
            entityTableData: res.data.content,
            entityCurrent: data.entityCurrent,
          };
          dispatch.entity.setState(payload);
        });
      });
    },
    entitySave(data) {
      entityService.entitySave(data.entityFormData, data.entityNameId).then(() => {
        entityService.entityPage(data.entityNameId, data.entityCurrent).then(res => {
          const payload = {
            entityTotal: res.data.totalElements,
            entityTableData: res.data.content,
            entityCurrent: data.entityCurrent,
          };
          dispatch.entity.setState(payload);
        });
      });
      const payload = { entityVisible: false };
      dispatch.entity.setState(payload);
    },
    onRowClick(data) {
      entityService.entityPage(data.record.id, 1).then(res => {
        const payload = {
          divVisible: !data.selected,
          entityTotal: res.data.totalElements,
          entityTableData: res.data.content,
          entityCurrent: 1,
        };
        dispatch.entity.setState(payload);
      });
      const payload = {
        entityNameId: data.record.id,
        entityLoadingVisible: false,
      };
      dispatch.entity.setState(payload);
    },
    upEntity(data) {
      entityService.upEntity(data.record.id).then(() => {
        entityService.entityPage(data.record.pid, data.entityCurrent).then(res => {
          const payload = {
            entityTotal: res.data.totalElements,
            entityTableData: res.data.content,
            entityCurrent: data.entityCurrent,
          };
          dispatch.entity.setState(payload);
        });
      });
      const payload = { entityVisible: false };
      dispatch.entity.setState(payload);
    },
    downEntity(data) {
      entityService.downEntity(data.record.id).then(() => {
        entityService.entityPage(data.record.pid, data.entityCurrent).then(res => {
          const payload = {
            Total: res.data.totalElements,
            entityTableData: res.data.content,
            entityCurrent: data.entityCurrent,
          };
          dispatch.entity.setState(payload);
        });
      });
      const payload = { entityVisible: false };
      dispatch.entity.setState(payload);
    },
  }),
};
