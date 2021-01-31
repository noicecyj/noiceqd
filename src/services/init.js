import { request } from 'ice';

export default {
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
  /**
   * 初始化
   *
   * @param {*} dataSource
   * @param {*} dataTableItemList
   * @param {*} dataFormItemList
   * @return {*} 
   */
  transformData(dataSource, dataTableItemList, dataFormItemList) {
    return request({
      url: '/pageMenuApi/transformData',
      method: 'post',
      data: {
        dataSource,
        dataTableItemList,
        dataFormItemList,
      },
    });
  },
};
