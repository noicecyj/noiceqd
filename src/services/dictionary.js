import { request } from 'ice';

export default {
  /**
   * 获取字典
   *
   * @param {*} value
   * @return {*} 
   */
  findCatalogByValue(value) {
    return request({
      url: '/dictionaryApi/findCatalogByValue',
      method: 'post',
      params: {
        value,
      },
    });
  },
  /**
   * 获取字典
   *
   * @param {*} value
   * @return {*} 
   */
  findDictionaryByCatalogValueAndDictionaryKey(value) {
    return request({
      url: '/dictionaryApi/findDictionaryByCatalogValueAndDictionaryKey',
      method: 'post',
      params: {
        value: value.value,
        key: value.key,
      },
    });
  },
  selectFindAll(value) {
    return request({
      url: '/sqlApi/doFindAllSql',
      method: 'post',
      params: {
        tableName: value,
      },
    });
  },
  selectFindById(value) {
    return request({
      url: '/sqlApi/doFindSqlById',
      method: 'post',
      params: {
        tableName: value.tableName,
        id: value.id,
      },
    });
  },
  transformData(dataSource, dataTableItemList) {
    return request({
      url: '/pageMenuApi/transformData',
      method: 'post',
      data: {
        dataSource,
        dataTableItemList,
      },
    });
  },
};
