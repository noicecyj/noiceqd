import { request } from 'ice';

export default {
  asideMenuConfig() {
    return request({
      url: '/pageMenuApi/asideMenuConfig',
      method: 'post',
    });
  },
};
