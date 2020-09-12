import { request } from 'ice';

export default {
  entityNamePage(value) {
    return request({
      url: '/entityCreateApi/entityNamePage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 5,
        sortCode: 'sortCode'
      }
    });
  },
  entityNameDelete(record) {
    return request({
      url: '/entityCreateApi/entityNameDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  entityNameSave(entityNameFormData) {
    return request({
      url: '/entityCreateApi/entityNameSave',
      method: 'post',
      data: entityNameFormData
    })
  },
  entityPage(id, value) {
    return request({
      url: '/entityCreateApi/entityPage',
      method: 'post',
      params: {
        id,
        pageNumber: value,
        pageSize: 5,
        sortCode: 'sortCode'
      }
    })
  },
  entityDelete(record) {
    return request({
      url: '/entityCreateApi/entityDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  entitySave(entityFormData, entityId) {
    return request({
      url: '/entityCreateApi/entitySave',
      method: 'post',
      data: { ...entityFormData, pid: entityId }
    })
  },
  createEntity(value) {
    return request({
      url: '/entityCreateApi/entity',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(value),
    });
  },
  createEntityFile(value) {
    return request({
      url: '/entityCreateApi/createEntity',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(value),
    });
  },
  findCatalogByValue(value) {
    return request({
      url: '/dictionaryApi/findCatalogByValue',
      method: 'post',
      params: {
        value
      }
    });
  },
  upEntity(value) {
    return request({
      url: '/entityCreateApi/upEntity',
      method: 'post',
      params: {
        id: value
      }
    });
  },
  downEntity(value) {
    return request({
      url: '/entityCreateApi/downEntity',
      method: 'post',
      params: {
        id: value
      }
    });
  },
}