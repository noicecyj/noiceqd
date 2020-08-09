import { request } from 'ice';

export default {
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
  }
}