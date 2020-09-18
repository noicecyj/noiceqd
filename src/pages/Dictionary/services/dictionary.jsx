import { request } from 'ice';

export default {
  catalogPage(value) {
    return request({
      url: '/dictionaryApi/catalogPage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 5,
        sortCode: 'sortCode'
      }
    });
  },
  catalogDelete(record) {
    return request({
      url: '/dictionaryApi/catalogDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  saveCatalog(catalogFormData) {
    return request({
      url: '/dictionaryApi/catalogSave',
      method: 'post',
      data: catalogFormData
    })
  },
  searchCatalog(value) {
    return request({
      url: '/dictionaryApi/findAllByCatalogNameContainsOrCatalogValueContains',
      method: 'post',
      params: {
        catalogName: value,
        catalogValue: value,
        pageNumber: 1,
        pageSize: 5,
        sortCode: 'sortCode'
      }
    })
  },
  deleteDictionary(record) {
    return request({
      url: '/dictionaryApi/dictionaryDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  getDictionaryByPage(id, value) {
    return request({
      url: '/dictionaryApi/dictionaryPage',
      method: 'post',
      params: {
        id,
        pageNumber: value,
        pageSize: 5,
        sortCode: 'sortCode'
      }
    })
  },
  saveDictionary(dictionaryFormData, dictionaryId) {
    return request({
      url: '/dictionaryApi/dictionarySave',
      method: 'post',
      data: { ...dictionaryFormData, pid: dictionaryId }
    })
  }
}