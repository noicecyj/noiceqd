import userService from '../services/user';
import initService from '../../../services/init';

export default {

  namespace: 'user',

  state: {
    userTableData: [],
    userVisible: false,
    userFormData: {},
    userLoadingVisible: true,
    userTotal: 0,
    userCurrent: 1,
    userForm: [],
    userTable: [],
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
    async userPage(data) {
      const dataRes = await userService.userPage(data.current);
      const user = await initService.transformData(dataRes.data.content, data.userTable);
      const payload = {
        userTotal: dataRes.data.totalElements,
        userTableData: user.data.objectList,
        userCurrent: data.current,
        userLoadingVisible: false,
      };
      dispatch.user.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async userEdit(data) {
      if (data) {
        const user = await userService.findUserById(data.id);
        const fromData = {
          ...user.data,
        };
        const payload = {
          userFormData: fromData,
          userVisible: true,
        };
        dispatch.user.setState(payload);
      } else {
        const payload = {
          userFormData: {},
          userVisible: true,
        };
        dispatch.user.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    async userDelete(data) {
      await userService.userDelete(data.record);
      const dataRes = await userService.userPage(data.userCurrent);
      const user = await initService.transformData(dataRes.data.content, data.userTable);
      const payload = {
        userTotal: dataRes.data.totalElements,
        userTableData: user.data.objectList,
        userCurrent: data.userCurrent,
      };
      dispatch.user.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async userSave(data) {
      await userService.userSave(data.userFormData);
      const dataRes = await userService.userPage(data.userCurrent);
      const user = await initService.transformData(dataRes.data.content, data.userTable);
      const payload = {
        userTotal: dataRes.data.totalElements,
        userTableData: user.data.objectList,
        userCurrent: data.userCurrent,
        userVisible: false,
      };
      dispatch.user.setState(payload);
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
        dispatch.user.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        userFormData: data,
      };
      dispatch.user.setState(payload);
    },
    /**
     * 获取表格和表格初始化数据
     *
     * @param {*} data
     */
    async findDataTableAndFormByName() {
      const dataRes = await userService.userPage(1);
      const dataTableRes = await initService.findDataTableByName('userTable');
      const dataFormRes = await initService.findDataFormByName('userForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        userTable: dataTableRes.data,
        userForm: data.data.objectForm,
        userTotal: dataRes.data.totalElements,
        userTableData: data.data.objectList,
        userCurrent: 1,
        userLoadingVisible: false,
      };
      dispatch.user.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};