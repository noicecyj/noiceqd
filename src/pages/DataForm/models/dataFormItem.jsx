import dataFormItemService from '../services/dataFormItem';
import initService from '../../../services/init';

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
    async dataFormItemPage(data) {
      const dataRes = await dataFormItemService.dataFormItemPage(data.dataFormId, data.current);
      const dataFormItem = await initService.transformData(dataRes.data.content, data.dataFormItemTable);
      const payload = {
        dataFormItemTotal: dataRes.data.totalElements,
        dataFormItemTableData: dataFormItem.data.objectList,
        dataFormItemCurrent: data.current,
        dataFormItemLoadingVisible: false,
      };
      dispatch.dataFormItem.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async dataFormItemEdit(data) {
      const dataFormItem = await dataFormItemService.findDataFormItemById(data.id);
      if (data) {
        const fromData = {
          ...dataFormItem.data,
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
    async dataFormItemDelete(data) {
      await dataFormItemService.dataFormItemDelete(data.record);
      const dataRes = await dataFormItemService.dataFormItemPage(data.record.id, data.dataFormItemCurrent);
      const dataFormItem = await initService.transformData(dataRes.data.content, data.dataFormItemTable);
      const payload = {
        dataFormItemTotal: dataRes.data.totalElements,
        dataFormItemTableData: dataFormItem.data.objectList,
        dataFormItemCurrent: data.dataFormItemCurrent,
      };
      dispatch.dataFormItem.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async dataFormItemSave(data) {
      await dataFormItemService.dataFormItemSave(data.dataFormId, data.dataFormItemFormData);
      const dataRes = await dataFormItemService.dataFormItemPage(data.dataFormId, data.dataFormItemCurrent);
      const dataFormItem = await initService.transformData(dataRes.data.content, data.dataFormItemTable);
      const payload = {
        dataFormItemTotal: dataRes.data.totalElements,
        dataFormItemTableData: dataFormItem.data.objectList,
        dataFormItemCurrent: data.dataFormItemCurrent,
        dataFormItemVisible: false,
      };
      dispatch.dataFormItem.setState(payload);
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
     * 点击行
     *
     * @param {*} data
     */
    async onRowClick(value) {
      const dataRes = await dataFormItemService.dataFormItemPage(value.record.id, 1);
      const dataTableRes = await initService.findDataTableByName('dataFormItemTable');
      const dataFormRes = await initService.findDataFormByName('dataFormItemForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        divVisible: !value.selected,
        dataFormItemTable: dataTableRes.data,
        dataFormItemForm: data.data.objectForm,
        dataFormItemTotal: dataRes.data.totalElements,
        dataFormItemTableData: data.data.objectList,
        dataFormItemCurrent: 1,
        dataFormId: value.record.id,
        dataFormItemLoadingVisible: false,
      };
      dispatch.dataFormItem.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};