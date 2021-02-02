import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} value
   * @return {*} 
   */
  catalogPage(value) {
    return request({
      url: '/dictionaryApi/catalogPage',
      method: 'post',
      params: {
        pageNumber: value,
        pageSize: 13,
        sortCode: 'sortCode',
      },
    });
  },
  /**
   * 保存
   *
   * @param {*} catalogFormData
   * @return {*} 
   */
  catalogSave(data) {
    return request({
      url: '/dictionaryApi/catalogSave',
      method: 'post',
      data,
    });
  },
  /**
   * 删除
   *
   * @param {*} record
   * @return {*} 
   */
  catalogDelete(record) {
    return request({
      url: '/dictionaryApi/catalogDelete',
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
  findCatalogById(id) {
    return request({
      url: '/dictionaryApi/findCatalogById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  // <=============================自定义请求 end   =============================>
};