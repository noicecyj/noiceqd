import { request } from 'ice';

export default {
  pageFunctionPage(value) {
    return request({
      url: '/ssoApi/pageFunctionPage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 13,
        sortCode: 'sortCode'
      }
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