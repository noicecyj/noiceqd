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
    console.log(name);
    return request({
      url: '/pageMenuApi/findDataFormByName',
      method: 'post',
      params: {
        name,
      },
    });
  },
  /**
   * 获取表单
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
