import { request } from 'ice';

export default {
  rolePage() {
    return request({
      url: '/ssoApi/rolePage',
      method: 'post'
    });
  },
  roleDelete(record) {
    return request({
      url: '/ssoApi/roleDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  saveRole(data) {
    return request({
      url: '/ssoApi/saveRole',
      method: 'post',
      data
    })
  },
}