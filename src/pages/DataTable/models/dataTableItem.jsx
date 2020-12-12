import dataTableItemService from '../services/dataTableItem';

export default {

  namespace: 'dataTableItem',

  state: {
    dataTableItemTableData: [],
    dataTableItemVisible: false,
    dataTableItemFormData: {},
    dataTableItemLoadingVisible: true,
    dataTableItemTotal: 0,
    dataTableItemCurrent: 1,
    divVisible: true,
    dataTableId: '',
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
    dataTableItemPage(data) {
      dataTableItemService.dataTableItemPage(data.id, data.current).then(res => {
        const payload = {
          dataTableItemTotal: res.data.totalElements,
          dataTableItemTableData: res.data.content,
          dataTableItemCurrent: data.current,
          dataTableItemLoadingVisible: false,
        };
        dispatch.dataTableItem.setState(payload);
      });
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    dataTableItemEdit(data) {
      if (data) {
        const fromData = {
          ...data,
        }
        const payload = {
          dataTableItemFormData: fromData,
          dataTableItemVisible: true,
        };
        dispatch.dataTableItem.setState(payload);
      } else {
        const payload = {
          dataTableItemFormData: {},
          dataTableItemVisible: true,
        };
        dispatch.dataTableItem.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    dataTableItemDelete(data) {
      dataTableItemService.dataTableItemDelete(data.record).then(() => {
        dataTableItemService.dataTableItemPage(data.record.id, data.dataTableItemCurrent).then(res => {
          const payload = {
            dataTableItemTotal: res.data.totalElements,
            dataTableItemTableData: res.data.content,
            dataTableItemCurrent: data.dataTableItemCurrent,
          };
          dispatch.dataTableItem.setState(payload);
        });
      });
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    dataTableItemSave(data) {
      dataTableItemService.dataTableItemSave(data.dataTableItemFormData, data.dataTableId).then(() => {
        dataTableItemService.dataTableItemPage(data.dataTableId, data.dataTableItemCurrent).then(res => {
          const payload = {
            dataTableItemTotal: res.data.totalElements,
            dataTableItemTableData: res.data.content,
            dataTableItemCurrent: data.dataTableItemCurrent,
          };
          dispatch.dataTableItem.setState(payload);
        });
      });
      const payload = { dataTableItemVisible: false };
      dispatch.dataTableItem.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      dataTableItemService.findCatalogByValue(data).then(res => {
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
        dispatch.dataTableItem.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        dataTableItemFormData: data,
      };
      dispatch.dataTableItem.setState(payload);
    },
    /**
     * 获取表单
     *
     * @param {*} data
     */
    async findDataFormByName(data) {
      const formArray = [];
      const results = [];
      const dataTableItemRes = await dataTableItemService.findDataFormByName(data);
      for (let i = 0; i < dataTableItemRes.data.length; i++) {
        if (dataTableItemRes.data[i].type === 'Select' && dataTableItemRes.data[i].dataSource !== null) {
          results.push(dataTableItemService.findCatalogByValue(dataTableItemRes.data[i].dataSource).then(res => {
            const formArr = [];
            res.forEach(item => {
              formArr.push({
                label: item.dictionaryName,
                value: item.dictionaryValue,
              });
            });
            formArray.push({ ...dataTableItemRes.data[i], dataSource: formArr });
          }));
        } else {
          formArray.push(dataTableItemRes.data[i]);
        }
      }
      await Promise.all(results);
      const payload = {
        dataTableItemDataForm: formArray,
      };
      dispatch.dataTableItem.setState(payload);
    },
    /**
     * 获取表格
     *
     * @param {*} data
     */
    findDataTableByName(data) {
      dataTableItemService.findDataTableByName(data).then(res => {
        const payload = {
          dataTableItemDataTable: res.data,
        };
        dispatch.dataTableItem.setState(payload);
      });
    },
    // <=============================可选方法 start =============================>
    /**
     * 点击行
     *
     * @param {*} data
     */
    onRowClick(data) {
      dataTableItemService.dataTableItemPage(data.record.id, 1).then(res => {
        const payload = {
          divVisible: !data.selected,
          dataTableItemTotal: res.data.totalElements,
          dataTableItemTableData: res.data.content,
          dataTableItemCurrent: 1,
        };
        dispatch.dataTableItem.setState(payload);
      });
      const payload = {
        dataTableId: data.record.id,
        dataTableItemLoadingVisible: false,
      };
      dispatch.dataTableItem.setState(payload);
    },
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>

    // <=============================自定义方法 end   =============================>
  }),
};