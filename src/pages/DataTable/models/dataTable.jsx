import dataTableService from '../services/dataTable';

export default {

  namespace: 'dataTable',

  state: {
    dataTableTableData: [],
    dataTableVisible: false,
    dataTableFormData: {},
    dataTableLoadingVisible: true,
    dataTableTotal: 0,
    dataTableCurrent: 1,
    dataTableForm: [],
    dataTableTable: [],
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
    dataTablePage(data) {
      dataTableService.dataTablePage(data).then(res => {
        const payload = {
          dataTableTotal: res.data.totalElements,
          dataTableTableData: res.data.content,
          dataTableCurrent: data,
          dataTableLoadingVisible: false,
        };
        dispatch.dataTable.setState(payload);
      });
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    dataTableEdit(data) {
      if (data) {
        const fromData = {
          ...data,
        };
        const payload = {
          dataTableFormData: fromData,
          dataTableVisible: true,
        };
        dispatch.dataTable.setState(payload);
      } else {
        const payload = {
          dataTableFormData: {},
          dataTableVisible: true,
        };
        dispatch.dataTable.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    dataTableDelete(data) {
      dataTableService.dataTableDelete(data.record).then(() => {
        dataTableService.dataTablePage(data.dataTableCurrent).then(res => {
          const payload = {
            dataTableTotal: res.data.totalElements,
            dataTableTableData: res.data.content,
            dataTableCurrent: data.dataTableCurrent,
          };
          dispatch.dataTable.setState(payload);
        });
      });
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    dataTableSave(data) {
      dataTableService.dataTableSave(data.dataTableFormData).then(() => {
        dataTableService.dataTablePage(data.dataTableCurrent).then(res => {
          const payload = {
            dataTableTotal: res.data.totalElements,
            dataTableTableData: res.data.content,
            dataTableCurrent: data.dataTableCurrent,
          };
          dispatch.dataTable.setState(payload);
        });
      });
      const payload = { dataTableVisible: false };
      dispatch.dataTable.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      dataTableService.findCatalogByValue(data).then(res => {
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
        dispatch.dataTable.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        dataTableFormData: data,
      };
      dispatch.dataTable.setState(payload);
    },
    /**
     * 获取表单
     *
     * @param {*} data
     */
    async findDataFormByName(data) {
      const formArray = [];
      const results = [];
      const dataTableRes = await dataTableService.findDataFormByName(data);
      for (let i = 0; i < dataTableRes.data.length; i++) {
        if (dataTableRes.data[i].type === 'Select' && dataTableRes.data[i].dataSource !== null) {
          results.push(dataTableService.findCatalogByValue(dataTableRes.data[i].dataSource).then(res => {
            const formArr = [];
            res.forEach(item => {
              formArr.push({
                label: item.dictionaryName,
                value: item.dictionaryValue,
              });
            });
            formArray.push({ ...dataTableRes.data[i], dataSource: formArr });
          }));
        } else {
          formArray.push(dataTableRes.data[i]);
        }
      }
      await Promise.all(results);
      const payload = {
        dataTableForm: formArray,
      };
      dispatch.dataTable.setState(payload);
    },
    /**
     * 获取表格
     *
     * @param {*} data
     */
    async findDataTableByName(data) {
      const dataTableRes = await dataTableService.findDataTableByName(data);
      const payload = {
        dataTableTable: dataTableRes.data,
      };
      dispatch.dataTable.setState(payload);
    },
    // <=============================可选方法 start =============================>
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>

    // <=============================自定义方法 end   =============================>
  }),
};