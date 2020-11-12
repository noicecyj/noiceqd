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
      dataItemService.dataItemPage(data).then(res => {
        const payload = {
          dataItemTotal: res.data.totalElements,
          dataItemTableData: res.data.content,
          dataItemCurrent: data,
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
        const payload = {
          dataItemFormData: data,
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
        dataItemService.dataItemPage(data.dataItemCurrent).then(res => {
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
      dataItemService.dataItemSave(data.dataItemFormData).then(() => {
        dataItemService.dataItemPage(data.dataItemCurrent).then(res => {
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