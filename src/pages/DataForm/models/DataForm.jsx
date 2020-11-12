import dataFormService from '../services/dataForm';

export default {

  namespace: 'dataForm',

  state: {
    dataFormTableData: [],
    dataFormVisible: false,
    dataFormFormData: {},
    dataFormLoadingVisible: true,
    dataFormTotal: 0,
    dataFormCurrent: 1,
    formItemLayout: {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 40,
      },
    },
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
    dataFormPage(data) {
      dataFormService.dataFormPage(data).then(res => {
        const payload = {
          dataFormTotal: res.data.totalElements,
          dataFormTableData: res.data.content,
          dataFormCurrent: data,
          dataFormLoadingVisible: false,
        };
        dispatch.dataForm.setState(payload);
      });
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    dataFormEdit(data) {
      if (data) {
        const payload = {
          dataFormFormData: data,
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
    dataFormDelete(data) {
      dataFormService.dataFormDelete(data.record).then(() => {
        dataFormService.dataFormPage(data.dataFormCurrent).then(res => {
          const payload = {
            dataFormTotal: res.data.totalElements,
            dataFormTableData: res.data.content,
            dataFormCurrent: data.dataFormCurrent,
          };
          dispatch.dataForm.setState(payload);
        });
      });
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    dataFormSave(data) {
      dataFormService.dataFormSave(data.dataFormFormData).then(() => {
        dataFormService.dataFormPage(data.dataFormCurrent).then(res => {
          const payload = {
            dataFormTotal: res.data.totalElements,
            dataFormTableData: res.data.content,
            dataFormCurrent: data.dataFormCurrent,
          };
          dispatch.dataForm.setState(payload);
        });
      });
      const payload = { dataFormVisible: false };
      dispatch.dataForm.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      dataFormService.findCatalogByValue(data).then(res => {
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
    // <=============================可选方法 start =============================>
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>

    // <=============================自定义方法 end   =============================>
  }),
};