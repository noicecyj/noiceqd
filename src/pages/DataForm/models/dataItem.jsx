import dataItemService from '../services/dataItem';

export default {

  namespace: 'dataItem',

  state: {
    dataItemTableData: [],
    dataItemVisible: false,
    dataItemFormData: {},
    dataItemLoadingVisible: true,
    dataItemTotal: 0,
    dataItemCurrent: 1,
    dataItemDataForm: [],
    dataItemDataTable: [],
    divVisible: true,
    dataFormId: '',
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
    dataItemPage(data) {
      dataItemService.dataItemPage(data.id, data.current).then(res => {
        const payload = {
          dataItemTotal: res.data.totalElements,
          dataItemTableData: res.data.content,
          dataItemCurrent: data.current,
          dataItemLoadingVisible: false,
        };
        dispatch.dataItem.setState(payload);
      });
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    dataItemEdit(data) {
      if (data) {
        const fromData = {
          ...data,
        }
        const payload = {
          dataItemFormData: fromData,
          dataItemVisible: true,
        };
        dispatch.dataItem.setState(payload);
      } else {
        const payload = {
          dataItemFormData: {},
          dataItemVisible: true,
        };
        dispatch.dataItem.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    dataItemDelete(data) {
      dataItemService.dataItemDelete(data.record).then(() => {
        dataItemService.dataItemPage(data.record.id, data.dataItemCurrent).then(res => {
          const payload = {
            dataItemTotal: res.data.totalElements,
            dataItemTableData: res.data.content,
            dataItemCurrent: data.dataItemCurrent,
          };
          dispatch.dataItem.setState(payload);
        });
      });
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    dataItemSave(data) {
      dataItemService.dataItemSave(data.dataItemFormData, data.dataFormId).then(() => {
        dataItemService.dataItemPage(data.dataFormId, data.dataItemCurrent).then(res => {
          const payload = {
            dataItemTotal: res.data.totalElements,
            dataItemTableData: res.data.content,
            dataItemCurrent: data.dataItemCurrent,
          };
          dispatch.dataItem.setState(payload);
        });
      });
      const payload = { dataItemVisible: false };
      dispatch.dataItem.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      dataItemService.findCatalogByValue(data).then(res => {
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
        dispatch.dataItem.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        dataItemFormData: data,
      };
      dispatch.dataItem.setState(payload);
    },
    /**
     * 获取表单
     *
     * @param {*} data
     */
    async findDataFormByName(data) {
      const formArray = [];
      const results = [];
      const dataFormRes = await dataItemService.findDataFormByName(data);
      console.log(dataFormRes);
      for (let i = 0; i < dataFormRes.data.length; i++) {
        if (dataFormRes.data[i].type === 'Select' && dataFormRes.data[i].dataSource !== null) {
          results.push(dataItemService.findCatalogByValue(dataFormRes.data[i].dataSource).then(res => {
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
        dataItemDataForm: formArray,
      };
      console.log(payload);
      dispatch.dataItem.setState(payload);
    },
    /**
     * 获取表格
     *
     * @param {*} data
     */
    findDataTableByName(data) {
      dataItemService.findDataTableByName(data).then(res => {
        const payload = {
          dataItemDataTable: res.data,
        };
        dispatch.dataItem.setState(payload);
      });
    },
    // <=============================可选方法 start =============================>
    /**
     * 点击行
     *
     * @param {*} data
     */
    onRowClick(data) {
      dataItemService.dataItemPage(data.record.id, 1).then(res => {
        const payload = {
          divVisible: !data.selected,
          dataItemTotal: res.data.totalElements,
          dataItemTableData: res.data.content,
          dataItemCurrent: 1,
        };
        dispatch.dataItem.setState(payload);
      });
      const payload = {
        dataFormId: data.record.id,
        dataItemLoadingVisible: false,
      };
      dispatch.dataItem.setState(payload);
    },
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>

    // <=============================自定义方法 end   =============================>
  }),
};