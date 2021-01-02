import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} id
   * @param {*} value
   * @return {*} 
   */
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
  /**
   * 保存
   *
   * @param {*} entityFormData
   * @param {*} entityNameId
   * @return {*} 
   */
  entitySave(entityFormData, entityNameId) {
    return request({
      url: '/entityCreateApi/entitySave',
      method: 'post',
      data: { ...entityFormData, pid: entityNameId },
    });
  },
  /**
   * 删除
   *
   * @param {*} record
   * @return {*} 
   */
  entityDelete(record) {
    return request({
      url: '/entityCreateApi/entityDelete',
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