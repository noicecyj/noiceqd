import { request } from 'ice';

export default {
  /**
   * 数据
   *
   * @param {*} id
   * @param {*} value
   * @return {*} 
   */
  dataItemPage(id, value) {
    return request({
      url: '/pageMenuApi/dataItemPage',
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
   * 保存
   *
   * @param {*} dataItemFormData
   * @param {*} dataFormId
   * @return {*} 
   */
  dataItemSave(dataItemFormData, dataFormId) {
    return request({
      url: '/pageMenuApi/dataItemSave',
      method: 'post',
      data: { ...dataItemFormData, pid: dataFormId },
    });
  },
  /**
   * 删除
   *
   * @param {*} record
   * @return {*} 
   */
  dataItemDelete(record) {
    return request({
      url: '/pageMenuApi/dataItemDelete',
      method: 'post',
      params: {
        id: record.id,
      },
    });
  },
  /**
   * 获取字典
   *
   * @param {*} value
   * @return {*} 
   */
  findCatalogByValue(value) {
    return request({
      url: '/dictionaryApi/findCatalogByValue',
      method: 'post',
      params: {
        value,
      },
    });
  },
  // <=============================自定义请求 start =============================>

  // <=============================自定义请求 end   =============================>
};