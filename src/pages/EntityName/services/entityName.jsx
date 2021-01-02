import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} value
   * @return {*} 
   */
  entityNamePage(value) {
    return request({
      url: '/entityCreateApi/entityNamePage',
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
   * @param {*} entityNameFormData
   * @return {*} 
   */
  entityNameSave(data) {
    return request({
      url: '/entityCreateApi/entityNameSave',
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
  entityNameDelete(record) {
    return request({
      url: '/entityCreateApi/entityNameDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
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
   * 获取表单
   *
   * @param {*} name
   * @return {*} 
   */
  findDataFormByName(name) {
    return request({
      url: '/pageMenuApi/findDataFormByName',
      method: 'post',
      params: {
        name,
      },
    });
  },
  /**
   * 获取表格
   *
   * @param {*} name
   * @return {*} 
   */
  findDataTableByName(name) {
    return request({
      url: '/pageMenuApi/findDataTableByName',
      method: 'post',
      params: {
        name,
      },
    });
  },
  // <=============================自定义请求 start =============================>

  // <=============================自定义请求 end   =============================>
};