import apiService from '../services/api'

export default {

  namespace: 'api',

  state: {
    apiTableData: [],
    apiVisible: false,
    apiFormData: {},
    apiLoadingVisible: true,
    apiTotal: 0,
    apiCurrent: 1,
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
    apiPage(data) {
      apiService.apiPage(data).then(res => {
        const payload = {
          apiTotal: res.data.totalElements,
          apiTableData: res.data.content,
          apiLoadingVisible: false
        }
        dispatch.api.setState(payload);
      })
    },
    apiEdit(data) {
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
    apiDelete(data) {
      apiService.apiDelete(data.record).then(() => {
        apiService.apiPage(data.apiCurrent).then(res => {
          const payload = {
            apiTotal: res.data.totalElements,
            apiTableData: res.data.content,
            apiLoadingVisible: false
          }
          dispatch.api.setState(payload);
        })
      })
    },
    apiSave(data) {
      apiService.apiSave(data.apiFormData).then(() => {
        apiService.apiPage(data.apiCurrent).then(res => {
          const payload = {
            apiTotal: res.data.totalElements,
            apiTableData: res.data.content,
            apiLoadingVisible: false
          }
          dispatch.api.setState(payload);
        })
      })
      const payload = { apiVisible: false }
      dispatch.api.setState(payload);
    },
  })
};