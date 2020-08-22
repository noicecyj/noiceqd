import roleService from '../services/role'

export default {

  namespace: 'role',

  state: {
    roleTableData: [],
    roleVisible: false,
    roleFormData: {},
    roleLoadingVisible: true,
    roleTotal: 0,
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
    rolePage() {
      roleService.rolePage().then(res => {
        const payload = {
          roleTotal: res.data[1],
          roleTableData: [res.data[0]],
          roleLoadingVisible: false
        }
        dispatch.role.setState(payload);
      })
    },
    editrole(data) {
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
    deleterole(data) {
      roleService.roleDelete(data).then(() => {
        roleService.rolePage().then(res => {
          const payload = {
            roleTotal: res.data[1],
            roleTableData: [res.data[0]],
          }
          dispatch.role.setState(payload);
        })
      })
    },
    saverole(data) {
      roleService.roleSave(data.roleFormData).then(() => {
        roleService.rolePage().then(res => {
          const payload = {
            roleTotal: res.data[1],
            roleTableData: [res.data[0]],
          }
          dispatch.role.setState(payload);
        })
      })
      const payload = { roleVisible: false }
      dispatch.role.setState(payload);
    },
  })
};