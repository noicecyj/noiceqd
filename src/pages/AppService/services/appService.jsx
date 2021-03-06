import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} value
   * @return {*} 
   */
  appServicePage(value) {
    return request({
      url: '/entityCreateApi/appServicePage',
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
   * @param {*} appServiceFormData
   * @return {*} 
   */
  appServiceSave(data) {
    return request({
      url: '/entityCreateApi/appServiceSave',
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
  appServiceDelete(record) {
    return request({
      url: '/entityCreateApi/appServiceDelete',
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
  findAppServiceById(id) {
    return request({
      url: '/entityCreateApi/findAppServiceById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  // <=============================自定义请求 end   =============================>
};