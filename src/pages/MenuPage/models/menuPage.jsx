import menuPageService from '../services/menuPage';
import initService from '../../../services/init';

export default {

  namespace: 'menuPage',

  state: {
    menuPageTableData: [],
    menuPageVisible: false,
    menuPageFormData: {},
    menuPageLoadingVisible: true,
    menuPageTotal: 0,
    menuPageCurrent: 1,
    menuPageForm: [],
    menuPageTable: [],
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
    async menuPagePage(data) {
      const dataRes = await menuPageService.menuPagePage(data.current);
      const menuPage = await initService.transformData(dataRes.data.content, data.menuPageTable);
      const payload = {
        menuPageTotal: dataRes.data.totalElements,
        menuPageTableData: menuPage.data.objectList,
        menuPageCurrent: data.current,
        menuPageLoadingVisible: false,
      };
      dispatch.menuPage.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async menuPageEdit(data) {
      if (data) {
        const menuPage = await menuPageService.findMenuPageById(data.id);
        const fromData = {
          ...menuPage.data,
        };
        const payload = {
          menuPageFormData: fromData,
          menuPageVisible: true,
        };
        dispatch.menuPage.setState(payload);
      } else {
        const payload = {
          menuPageFormData: {},
          menuPageVisible: true,
        };
        dispatch.menuPage.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    async menuPageDelete(data) {
      await menuPageService.menuPageDelete(data.record);
      const dataRes = await menuPageService.menuPagePage(data.menuPageCurrent);
      const menuPage = await initService.transformData(dataRes.data.content, data.menuPageTable);
      const payload = {
        menuPageTotal: dataRes.data.totalElements,
        menuPageTableData: menuPage.data.objectList,
        menuPageCurrent: data.menuPageCurrent,
      };
      dispatch.menuPage.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async menuPageSave(data) {
      await menuPageService.menuPageSave(data.menuPageFormData);
      const dataRes = await menuPageService.menuPagePage(data.menuPageCurrent);
      const menuPage = await initService.transformData(dataRes.data.content, data.menuPageTable);
      const payload = {
        menuPageTotal: dataRes.data.totalElements,
        menuPageTableData: menuPage.data.objectList,
        menuPageCurrent: data.menuPageCurrent,
        menuPageVisible: false,
      };
      dispatch.menuPage.setState(payload);
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
        dispatch.menuPage.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        menuPageFormData: data,
      };
      dispatch.menuPage.setState(payload);
    },
    /**
     * 获取表格和表格初始化数据
     *
     * @param {*} data
     */
    async findDataTableAndFormByName() {
      const dataRes = await menuPageService.menuPagePage(1);
      const dataTableRes = await initService.findDataTableByName('menuPageTable');
      const dataFormRes = await initService.findDataFormByName('menuPageForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        menuPageTable: dataTableRes.data,
        menuPageForm: data.data.objectForm,
        menuPageTotal: dataRes.data.totalElements,
        menuPageTableData: data.data.objectList,
        menuPageCurrent: 1,
        menuPageLoadingVisible: false,
      };
      dispatch.menuPage.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};