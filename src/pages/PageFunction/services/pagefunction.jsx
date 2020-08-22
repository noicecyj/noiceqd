import { request } from 'ice';

export default {
  pageFunctionPage() {
    return request({
      url: '/ssoApi/pageFunctionPage',
      method: 'post'
    });
  },
  pageFunctionDelete(record) {
    return request({
      url: '/ssoApi/pageFunctionDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  pageFunctionSave(data) {
    return request({
      url: '/ssoApi/pageFunctionSave',
      method: 'post',
      data
    })
  },
}