import pageFunctionService from '../services/pagefunction';

export default {

  namespace: 'pagefunction',

  state: {
    pageFunctionTableData: [],
    pageFunctionVisible: false,
    pageFunctionFormData: {},
    pageFunctionLoadingVisible: true,
    pageFunctionTotal: 0,
    pageFunctionCurrent: 1,
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
    pageFunctionPage(data) {
      pageFunctionService.pageFunctionPage(data).then(res => {
        const payload = {
          pageFunctionTotal: res.data.totalElements,
          pageFunctionTableData: res.data.content,
          pageFunctionLoadingVisible: false,
        };
        dispatch.pagefunction.setState(payload);
      });
    },
    pageFunctionEdit(data) {
      if (data) {
        const payload = {
          pageFunctionFormData: data,
          pageFunctionVisible: true,
        };
        dispatch.pagefunction.setState(payload);
      } else {
        const payload = {
          pageFunctionFormData: {},
          pageFunctionVisible: true,
        };
        dispatch.pagefunction.setState(payload);
      }
    },
    pageFunctionDelete(data) {
      pageFunctionService.pageFunctionDelete(data.record).then(() => {
        pageFunctionService.pageFunctionPage(data.pageFunctionCurrent).then(res => {
          const payload = {
            pageFunctionTotal: res.data.totalElements,
            pageFunctionTableData: res.data.content,
            pageFunctionLoadingVisible: false,
          };
          dispatch.pagefunction.setState(payload);
        });
      });
    },
    pageFunctionSave(data) {
      pageFunctionService.pageFunctionSave(data.pageFunctionFormData).then(() => {
        pageFunctionService.pageFunctionPage(data.pageFunctionCurrent).then(res => {
          const payload = {
            pageFunctionTotal: res.data.totalElements,
            pageFunctionTableData: res.data.content,
            pageFunctionLoadingVisible: false,
          };
          dispatch.pagefunction.setState(payload);
        });
      });
      const payload = { pageFunctionVisible: false };
      dispatch.pagefunction.setState(payload);
    },
  }),
};
