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
    entityNameId: '',
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    /**
     * 数据
     *
     * @param {*} data
     */
    entityPage(data) {
      entityService.entityPage(data.id, data.current).then(res => {
        const payload = {
          entityTotal: res.data.totalElements,
          entityTableData: res.data.content,
          entityCurrent: data.current,
          entityLoadingVisible: false,
        };
        dispatch.entity.setState(payload);
      });
    },
    /**
     * 数据
     *
     * @param {*} data
     */
    entityEdit(data) {
      if (data) {
        const fromData = {
          ...data,
        };
        const payload = {
          entityFormData: fromData,
          entityVisible: true,
        };
        dispatch.entity.setState(payload);
      } else {
        const payload = {
          entityFormData: {},
          entityVisible: true,
        };
        dispatch.entity.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
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
    /**
     * 保存
     *
     * @param {*} data
     */
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
    // <=============================可选方法 start =============================>
    /**
     * 点击行
     *
     * @param {*} data
     */
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
    /**
     * 上移
     *
     * @param {*} data
     */
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
    /**
     * 下移
     *
     * @param {*} data
     */
    downEntity(data) {
      entityService.downEntity(data.record.id).then(() => {
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
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>

    // <=============================自定义方法 end   =============================>
  }),
};
