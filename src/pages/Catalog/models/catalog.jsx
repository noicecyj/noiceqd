import catalogService from '../services/catalog';
import initService from '../../../services/init';

export default {

  namespace: 'catalog',

  state: {
    catalogTableData: [],
    catalogVisible: false,
    catalogFormData: {},
    catalogLoadingVisible: true,
    catalogTotal: 0,
    catalogCurrent: 1,
    catalogForm: [],
    catalogTable: [],
    // <=============================自定义状态 start =============================>
    // <=============================自定义状态 end   =============================>
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
    async catalogPage(data) {
      const dataRes = await catalogService.catalogPage(data.current);
      const catalog = await initService.transformData(dataRes.data.content, data.catalogTable);
      const payload = {
        catalogTotal: dataRes.data.totalElements,
        catalogTableData: catalog.data.objectList,
        catalogCurrent: data.current,
        catalogLoadingVisible: false,
      };
      dispatch.catalog.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async catalogEdit(data) {
      if (data) {
        const catalog = await catalogService.findCatalogById(data.id);
        const fromData = {
          ...catalog.data,
        };
        const payload = {
          catalogFormData: fromData,
          catalogVisible: true,
        };
        dispatch.catalog.setState(payload);
      } else {
        const payload = {
          catalogFormData: {},
          catalogVisible: true,
        };
        dispatch.catalog.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    async catalogDelete(data) {
      await catalogService.catalogDelete(data.record);
      const dataRes = await catalogService.catalogPage(data.catalogCurrent);
      const catalog = await initService.transformData(dataRes.data.content, data.catalogTable);
      const payload = {
        catalogTotal: dataRes.data.totalElements,
        catalogTableData: catalog.data.objectList,
        catalogCurrent: data.catalogCurrent,
      };
      dispatch.catalog.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async catalogSave(data) {
      await catalogService.catalogSave(data.catalogFormData);
      const dataRes = await catalogService.catalogPage(data.catalogCurrent);
      const catalog = await initService.transformData(dataRes.data.content, data.catalogTable);
      const payload = {
        catalogTotal: dataRes.data.totalElements,
        catalogTableData: catalog.data.objectList,
        catalogCurrent: data.catalogCurrent,
        catalogVisible: false,
      };
      dispatch.catalog.setState(payload);
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
        dispatch.catalog.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        catalogFormData: data,
      };
      dispatch.catalog.setState(payload);
    },
    /**
     * 获取表格和表格初始化数据
     *
     * @param {*} data
     */
    async findDataTableAndFormByName() {
      const dataRes = await catalogService.catalogPage(1);
      const dataTableRes = await initService.findDataTableByName('catalogTable');
      const dataFormRes = await initService.findDataFormByName('catalogForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        catalogTable: dataTableRes.data,
        catalogForm: data.data.objectForm,
        catalogTotal: dataRes.data.totalElements,
        catalogTableData: data.data.objectList,
        catalogCurrent: 1,
        catalogLoadingVisible: false,
      };
      dispatch.catalog.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};