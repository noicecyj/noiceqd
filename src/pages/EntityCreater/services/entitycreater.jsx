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
  entityPage(id, value) {
    return request({
      url: '/entityCreateApi/entityPage',
      method: 'post',
      params: {
        id,
        pageNumber: value,
        pageSize: 5,
        sortCode: 'sortCode',
      },
    });
  },
  entityDelete(record) {
    return request({
      url: '/entityCreateApi/entityDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  entitySave(entityFormData, entityId) {
    return request({
      url: '/entityCreateApi/entitySave',
      method: 'post',
      data: { ...entityFormData, pid: entityId },
    });
  },
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
  findCatalogByValue(value) {
    return request({
      url: '/dictionaryApi/findCatalogByValue',
      method: 'post',
      params: {
        value,
      },
    });
  },
  upEntity(value) {
    return request({
      url: '/entityCreateApi/upEntity',
      method: 'post',
      params: {
        id: value,
      },
    });
  },
  downEntity(value) {
    return request({
      url: '/entityCreateApi/downEntity',
      method: 'post',
      params: {
        id: value,
      },
    });
  },
};
