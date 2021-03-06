import appServiceService from '../services/appService';
import initService from '../../../services/init';

export default {

  namespace: 'appService',

  state: {
    appServiceTableData: [],
    appServiceVisible: false,
    appServiceFormData: {},
    appServiceLoadingVisible: true,
    appServiceTotal: 0,
    appServiceCurrent: 1,
    appServiceForm: [],
    appServiceTable: [],
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
    async appServicePage(data) {
      const dataRes = await appServiceService.appServicePage(data.current);
      const appService = await initService.transformData(dataRes.data.content, data.appServiceTable);
      const payload = {
        appServiceTotal: dataRes.data.totalElements,
        appServiceTableData: appService.data.objectList,
        appServiceCurrent: data.current,
        appServiceLoadingVisible: false,
      };
      dispatch.appService.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async appServiceEdit(data) {
      if (data) {
        const appService = await appServiceService.findAppServiceById(data.id);
        const fromData = {
          ...appService.data,
        };
        const payload = {
          appServiceFormData: fromData,
          appServiceVisible: true,
        };
        dispatch.appService.setState(payload);
      } else {
        const payload = {
          appServiceFormData: {},
          appServiceVisible: true,
        };
        dispatch.appService.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    async appServiceDelete(data) {
      await appServiceService.appServiceDelete(data.record);
      const dataRes = await appServiceService.appServicePage(data.appServiceCurrent);
      const appService = await initService.transformData(dataRes.data.content, data.appServiceTable);
      const payload = {
        appServiceTotal: dataRes.data.totalElements,
        appServiceTableData: appService.data.objectList,
        appServiceCurrent: data.appServiceCurrent,
      };
      dispatch.appService.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async appServiceSave(data) {
      await appServiceService.appServiceSave(data.appServiceFormData);
      const dataRes = await appServiceService.appServicePage(data.appServiceCurrent);
      const appService = await initService.transformData(dataRes.data.content, data.appServiceTable);
      const payload = {
        appServiceTotal: dataRes.data.totalElements,
        appServiceTableData: appService.data.objectList,
        appServiceCurrent: data.appServiceCurrent,
        appServiceVisible: false,
      };
      dispatch.appService.setState(payload);
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
        dispatch.appService.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        appServiceFormData: data,
      };
      dispatch.appService.setState(payload);
    },
    /**
     * 获取表格和表格初始化数据
     *
     * @param {*} data
     */
    async findDataTableAndFormByName() {
      const dataRes = await appServiceService.appServicePage(1);
      const dataTableRes = await initService.findDataTableByName('appServiceTable');
      const dataFormRes = await initService.findDataFormByName('appServiceForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        appServiceTable: dataTableRes.data,
        appServiceForm: data.data.objectForm,
        appServiceTotal: dataRes.data.totalElements,
        appServiceTableData: data.data.objectList,
        appServiceCurrent: 1,
        appServiceLoadingVisible: false,
      };
      dispatch.appService.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};