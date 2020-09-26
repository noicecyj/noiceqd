import { request } from 'ice';

export default {
  logPage(value) {
    return request({
      url: '/logApi/serverPage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 13,
        sortCode: 'sortCode',
      },
    });
  },
  logDelete(record) {
    return request({
      url: '/logApi/serverDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  logSave(data) {
    return request({
      url: '/logApi/saveServer',
      method: 'post',
      data,
    });
  },
  findLogsByPort(data) {
    return request({
      url: '/logApi/findLogsByPort',
      method: 'post',
      params: {
        port: data,
      },
    });
  },
  deleteLogsByPort(data) {
    return request({
      url: '/logApi/deleteLogsByPort',
      method: 'post',
      params: {
        port: data,
      },
    });
  },
};
