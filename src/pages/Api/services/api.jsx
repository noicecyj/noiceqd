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
  saveApi(data) {
    return request({
      url: '/ssoApi/saveApi',
      method: 'post',
      data
    })
  },
}