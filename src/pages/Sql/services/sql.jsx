import { request } from 'ice';

export default {
  sqlPage(value) {
    return request({
      url: '/sqlApi/sqlPage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 13,
        sortCode: 'sortCode'
      }
    });
  },
  sqlDelete(record) {
    return request({
      url: '/sqlApi/sqlDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  sqlSave(data) {
    return request({
      url: '/sqlApi/sqlSave',
      method: 'post',
      data
    })
  },
  sqlExcited(data) {
    return request({
      url: '/sqlApi/doSql',
      method: 'post',
      params: {
        sqlStr: data.sqlStr,
        sqlType: data.sqlType
      }
    })
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