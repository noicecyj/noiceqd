import pagemenuService from '../services/pagemenu';

export default {

  namespace: 'pagemenu',

  state: {
    pagemenuTableData: [],
    pagemenuVisible: false,
    pagemenuFormData: {},
    pagemenuLoadingVisible: true,
    pagemenuTotal: 0,
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
    PageMenuPage() {
      pagemenuService.pageMenuPage().then(res => {
        const payload = {
          pagemenuTotal: res.data[1],
          pagemenuTableData: [res.data[0]],
          pagemenuLoadingVisible: false,
        };
        dispatch.pagemenu.setState(payload);
      });
    },
    editPageMenu(data) {
      console.log(data);
      if (data) {
        const payload = {
          pagemenuFormData: data,
          pagemenuVisible: true,
        };
        dispatch.pagemenu.setState(payload);
      } else {
        const payload = {
          pagemenuFormData: {},
          pagemenuVisible: true,
        };
        dispatch.pagemenu.setState(payload);
      }
    },
    deletePageMenu(data) {
      pagemenuService.pageMenuDelete(data).then(() => {
        pagemenuService.pageMenuPage().then(res => {
          const payload = {
            pagemenuTotal: res.data[1],
            pagemenuTableData: [res.data[0]],
          };
          dispatch.pagemenu.setState(payload);
        });
      });
    },
    savePageMenu(data) {
      pagemenuService.pageMenuSave(data.pagemenuFormData).then(() => {
        pagemenuService.pageMenuPage().then(res => {
          const payload = {
            pagemenuTotal: res.data[1],
            pagemenuTableData: [res.data[0]],
          };
          dispatch.pagemenu.setState(payload);
        });
      });
      const payload = { pagemenuVisible: false };
      dispatch.pagemenu.setState(payload);
    },
    createRouteFile() {
      pagemenuService.createRouteFile();
    },
    createComponentFile(data) {
      pagemenuService.createComponentFile(data).then(() => {
        pagemenuService.pageMenuPage().then(res => {
          const payload = {
            pagemenuTotal: res.data[1],
            pagemenuTableData: [res.data[0]],
          };
          dispatch.pagemenu.setState(payload);
        });
      });
    },
  }),
};
