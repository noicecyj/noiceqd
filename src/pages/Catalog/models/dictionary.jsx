import dictionaryService from '../services/dictionary';
import initService from '../../../services/init';

export default {

  namespace: 'dictionary',

  state: {
    dictionaryTableData: [],
    dictionaryVisible: false,
    dictionaryFormData: {},
    dictionaryLoadingVisible: true,
    dictionaryTotal: 0,
    dictionaryCurrent: 1,
    dictionaryForm: [],
    dictionaryTable: [],
    divVisible: true,
    catalogId: '',
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    /**
     * 数据
     *
     * @param {*} data
     */
    async dictionaryPage(data) {
      const dataRes = await dictionaryService.dictionaryPage(data.catalogId, data.current);
      const dictionary = await initService.transformData(dataRes.data.content, data.dictionaryTable);
      const payload = {
        dictionaryTotal: dataRes.data.totalElements,
        dictionaryTableData: dictionary.data.objectList,
        dictionaryCurrent: data.current,
        dictionaryLoadingVisible: false,
      };
      dispatch.dictionary.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async dictionaryEdit(data) {
      if (data) {
        const dictionary = await dictionaryService.findDictionaryById(data.id);
        const fromData = {
          ...dictionary.data,
        };
        const payload = {
          dictionaryFormData: fromData,
          dictionaryVisible: true,
        };
        dispatch.dictionary.setState(payload);
      } else {
        const payload = {
          dictionaryFormData: {},
          dictionaryVisible: true,
        };
        dispatch.dictionary.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    async dictionaryDelete(data) {
      await dictionaryService.dictionaryDelete(data.record);
      const dataRes = await dictionaryService.dictionaryPage(data.record.id, data.dictionaryCurrent);
      const dictionary = await initService.transformData(dataRes.data.content, data.dictionaryTable);
      const payload = {
        dictionaryTotal: dataRes.data.totalElements,
        dictionaryTableData: dictionary.data.objectList,
        dictionaryCurrent: data.dictionaryCurrent,
      };
      dispatch.dictionary.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async dictionarySave(data) {
      await dictionaryService.dictionarySave(data.catalogId, data.dictionaryFormData);
      const dataRes = await dictionaryService.dictionaryPage(data.catalogId, data.dictionaryCurrent);
      const dictionary = await initService.transformData(dataRes.data.content, data.dictionaryTable);
      const payload = {
        dictionaryTotal: dataRes.data.totalElements,
        dictionaryTableData: dictionary.data.objectList,
        dictionaryCurrent: data.dictionaryCurrent,
        dictionaryVisible: false,
      };
      dispatch.dictionary.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      initService.findCatalogByValue(data).then(res => {
        const formArr = [];
        res.forEach(item => {
          formArr.push({
            label: item.dictionaryName,
            value: item.dictionaryValue,
          });
        });
        const payload = JSON.parse(JSON.stringify({
          data: formArr,
        }).replace(/data/g, data));
        dispatch.dictionary.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        dictionaryFormData: data,
      };
      dispatch.dictionary.setState(payload);
    },
    /**
     * 点击行
     *
     * @param {*} data
     */
    async onRowClick(value) {
      const dataRes = await dictionaryService.dictionaryPage(value.record.id, 1);
      const dataTableRes = await initService.findDataTableByName('dictionaryTable');
      const dataFormRes = await initService.findDataFormByName('dictionaryForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        divVisible: !value.selected,
        dictionaryTable: dataTableRes.data,
        dictionaryForm: data.data.objectForm,
        dictionaryTotal: dataRes.data.totalElements,
        dictionaryTableData: data.data.objectList,
        dictionaryCurrent: 1,
        catalogId: value.record.id,
        dictionaryLoadingVisible: false,
      };
      dispatch.dictionary.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    // <=============================自定义方法 end   =============================>
  }),
};