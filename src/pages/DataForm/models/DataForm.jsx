import dataFormService from '../services/dataForm';
import initService from '../../../services/init';

export default {

  namespace: 'dataForm',

  state: {
    dataFormTableData: [],
    dataFormVisible: false,
    dataFormFormData: {},
    dataFormLoadingVisible: true,
    dataFormTotal: 0,
    dataFormCurrent: 1,
    dataFormForm: [],
    dataFormTable: [],
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
    async dataFormPage(data) {
      const dataRes = await dataFormService.dataFormPage(data.current);
      const dataForm = await initService.transformData(dataRes.data.content, data.dataFormTable);
      const payload = {
        dataFormTotal: dataRes.data.totalElements,
        dataFormTableData: dataForm.data.objectList,
        dataFormCurrent: data.current,
        dataFormLoadingVisible: false,
      };
      dispatch.dataForm.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async dataFormEdit(data) {
      const dataForm = await dataFormService.findDataFormById(data.id);
      if (data) {
        const fromData = {
          ...dataForm.data,
        };
        const payload = {
          dataFormFormData: fromData,
          dataFormVisible: true,
        };
        dispatch.dataForm.setState(payload);
      } else {
        const payload = {
          dataFormFormData: {},
          dataFormVisible: true,
        };
        dispatch.dataForm.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    async dataFormDelete(data) {
      await dataFormService.dataFormDelete(data.record);
      const dataRes = await dataFormService.dataFormPage(data.dataFormCurrent);
      const dataForm = await initService.transformData(dataRes.data.content, data.dataFormTable);
      const payload = {
        dataFormTotal: dataRes.data.totalElements,
        dataFormTableData: dataForm.data.objectList,
        dataFormCurrent: data.dataFormCurrent,
      };
      dispatch.dataForm.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async dataFormSave(data) {
      await dataFormService.dataFormSave(data.dataFormFormData);
      const dataRes = await dataFormService.dataFormPage(data.dataFormCurrent);
      const dataForm = await initService.transformData(dataRes.data.content, data.dataFormTable);
      const payload = {
        dataFormTotal: dataRes.data.totalElements,
        dataFormTableData: dataForm.data.objectList,
        dataFormCurrent: data.dataFormCurrent,
        dataFormVisible: false,
      };
      dispatch.dataForm.setState(payload);
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
        dispatch.dataForm.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        dataFormFormData: data,
      };
      dispatch.dataForm.setState(payload);
    },
    /**
     * 获取表格和表格初始化数据
     *
     * @param {*} data
     */
    async findDataTableAndFormByName() {
      const dataRes = await dataFormService.dataFormPage(1);
      const dataTableRes = await initService.findDataTableByName('dataFormTable');
      const dataFormRes = await initService.findDataFormByName('dataFormForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        dataFormTable: dataTableRes.data,
        dataFormForm: data.data.objectForm,
        dataFormTotal: dataRes.data.totalElements,
        dataFormTableData: data.data.objectList,
        dataFormCurrent: 1,
        dataFormLoadingVisible: false,
      };
      dispatch.dataForm.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};