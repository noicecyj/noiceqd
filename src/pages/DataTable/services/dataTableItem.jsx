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
        pageSize: 5,
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
