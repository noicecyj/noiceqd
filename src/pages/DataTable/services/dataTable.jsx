import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} value
   * @return {*} 
   */
  dataTablePage(value) {
    return request({
      url: '/pageMenuApi/dataTablePage',
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
   * @param {*} dataTableFormData
   * @return {*} 
   */
  dataTableSave(data) {
    return request({
      url: '/pageMenuApi/dataTableSave',
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
  dataTableDelete(record) {
    return request({
      url: '/pageMenuApi/dataTableDelete',
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
  findDataTableById(id) {
    return request({
      url: '/pageMenuApi/findDataTableById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  // <=============================自定义请求 end   =============================>
};