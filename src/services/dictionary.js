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
  selectFindAll(value) {
    return request({
      url: '/sqlApi/doFindAllSql',
      method: 'post',
      params: {
        tableName: value,
      },
    });
  },
};
