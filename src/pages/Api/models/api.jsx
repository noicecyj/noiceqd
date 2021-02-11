import apiService from '../services/api';
import initService from '../../../services/init';

export default {

  namespace: 'api',

  state: {
    apiTableData: [],
    apiVisible: false,
    apiFormData: {},
    apiLoadingVisible: true,
    apiTotal: 0,
    apiCurrent: 1,
    apiForm: [],
    apiTable: [],
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
    async apiPage(data) {
      const dataRes = await apiService.apiPage(data.current);
      const api = await initService.transformData(dataRes.data.content, data.apiTable);
      const payload = {
        apiTotal: dataRes.data.totalElements,
        apiTableData: api.data.objectList,
        apiCurrent: data.current,
        apiLoadingVisible: false,
      };
      dispatch.api.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async apiEdit(data) {
      if (data) {
        const api = await apiService.findApiById(data.id);
        const fromData = {
          ...api.data,
        };
        const payload = {
          apiFormData: fromData,
          apiVisible: true,
        };
        dispatch.api.setState(payload);
      } else {
        const payload = {
          apiFormData: {},
          apiVisible: true,
        };
        dispatch.api.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    async apiDelete(data) {
      await apiService.apiDelete(data.record);
      const dataRes = await apiService.apiPage(data.apiCurrent);
      const api = await initService.transformData(dataRes.data.content, data.apiTable);
      const payload = {
        apiTotal: dataRes.data.totalElements,
        apiTableData: api.data.objectList,
        apiCurrent: data.apiCurrent,
      };
      dispatch.api.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async apiSave(data) {
      await apiService.apiSave(data.apiFormData);
      const dataRes = await apiService.apiPage(data.apiCurrent);
      const api = await initService.transformData(dataRes.data.content, data.apiTable);
      const payload = {
        apiTotal: dataRes.data.totalElements,
        apiTableData: api.data.objectList,
        apiCurrent: data.apiCurrent,
        apiVisible: false,
      };
      dispatch.api.setState(payload);
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
        dispatch.api.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        apiFormData: data,
      };
      dispatch.api.setState(payload);
    },
    /**
     * 获取表格和表格初始化数据
     *
     * @param {*} data
     */
    async findDataTableAndFormByName() {
      const dataRes = await apiService.apiPage(1);
      const dataTableRes = await initService.findDataTableByName('apiTable');
      const dataFormRes = await initService.findDataFormByName('apiForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        apiTable: dataTableRes.data,
        apiForm: data.data.objectForm,
        apiTotal: dataRes.data.totalElements,
        apiTableData: data.data.objectList,
        apiCurrent: 1,
        apiLoadingVisible: false,
      };
      dispatch.api.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};