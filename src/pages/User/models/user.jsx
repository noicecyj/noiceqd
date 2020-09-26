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
    formItemLayout: {
      labelCol: {
        fixedSpan: 6,
      },
      wrapperCol: {
        span: 40,
      },
    },
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    userPage(data) {
      userService.userPage(data).then(res => {
        const payload = {
          userTotal: res.data.totalElements,
          userTableData: res.data.content,
          userLoadingVisible: false,
        };
        dispatch.user.setState(payload);
      });
    },
    userEdit(data) {
      if (data) {
        const payload = {
          userFormData: data,
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
    userDelete(data) {
      userService.userDelete(data.record).then(() => {
        userService.userPage(data.userCurrent).then(res => {
          const payload = {
            userTotal: res.data.totalElements,
            userTableData: res.data.content,
            userLoadingVisible: false,
          };
          dispatch.user.setState(payload);
        });
      });
    },
    userSave(data) {
      userService.userSave(data.userFormData).then(() => {
        userService.userPage(data.userCurrent).then(res => {
          const payload = {
            userTotal: res.data.totalElements,
            userTableData: res.data.content,
            userLoadingVisible: false,
          };
          dispatch.user.setState(payload);
        });
      });
      const payload = { userVisible: false };
      dispatch.user.setState(payload);
    },
  }),
};
