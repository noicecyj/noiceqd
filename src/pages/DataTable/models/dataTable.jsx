import dataTableService from '../services/dataTable';
import initService from '../../../services/init';

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
    async dataTablePage(data) {
      const dataRes = await dataTableService.dataTablePage(data.current);
      const dataTable = await initService.transformData(dataRes.data.content, data.dataTableTable);
      const payload = {
        dataTableTotal: dataRes.data.totalElements,
        dataTableTableData: dataTable.data.objectList,
        dataTableCurrent: data.current,
        dataTableLoadingVisible: false,
      };
      dispatch.dataTable.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async dataTableEdit(data) {
      const dataTable = await dataTableService.findDataTableById(data.id);
      if (data) {
        const fromData = {
          ...dataTable.data,
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
    async dataTableDelete(data) {
      await dataTableService.dataTableDelete(data.record);
      const dataRes = await dataTableService.dataTablePage(data.dataTableCurrent);
      const dataTable = await initService.transformData(dataRes.data.content, data.dataTableTable);
      const payload = {
        dataTableTotal: dataRes.data.totalElements,
        dataTableTableData: dataTable.data.objectList,
        dataTableCurrent: data.dataTableCurrent,
      };
      dispatch.dataTable.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async dataTableSave(data) {
      await dataTableService.dataTableSave(data.dataTableFormData);
      const dataRes = await dataTableService.dataTablePage(data.dataTableCurrent);
      const dataTable = await initService.transformData(dataRes.data.content, data.dataTableTable);
      const payload = {
        dataTableTotal: dataRes.data.totalElements,
        dataTableTableData: dataTable.data.objectList,
        dataTableCurrent: data.dataTableCurrent,
        dataTableVisible: false,
      };
      dispatch.dataTable.setState(payload);
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
     * 获取表格和表格初始化数据
     *
     * @param {*} data
     */
    async findDataTableAndFormByName() {
      const dataRes = await dataTableService.dataTablePage(1);
      const dataTableRes = await initService.findDataTableByName('dataTableTable');
      const dataFormRes = await initService.findDataFormByName('dataTableForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        dataTableTable: dataTableRes.data,
        dataTableForm: data.data.objectForm,
        dataTableTotal: dataRes.data.totalElements,
        dataTableTableData: data.data.objectList,
        dataTableCurrent: 1,
        dataTableLoadingVisible: false,
      };
      dispatch.dataTable.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};