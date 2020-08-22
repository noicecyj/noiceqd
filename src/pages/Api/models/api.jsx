import apiService from '../services/api'

export default {

  namespace: 'api',

  state: {
    apiTableData: [],
    apiVisible: false,
    apiFormData: {},
    apiLoadingVisible: true,
    apiTotal: 0,
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
    apiPage() {
      apiService.apiPage().then(res => {
        const payload = {
          apiTotal: res.data[1],
          apiTableData: [res.data[0]],
          apiLoadingVisible: false
        }
        dispatch.api.setState(payload);
      })
    },
    editapi(data) {
      if (data) {
        const payload = {
          apiFormData: data,
          apiVisible: true
        }
        dispatch.api.setState(payload);
      } else {
        const payload = {
          apiFormData: {},
          apiVisible: true
        }
        dispatch.api.setState(payload);
      }
    },
    deleteapi(data) {
      apiService.apiDelete(data).then(() => {
        apiService.apiPage().then(res => {
          const payload = {
            apiTotal: res.data[1],
            apiTableData: [res.data[0]],
          }
          dispatch.api.setState(payload);
        })
      })
    },
    saveapi(data) {
      apiService.apiSave(data.apiFormData).then(() => {
        apiService.apiPage().then(res => {
          const payload = {
            apiTotal: res.data[1],
            apiTableData: [res.data[0]],
          }
          dispatch.api.setState(payload);
        })
      })
      const payload = { apiVisible: false }
      dispatch.api.setState(payload);
    },
  })
};