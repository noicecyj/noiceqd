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
        pageSize: 5,
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
  entityNameSave(entityNameFormData) {
    return request({
      url: '/entityCreateApi/entityNameSave',
      method: 'post',
      data: entityNameFormData,
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
  // <=============================自定义请求 start =============================>
  createEntityFile(value) {
    return request({
      url: '/entityCreateApi/createEntity',
      method: 'post',
      data: value,
    });
  },
  createComponentFile(value) {
    return request({
      url: '/entityCreateApi/createComponentFile',
      method: 'post',
      data: value,
    });
  },
  selectEntityFindAll() {
    return request({
      url: '/entityCreateApi/selectEntityFindAll',
      method: 'post',
    });
  },
  // <=============================自定义请求 end   =============================>
};
