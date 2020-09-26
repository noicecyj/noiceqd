import dictionaryService from '../services/dictionary';

export default {

  namespace: 'dictionary',

  state: {
    catalogTableData: [],
    catalogVisible: false,
    catalogFormData: {},
    catalogTotal: 0,
    catalogCurrent: 1,
    catalogLoadingVisible: true,
    dictionaryTableData: [],
    dictionaryVisible: false,
    dictionaryFormData: {},
    dictionaryTotal: 0,
    dictionaryCurrent: 1,
    dictionaryLoadingVisible: true,
    divVisible: true,
    dictionaryId: '',
    formItemLayout: {
      labelCol: {
        fixedSpan: 5,
      },
      wrapperCol: {
        span: 40,
      },
    },
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    catalogPageInfo(data) {
      dictionaryService.catalogPage(data).then(res => {
        if (data === 1) {
          const payload = {
            catalogTotal: res.data.totalElements,
            catalogTableData: res.data.content,
            catalogLoadingVisible: false,
          };
          dispatch.dictionary.setState(payload);
        } else {
          const payload = {
            catalogTotal: res.data.totalElements,
            catalogTableData: res.data.content,
            catalogLoadingVisible: false,
            divVisible: true,
          };
          dispatch.dictionary.setState(payload);
        }
      });
    },
    editCatalog(data) {
      if (data) {
        const payload = {
          catalogFormData: data,
          catalogVisible: true,
        };
        dispatch.dictionary.setState(payload);
      } else {
        const payload = {
          catalogFormData: {},
          catalogVisible: true,
        };
        dispatch.dictionary.setState(payload);
      }
    },
    deleteCatalog(data) {
      dictionaryService.catalogDelete(data.record).then(() => {
        dictionaryService.catalogPage(data.catalogCurrent).then(res => {
          const payload = {
            catalogTotal: res.data.totalElements,
            catalogTableData: res.data.content,
            catalogCurrent: data.catalogCurrent,
            divVisible: true,
          };
          dispatch.dictionary.setState(payload);
        });
      });
    },
    saveCatalog(data) {
      dictionaryService.saveCatalog(data.catalogFormData).then(() => {
        dictionaryService.catalogPage(data.catalogCurrent).then(res => {
          const payload = {
            catalogTotal: res.data.totalElements,
            catalogTableData: res.data.content,
            catalogCurrent: data.catalogCurrent,
            divVisible: true,
          };
          dispatch.dictionary.setState(payload);
        });
      });
      const payload = { catalogVisible: false };
      dispatch.dictionary.setState(payload);
    },
    searchCatalog(data) {
      dictionaryService.searchCatalog(data).then(res => {
        const payload = {
          catalogTotal: res.data.totalElements,
          catalogTableData: res.data.content,
        };
        dispatch.dictionary.setState(payload);
      });
    },
    dictionaryPageInfo(data) {
      dictionaryService.getDictionaryByPage(data.id, data.current).then(res => {
        const payload = {
          dictionaryTotal: res.data.totalElements,
          dictionaryTableData: res.data.content,
          dictionaryLoadingVisible: false,
        };
        dispatch.dictionary.setState(payload);
      });
    },
    editDictionary(data) {
      if (data) {
        const payload = { dictionaryFormData: data, dictionaryVisible: true };
        dispatch.dictionary.setState(payload);
      } else {
        const payload = { dictionaryFormData: {}, dictionaryVisible: true };
        dispatch.dictionary.setState(payload);
      }
    },
    deleteDictionary(data) {
      dictionaryService.deleteDictionary(data.record).then(() => {
        dictionaryService.getDictionaryByPage(data.record.id, data.dictionaryCurrent).then(res => {
          const payload = {
            dictionaryTotal: res.data.totalElements,
            dictionaryTableData: res.data.content,
            dictionaryCurrent: data.dictionaryCurrent,
          };
          dispatch.dictionary.setState(payload);
        });
      });
    },
    saveDictionary(data) {
      dictionaryService.saveDictionary(data.dictionaryFormData, data.dictionaryId).then(() => {
        dictionaryService.getDictionaryByPage(data.dictionaryId, data.dictionaryCurrent).then(res => {
          const payload = {
            dictionaryTotal: res.data.totalElements,
            dictionaryTableData: res.data.content,
            dictionaryCurrent: data.dictionaryCurrent,
          };
          dispatch.dictionary.setState(payload);
        });
      });
      const payload = { dictionaryVisible: false };
      dispatch.dictionary.setState(payload);
    },
    onRowClick(data) {
      dictionaryService.getDictionaryByPage(data.record.id, 1).then(res => {
        const payload = {
          divVisible: !data.selected,
          dictionaryTotal: res.data.totalElements,
          dictionaryTableData: res.data.content,
          dictionaryCurrent: 1,
        };
        dispatch.dictionary.setState(payload);
      });
      const payload = {
        dictionaryId: data.record.id,
        dictionaryLoadingVisible: false,
      };
      dispatch.dictionary.setState(payload);
    },
  }),
};
