import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} value
   * @return {*} 
   */
  menuPagePage(value) {
    return request({
      url: '/pageMenuApi/menuPagePage',
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
   * @param {*} menuPageFormData
   * @return {*} 
   */
  menuPageSave(data) {
    return request({
      url: '/pageMenuApi/menuPageSave',
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
  menuPageDelete(record) {
    return request({
      url: '/pageMenuApi/menuPageDelete',
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
  findMenuPageById(id) {
    return request({
      url: '/pageMenuApi/findMenuPageById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  // <=============================自定义请求 end   =============================>
};