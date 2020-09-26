import { request } from 'ice';

export default {
  apiPage(value) {
    return request({
      url: '/ssoApi/apiPage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 13,
        sortCode: 'sortCode',
      },
    });
  },
  apiDelete(record) {
    return request({
      url: '/ssoApi/apiDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  apiSave(data) {
    return request({
      url: '/ssoApi/apiSave',
      method: 'post',
      data,
    });
  },
};
