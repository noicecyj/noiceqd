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
        pageSize: 13,
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
   * 根据ID查询
   * 
   * @param {*} id
   * @return {*} 
   */
  findEntityById(id) {
    return request({
      url: '/entityCreateApi/findEntityById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  /**
   * 上移
   *
   * @param {*} value
   * @return {*}
   */
  upEntity(value) {
    return request({
      url: '/entityCreateApi/upEntity',
      method: 'post',
      params: {
        id: value,
      },
    });
  },
  /**
   * 下移
   *
   * @param {*} value
   * @return {*}
   */
  downEntity(value) {
    return request({
      url: '/entityCreateApi/downEntity',
      method: 'post',
      params: {
        id: value,
      },
    });
  },
  // <=============================自定义请求 end   =============================>
};