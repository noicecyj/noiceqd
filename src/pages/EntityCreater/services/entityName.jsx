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
  findCatalogByValue(value) {
    return request({
      url: '/dictionaryApi/findCatalogByValue',
      method: 'post',
      params: {
        value,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  createEntityFile(value) {
    return request({
      url: '/entityCreateApi/createEntity',
      method: 'post',
      data: value,
    });
  },
  createComponentFile(value) {
    return request({
      url: '/entityCreateApi/createComponentFile',
      method: 'post',
      data: value,
    });
  },
  selectEntityFindAll() {
    return request({
      url: '/entityCreateApi/selectEntityFindAll',
      method: 'post',
    });
  },
  // <=============================自定义请求 end   =============================>
};
