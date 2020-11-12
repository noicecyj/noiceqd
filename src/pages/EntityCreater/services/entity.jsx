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
   *保存
   *
   * @param {*} entityFormData
   * @param {*} entityId
   * @return {*} 
   */
  entitySave(entityFormData, entityId) {
    return request({
      url: '/entityCreateApi/entitySave',
      method: 'post',
      data: { ...entityFormData, pid: entityId },
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
};