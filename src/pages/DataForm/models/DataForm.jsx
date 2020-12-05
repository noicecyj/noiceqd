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
    dataFormDataForm: [],
    dataFormDataTable: [],
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
        const fromData = {
          ...data,
        }
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
     * 获取表单
     *
     * @param {*} data
     */
    async findDataFormByName(data) {
      const formArray = [];
      const results = [];
      const dataFormRes = await dataFormService.findDataFormByName(data);
      console.log(dataFormRes);
      for (let i = 0; i < dataFormRes.data.length; i++) {
        if (dataFormRes.data[i].type === 'Select' && dataFormRes.data[i].dataSource !== null) {
          results.push(dataFormService.findCatalogByValue(dataFormRes.data[i].dataSource).then(res => {
            const formArr = [];
            res.forEach(item => {
              formArr.push({
                label: item.dictionaryName,
                value: item.dictionaryValue,
              });
            });
            formArray.push({ ...dataFormRes.data[i], dataSource: formArr });
          }));
        } else {
          formArray.push(dataFormRes.data[i]);
        }
      }
      await Promise.all(results)
      const payload = {
        dataFormDataForm: formArray,
      };
      dispatch.dataForm.setState(payload);
    },
    /**
     * 获取表格
     *
     * @param {*} data
     */
    findDataTableByName(data) {
      dataFormService.findDataTableByName(data).then(res => {
        const payload = {
          dataFormDataTable: res.data,
        };
        dispatch.dataForm.setState(payload);
      });
    },
    // <=============================可选方法 start =============================>
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>

    // <=============================自定义方法 end   =============================>
  }),
};