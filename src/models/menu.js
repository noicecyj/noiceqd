import pagemenuService from '../services/menu';

export default {

  state: {
    asideMenuConfig: [],
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    asideMenuConfig() {
      pagemenuService.asideMenuConfig().then(res => {
        const payload = {
          asideMenuConfig: res.data.children,
        };
        dispatch.menu.setState(payload);
      });
    },
  }),
};
