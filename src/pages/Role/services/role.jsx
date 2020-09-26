import { request } from 'ice';

export default {
  rolePage(value) {
    return request({
      url: '/ssoApi/rolePage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 13,
        sortCode: 'sortCode',
      },
    });
  },
  roleDelete(record) {
    return request({
      url: '/ssoApi/roleDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  roleSave(data) {
    return request({
      url: '/ssoApi/roleSave',
      method: 'post',
      data,
    });
  },
};
