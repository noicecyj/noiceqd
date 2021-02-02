import entityService from '../services/entity';
import initService from '../../../services/init';

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
    async entityPage(data) {
      const dataRes = await entityService.entityPage(data.entityNameId, data.current);
      const entity = await initService.transformData(dataRes.data.content, data.entityTable);
      const payload = {
        entityTotal: dataRes.data.totalElements,
        entityTableData: entity.data.objectList,
        entityCurrent: data.current,
        entityLoadingVisible: false,
      };
      dispatch.entity.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async entityEdit(data) {
      if (data) {
        const entity = await entityService.findEntityById(data.id);
        const fromData = {
          ...entity.data,
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
    async entityDelete(data) {
      await entityService.entityDelete(data.record);
      const dataRes = await entityService.entityPage(data.record.id, data.entityCurrent);
      const entity = await initService.transformData(dataRes.data.content, data.entityTable);
      const payload = {
        entityTotal: dataRes.data.totalElements,
        entityTableData: entity.data.objectList,
        entityCurrent: data.entityCurrent,
      };
      dispatch.entity.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async entitySave(data) {
      await entityService.entitySave(data.entityNameId, data.entityFormData);
      const dataRes = await entityService.entityPage(data.entityNameId, data.entityCurrent);
      const entity = await initService.transformData(dataRes.data.content, data.entityTable);
      const payload = {
        entityTotal: dataRes.data.totalElements,
        entityTableData: entity.data.objectList,
        entityCurrent: data.entityCurrent,
        entityVisible: false,
      };
      dispatch.entity.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      initService.findCatalogByValue(data).then(res => {
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
     * 点击行
     *
     * @param {*} data
     */
    async onRowClick(value) {
      const dataRes = await entityService.entityPage(value.record.id, 1);
      const dataTableRes = await initService.findDataTableByName('entityTable');
      const dataFormRes = await initService.findDataFormByName('entityForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        divVisible: !value.selected,
        entityTable: dataTableRes.data,
        entityForm: data.data.objectForm,
        entityTotal: dataRes.data.totalElements,
        entityTableData: data.data.objectList,
        entityCurrent: 1,
        entityNameId: value.record.id,
        entityLoadingVisible: false,
      };
      dispatch.entity.setState(payload);
    },
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