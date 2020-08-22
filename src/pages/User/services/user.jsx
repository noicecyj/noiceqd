import { request } from 'ice';

export default {
  userPage() {
    return request({
      url: '/ssoApi/userPage',
      method: 'post'
    });
  },
  userDelete(record) {
    return request({
      url: '/ssoApi/userDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  userSave(data) {
    return request({
      url: '/ssoApi/userSave',
      method: 'post',
      data
    })
  },
}