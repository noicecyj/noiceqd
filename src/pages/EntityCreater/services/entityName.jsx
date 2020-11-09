import { request } from 'ice';

export default {
  entityNamePage(value) {
    return request({
      url: '/entityCreateApi/entityNamePage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 5,
        sortCode: 'sortCode',
      },
    });
  },
  entityNameDelete(record) {
    return request({
      url: '/entityCreateApi/entityNameDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  entityNameSave(entityNameFormData) {
    return request({
      url: '/entityCreateApi/entityNameSave',
      method: 'post',
      data: entityNameFormData,
    });
  },
};
