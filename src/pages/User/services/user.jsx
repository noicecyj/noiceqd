import { request } from 'ice';

export default {
  userPage(value) {
    return request({
      url: '/ssoApi/userPage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 13,
        sortCode: 'sortCode',
      },
    });
  },
  userDelete(record) {
    return request({
      url: '/ssoApi/userDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  userSave(data) {
    return request({
      url: '/ssoApi/userSave',
      method: 'post',
      data,
    });
  },
};
