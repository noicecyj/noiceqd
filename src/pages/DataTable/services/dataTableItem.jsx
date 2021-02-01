import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} id
   * @param {*} value
   * @return {*} 
   */
  dataTableItemPage(id, value) {
    return request({
      url: '/pageMenuApi/dataTableItemPage',
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
   * @param {*} dataTableItemFormData
   * @param {*} dataTableId
   * @return {*} 
   */
  dataTableItemSave(dataTableItemFormData, dataTableId) {
    return request({
      url: '/pageMenuApi/dataTableItemSave',
      method: 'post',
      data: { ...dataTableItemFormData, pid: dataTableId },
    });
  },
  /**
   * 删除
   *
   * @param {*} record
   * @return {*} 
   */
  dataTableItemDelete(record) {
    return request({
      url: '/pageMenuApi/dataTableItemDelete',
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
  findDataTableItemById(id) {
    return request({
      url: '/pageMenuApi/findDataTableItemById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  // <=============================自定义请求 end   =============================>
};