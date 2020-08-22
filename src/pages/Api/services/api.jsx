import { request } from 'ice';

export default {
  apiPage() {
    return request({
      url: '/ssoApi/apiPage',
      method: 'post'
    });
  },
  apiDelete(record) {
    return request({
      url: '/ssoApi/apiDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  apiSave(data) {
    return request({
      url: '/ssoApi/apiSave',
      method: 'post',
      data
    })
  },
}