import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} value
   * @return {*} 
   */
  userPage(value) {
    return request({
      url: '/ssoApi/userPage',
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
   * @param {*} userFormData
   * @return {*} 
   */
  userSave(data) {
    console.log(data);
    return request({
      url: '/ssoApi/userSave',
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
  userDelete(record) {
    return request({
      url: '/ssoApi/userDelete',
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
  findUserById(id) {
    return request({
      url: '/ssoApi/findUserById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  // <=============================自定义请求 end   =============================>
};