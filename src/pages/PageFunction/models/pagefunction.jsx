import pageFunctionService from '../services/pagefunction'

export default {

  namespace: 'pageFunction',

  state: {
    pageFunctionTableData: [],
    pageFunctionVisible: false,
    pageFunctionFormData: {},
    pageFunctionLoadingVisible: true,
    pageFunctionTotal: 0,
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
    pageFunctionPage() {
      pageFunctionService.pageFunctionPage().then(res => {
        const payload = {
          pageFunctionTotal: res.data[1],
          pageFunctionTableData: [res.data[0]],
          pageFunctionLoadingVisible: false
        }
        dispatch.pageFunction.setState(payload);
      })
    },
    editpageFunction(data) {
      if (data) {
        const payload = {
          pageFunctionFormData: data,
          pageFunctionVisible: true
        }
        dispatch.pageFunction.setState(payload);
      } else {
        const payload = {
          pageFunctionFormData: {},
          pageFunctionVisible: true
        }
        dispatch.pageFunction.setState(payload);
      }
    },
    deletepageFunction(data) {
      pageFunctionService.pageFunctionDelete(data).then(() => {
        pageFunctionService.pageFunctionPage().then(res => {
          const payload = {
            pageFunctionTotal: res.data[1],
            pageFunctionTableData: [res.data[0]],
          }
          dispatch.pageFunction.setState(payload);
        })
      })
    },
    savepageFunction(data) {
      pageFunctionService.pageFunctionSave(data.pageFunctionFormData).then(() => {
        pageFunctionService.pageFunctionPage().then(res => {
          const payload = {
            pageFunctionTotal: res.data[1],
            pageFunctionTableData: [res.data[0]],
          }
          dispatch.pageFunction.setState(payload);
        })
      })
      const payload = { pageFunctionVisible: false }
      dispatch.pageFunction.setState(payload);
    },
  })
};