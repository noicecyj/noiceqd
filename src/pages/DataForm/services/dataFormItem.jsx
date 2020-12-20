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
        pageSize: 5,
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
  dataFormItemSave(dataFormItemFormData, dataFormId) {
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
  /**
   * 获取表单
   *
   * @param {*} name
   * @return {*} 
   */
  findDataFormByName(name) {
    return request({
      url: '/pageMenuApi/findDataFormByName',
      method: 'post',
      params: {
        name,
      },
    });
  },
  /**
   * 获取表格
   *
   * @param {*} name
   * @return {*} 
   */
  findDataTableByName(name) {
    return request({
      url: '/pageMenuApi/findDataTableByName',
      method: 'post',
      params: {
        name,
      },
    });
  },
  // <=============================自定义请求 start =============================>

  // <=============================自定义请求 end   =============================>
};