import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} value
   * @return {*} 
   */
  dataFormPage(value) {
    return request({
      url: '/pageMenuApi/dataFormPage',
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
   * @param {*} dataFormFormData
   * @return {*} 
   */
  dataFormSave(data) {
    return request({
      url: '/pageMenuApi/dataFormSave',
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
  dataFormDelete(record) {
    return request({
      url: '/pageMenuApi/dataFormDelete',
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
  findDataFormById(id) {
    return request({
      url: '/pageMenuApi/findDataFormById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  // <=============================自定义请求 end   =============================>
};