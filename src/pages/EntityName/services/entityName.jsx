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
   * 根据ID查询
   *
   * @param {*} id
   * @return {*} 
   */
  findEntityNameById(id) {
    return request({
      url: '/entityCreateApi/findEntityNameById',
      method: 'post',
      params: {
        id,
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
  // <=============================自定义请求 end   =============================>
};