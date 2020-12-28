import userService from '../services/user';

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
    userPage(data) {
      userService.userPage(data).then(res => {
        const payload = {
          userTotal: res.data.totalElements,
          userTableData: res.data.content,
          userCurrent: data,
          userLoadingVisible: false,
        };
        dispatch.user.setState(payload);
      });
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    userEdit(data) {
      if (data) {
        const fromData = {
          ...data,
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
    userDelete(data) {
      userService.userDelete(data.record).then(() => {
        userService.userPage(data.userCurrent).then(res => {
          const payload = {
            userTotal: res.data.totalElements,
            userTableData: res.data.content,
            userCurrent: data.userCurrent,
          };
          dispatch.user.setState(payload);
        });
      });
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    userSave(data) {
      userService.userSave(data.userFormData).then(() => {
        userService.userPage(data.userCurrent).then(res => {
          const payload = {
            userTotal: res.data.totalElements,
            userTableData: res.data.content,
            userCurrent: data.userCurrent,
          };
          dispatch.user.setState(payload);
        });
      });
      const payload = { userVisible: false };
      dispatch.user.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      userService.findCatalogByValue(data).then(res => {
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
     * 获取表单
     *
     * @param {*} data
     */
    async findDataFormByName(data) {
      const formArray = [];
      const results = [];
      const userRes = await userService.findDataFormByName(data);
      for (let i = 0; i < userRes.data.length; i++) {
        if (userRes.data[i].type === 'Select' && userRes.data[i].dataSource !== null) {
          results.push(userService.findCatalogByValue(userRes.data[i].dataSource).then(res => {
            const formArr = [];
            res.forEach(item => {
              formArr.push({
                label: item.dictionaryName,
                value: item.dictionaryValue,
              });
            });
            formArray.push({ ...userRes.data[i], dataSource: formArr });
          }));
        } else {
          formArray.push(userRes.data[i]);
        }
      }
      await Promise.all(results);
      const payload = {
        userForm: formArray,
      };
      dispatch.user.setState(payload);
    },
    /**
     * 获取表格
     *
     * @param {*} data
     */
    async findDataTableByName(data) {
      const dataTableRes = await userService.findDataTableByName(data);
      const payload = {
        userTable: dataTableRes.data,
      };
      dispatch.user.setState(payload);
    },
    // <=============================可选方法 start =============================>
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>

    // <=============================自定义方法 end   =============================>
  }),
};