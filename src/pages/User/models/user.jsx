import userService from '../services/user'

export default {

  namespace: 'user',

  state: {
    userTableData: [],
    userVisible: false,
    userFormData: {},
    userLoadingVisible: true,
    userTotal: 0,
    formItemLayout: {
      labelCol: {
        fixedSpan: 6
      },
      wrapperCol: {
        span: 40
      }
    }
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload }
    }
  },

  effects: (dispatch) => ({
    userPage() {
      userService.userPage().then(res => {
        const payload = {
          userTotal: res.data[1],
          userTableData: [res.data[0]],
          userLoadingVisible: false
        }
        dispatch.user.setState(payload);
      })
    },
    edituser(data) {
      if (data) {
        const payload = {
          userFormData: data,
          userVisible: true
        }
        dispatch.user.setState(payload);
      } else {
        const payload = {
          userFormData: {},
          userVisible: true
        }
        dispatch.user.setState(payload);
      }
    },
    deleteuser(data) {
      userService.userDelete(data).then(() => {
        userService.userPage().then(res => {
          const payload = {
            userTotal: res.data[1],
            userTableData: [res.data[0]],
          }
          dispatch.user.setState(payload);
        })
      })
    },
    saveuser(data) {
      userService.userSave(data.userFormData).then(() => {
        userService.userPage().then(res => {
          const payload = {
            userTotal: res.data[1],
            userTableData: [res.data[0]],
          }
          dispatch.user.setState(payload);
        })
      })
      const payload = { userVisible: false }
      dispatch.user.setState(payload);
    },
  })
};