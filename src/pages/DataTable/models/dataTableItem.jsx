import dataTableItemService from '../services/dataTableItem';
import initService from '../../../services/init';

export default {

  namespace: 'dataTableItem',

  state: {
    dataTableItemTableData: [],
    dataTableItemVisible: false,
    dataTableItemFormData: {},
    dataTableItemLoadingVisible: true,
    dataTableItemTotal: 0,
    dataTableItemCurrent: 1,
    dataTableItemForm: [],
    dataTableItemTable: [],
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
    async dataTableItemPage(data) {
      const dataRes = await dataTableItemService.dataTableItemPage(data.dataTableId, data.current);
      const dataTableItem = await initService.transformData(dataRes.data.content, data.dataTableItemTable);
      const payload = {
        dataTableItemTotal: dataRes.data.totalElements,
        dataTableItemTableData: dataTableItem.data.objectList,
        dataTableItemCurrent: data.current,
        dataTableItemLoadingVisible: false,
      };
      dispatch.dataTableItem.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async dataTableItemEdit(data) {
      const dataTableItem = await dataTableItemService.findDataTableItemById(data.id);
      if (data) {
        const fromData = {
          ...dataTableItem.data,
        };
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
    async dataTableItemDelete(data) {
      await dataTableItemService.dataTableItemDelete(data.record);
      const dataRes = await dataTableItemService.dataTableItemPage(data.record.id, data.dataTableItemCurrent);
      const dataTableItem = await initService.transformData(dataRes.data.content, data.dataTableItemTable);
      const payload = {
        dataTableItemTotal: dataRes.data.totalElements,
        dataTableItemTableData: dataTableItem.data.objectList,
        dataTableItemCurrent: data.dataTableItemCurrent,
      };
      dispatch.dataTableItem.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async dataTableItemSave(data) {
      await dataTableItemService.dataTableItemSave(data.dataTableId, data.dataTableItemFormData);
      const dataRes = await dataTableItemService.dataTableItemPage(data.dataTableId, data.dataTableItemCurrent);
      const dataTableItem = await initService.transformData(dataRes.data.content, data.dataTableItemTable);
      const payload = {
        dataTableItemTotal: dataRes.data.totalElements,
        dataTableItemTableData: dataTableItem.data.objectList,
        dataTableItemCurrent: data.dataTableItemCurrent,
        dataTableItemVisible: false,
      };
      dispatch.dataTableItem.setState(payload);
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
     * 点击行
     *
     * @param {*} data
     */
    async onRowClick(value) {
      const dataRes = await dataTableItemService.dataTableItemPage(value.record.id, 1);
      const dataTableRes = await initService.findDataTableByName('dataTableItemTable');
      const dataFormRes = await initService.findDataFormByName('dataTableItemForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        divVisible: !value.selected,
        dataTableItemTable: dataTableRes.data,
        dataTableItemForm: data.data.objectForm,
        dataTableItemTotal: dataRes.data.totalElements,
        dataTableItemTableData: data.data.objectList,
        dataTableItemCurrent: 1,
        dataTableId: value.record.id,
        dataTableItemLoadingVisible: false,
      };
      dispatch.dataTableItem.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};