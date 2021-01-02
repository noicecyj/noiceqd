import dataFormItemService from '../services/dataFormItem';

export default {

  namespace: 'dataFormItem',

  state: {
    dataFormItemTableData: [],
    dataFormItemVisible: false,
    dataFormItemFormData: {},
    dataFormItemLoadingVisible: true,
    dataFormItemTotal: 0,
    dataFormItemCurrent: 1,
    dataFormItemForm: [],
    dataFormItemTable: [],
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
    dataFormItemPage(data) {
      dataFormItemService.dataFormItemPage(data.id, data.current).then(res => {
        const payload = {
          dataFormItemTotal: res.data.totalElements,
          dataFormItemTableData: res.data.content,
          dataFormItemCurrent: data.current,
          dataFormItemLoadingVisible: false,
        };
        dispatch.dataFormItem.setState(payload);
      });
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    dataFormItemEdit(data) {
      if (data) {
        const fromData = {
          ...data,
        };
        const payload = {
          dataFormItemFormData: fromData,
          dataFormItemVisible: true,
        };
        dispatch.dataFormItem.setState(payload);
      } else {
        const payload = {
          dataFormItemFormData: {},
          dataFormItemVisible: true,
        };
        dispatch.dataFormItem.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    dataFormItemDelete(data) {
      dataFormItemService.dataFormItemDelete(data.record).then(() => {
        dataFormItemService.dataFormItemPage(data.record.id, data.dataFormItemCurrent).then(res => {
          const payload = {
            dataFormItemTotal: res.data.totalElements,
            dataFormItemTableData: res.data.content,
            dataFormItemCurrent: data.dataFormItemCurrent,
          };
          dispatch.dataFormItem.setState(payload);
        });
      });
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    dataFormItemSave(data) {
      dataFormItemService.dataFormItemSave(data.dataFormItemFormData, data.dataFormId).then(() => {
        dataFormItemService.dataFormItemPage(data.dataFormId, data.dataFormItemCurrent).then(res => {
          const payload = {
            dataFormItemTotal: res.data.totalElements,
            dataFormItemTableData: res.data.content,
            dataFormItemCurrent: data.dataFormItemCurrent,
          };
          dispatch.dataFormItem.setState(payload);
        });
      });
      const payload = { dataFormItemVisible: false };
      dispatch.dataFormItem.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      dataFormItemService.findCatalogByValue(data).then(res => {
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
        dispatch.dataFormItem.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        dataFormItemFormData: data,
      };
      dispatch.dataFormItem.setState(payload);
    },
    /**
     * 获取表单
     *
     * @param {*} data
     */
    async findDataFormByName(data) {
      const dataFormRes = await dataFormItemService.findDataFormByName(data);
      const payload = {
        entityNameForm: dataFormRes.data,
      };
      dispatch.entityName.setState(payload);
    },
    /**
     * 获取表格
     *
     * @param {*} data
     */
    async findDataTableByName(data) {
      const dataTableRes = await dataFormItemService.findDataTableByName(data);
      const payload = {
        dataFormItemTable: dataTableRes.data,
      };
      dispatch.dataFormItem.setState(payload);
    },
    // <=============================可选方法 start =============================>
    /**
     * 点击行
     *
     * @param {*} data
     */
    onRowClick(data) {
      dataFormItemService.dataFormItemPage(data.record.id, 1).then(res => {
        const payload = {
          divVisible: !data.selected,
          dataFormItemTotal: res.data.totalElements,
          dataFormItemTableData: res.data.content,
          dataFormItemCurrent: 1,
        };
        dispatch.dataFormItem.setState(payload);
      });
      const payload = {
        dataFormId: data.record.id,
        dataFormItemLoadingVisible: false,
      };
      dispatch.dataFormItem.setState(payload);
    },
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>

    // <=============================自定义方法 end   =============================>
  }),
};