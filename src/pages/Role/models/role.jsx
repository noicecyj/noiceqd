import roleService from '../services/role'

export default {

  namespace: 'role',

  state: {
    roleTableData: [],
    roleVisible: false,
    roleFormData: {},
    roleLoadingVisible: true,
    roleTotal: 0,
    roleCurrent: 1,
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
    rolePage(data) {
      roleService.rolePage(data).then(res => {
        const payload = {
          roleTotal: res.data.totalElements,
          roleTableData: res.data.content,
          roleLoadingVisible: false
        }
        dispatch.role.setState(payload);
      })
    },
    roleEdit(data) {
      if (data) {
        const payload = {
          roleFormData: data,
          roleVisible: true
        }
        dispatch.role.setState(payload);
      } else {
        const payload = {
          roleFormData: {},
          roleVisible: true
        }
        dispatch.role.setState(payload);
      }
    },
    roleDelete(data) {
      roleService.roleDelete(data.record).then(() => {
        roleService.rolePage(data.roleCurrent).then(res => {
          const payload = {
            roleTotal: res.data.totalElements,
            roleTableData: res.data.content,
            roleLoadingVisible: false
          }
          dispatch.role.setState(payload);
        })
      })
    },
    roleSave(data) {
      roleService.roleSave(data.roleFormData).then(() => {
        roleService.rolePage(data.roleCurrent).then(res => {
          const payload = {
            roleTotal: res.data.totalElements,
            roleTableData: res.data.content,
            roleLoadingVisible: false
          }
          dispatch.role.setState(payload);
        })
      })
      const payload = { roleVisible: false }
      dispatch.role.setState(payload);
    },
  })
};