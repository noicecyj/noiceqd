import roleService from '../services/role';
import initService from '../../../services/init';

export default {

  namespace: 'role',

  state: {
    roleTableData: [],
    roleVisible: false,
    roleFormData: {},
    roleLoadingVisible: true,
    roleTotal: 0,
    roleCurrent: 1,
    roleForm: [],
    roleTable: [],
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
    async rolePage(data) {
      const dataRes = await roleService.rolePage(data.current);
      const role = await initService.transformData(dataRes.data.content, data.roleTable);
      const payload = {
        roleTotal: dataRes.data.totalElements,
        roleTableData: role.data.objectList,
        roleCurrent: data.current,
        roleLoadingVisible: false,
      };
      dispatch.role.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async roleEdit(data) {
      if (data) {
        const role = await roleService.findRoleById(data.id);
        const fromData = {
          ...role.data,
        };
        const payload = {
          roleFormData: fromData,
          roleVisible: true,
        };
        dispatch.role.setState(payload);
      } else {
        const payload = {
          roleFormData: {},
          roleVisible: true,
        };
        dispatch.role.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    async roleDelete(data) {
      await roleService.roleDelete(data.record);
      const dataRes = await roleService.rolePage(data.roleCurrent);
      const role = await initService.transformData(dataRes.data.content, data.roleTable);
      const payload = {
        roleTotal: dataRes.data.totalElements,
        roleTableData: role.data.objectList,
        roleCurrent: data.roleCurrent,
      };
      dispatch.role.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async roleSave(data) {
      await roleService.roleSave(data.roleFormData);
      const dataRes = await roleService.rolePage(data.roleCurrent);
      const role = await initService.transformData(dataRes.data.content, data.roleTable);
      const payload = {
        roleTotal: dataRes.data.totalElements,
        roleTableData: role.data.objectList,
        roleCurrent: data.roleCurrent,
        roleVisible: false,
      };
      dispatch.role.setState(payload);
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
        dispatch.role.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        roleFormData: data,
      };
      dispatch.role.setState(payload);
    },
    /**
     * 获取表格和表格初始化数据
     *
     * @param {*} data
     */
    async findDataTableAndFormByName() {
      const dataRes = await roleService.rolePage(1);
      const dataTableRes = await initService.findDataTableByName('roleTable');
      const dataFormRes = await initService.findDataFormByName('roleForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        roleTable: dataTableRes.data,
        roleForm: data.data.objectForm,
        roleTotal: dataRes.data.totalElements,
        roleTableData: data.data.objectList,
        roleCurrent: 1,
        roleLoadingVisible: false,
      };
      dispatch.role.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};