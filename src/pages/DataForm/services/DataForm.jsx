import { request } from 'ice';

export default {
  dataFormPage(value) {
    return request({
      url: '/pageMenuApi/dataFormPage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 5,
        sortCode: 'sortCode',
      },
    });
  },
  dataFormDelete(record) {
    return request({
      url: '/pageMenuApi/dataFormDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  dataFormSave(data) {
    return request({
      url: '/pageMenuApi/dataFormSave',
      method: 'post',
      data,
    });
  },
  dataItemPage(id, value) {
    return request({
      url: '/pageMenuApi/dataItemPage',
      method: 'post',
      params: {
        id,
        pageNumber: value,
        pageSize: 5,
        sortCode: 'sortCode',
      },
    });
  },
  dataItemDelete(record) {
    return request({
      url: '/pageMenuApi/dataItemDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  dataItemSave(data, id) {
    return request({
      url: '/pageMenuApi/dataItemSave',
      method: 'post',
      data: { ...data, pid: id },
    });
  },
};