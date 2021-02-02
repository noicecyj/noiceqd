import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} id
   * @param {*} value
   * @return {*} 
   */
  dataFormItemPage(id, value) {
    return request({
      url: '/pageMenuApi/dataFormItemPage',
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
   * @param {*} dataFormItemFormData
   * @param {*} dataFormId
   * @return {*} 
   */
  dataFormItemSave(dataFormId, dataFormItemFormData) {
    return request({
      url: '/pageMenuApi/dataFormItemSave',
      method: 'post',
      data: { ...dataFormItemFormData, pid: dataFormId },
    });
  },
  /**
   * 删除
   *
   * @param {*} record
   * @return {*} 
   */
  dataFormItemDelete(record) {
    return request({
      url: '/pageMenuApi/dataFormItemDelete',
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
  findDataFormItemById(id) {
    return request({
      url: '/pageMenuApi/findDataFormItemById',
      method: 'post',
      params: {
        id,
      },
    });
  },
  // <=============================自定义请求 start =============================>
  // <=============================自定义请求 end   =============================>
};