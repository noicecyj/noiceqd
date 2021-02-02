import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} id
   * @param {*} value
   * @return {*} 
   */
  dictionaryPage(id, value) {
    return request({
      url: '/dictionaryApi/dictionaryPage',
      method: 'post',
      params: {
        id,
        pageNumber: value,
        pageSize: 13,
        sortCode: 'sortCode',
      },
    });
  },
  /**
   * 保存
   *
   * @param {*} dictionaryFormData
   * @param {*} catalogId
   * @return {*} 
   */
  dictionarySave(catalogId, dictionaryFormData) {
    return request({
      url: '/dictionaryApi/dictionarySave',
      method: 'post',
      data: { ...dictionaryFormData, pid: catalogId },
    });
  },
  /**
   * 删除
   *
   * @param {*} record
   * @return {*} 
   */
  dictionaryDelete(record) {
    return request({
      url: '/dictionaryApi/dictionaryDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  /**
   * 根据ID查询
   * 
   * @param {*} id
   * @return {*} 
   */
  findDictionaryById(id) {
    return request({
      url: '/dictionaryApi/findDictionaryById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  // <=============================自定义请求 end   =============================>
};