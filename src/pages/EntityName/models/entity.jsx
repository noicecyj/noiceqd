import entityService from '../services/entity';

export default {

  namespace: 'entity',

  state: {
    entityTableData: [],
    entityVisible: false,
    entityFormData: {},
    entityLoadingVisible: true,
    entityTotal: 0,
    entityCurrent: 1,
    entityForm: [],
    entityTable: [],
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
     * 编辑
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
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      entityService.findCatalogByValue(data).then(res => {
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
        dispatch.entity.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        entityFormData: data,
      };
      dispatch.entity.setState(payload);
    },
    /**
     * 获取表单
     *
     * @param {*} data
     */
    async findDataFormByName(data) {
      const dataFormRes = await entityService.findDataFormByName(data);
      const payload = {
        entityForm: dataFormRes.data,
      };
      dispatch.entity.setState(payload);
    },
    /**
     * 获取表格
     *
     * @param {*} data
     */
    async findDataTableByName(data) {
      const dataTableRes = await entityService.findDataTableByName(data);
      const payload = {
        entityTable: dataTableRes.data,
      };
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
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>
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
    // <=============================自定义方法 end   =============================>
  }),
};