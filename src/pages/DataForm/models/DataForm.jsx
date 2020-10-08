import dataFormService from '../services/DataForm';

export default {

  namespace: 'dataForm',

  state: {
    dataFormTableData: [],
    dataFormVisible: false,
    dataFormFormData: {},
    dataFormLoadingVisible: true,
    dataFormTotal: 0,
    dataFormCurrent: 1,
    dataItemTableData: [],
    dataItemVisible: false,
    dataItemFormData: {},
    dataItemLoadingVisible: true,
    dataItemTotal: 0,
    dataItemCurrent: 1,
    dataItemDivVisible: true,
    dataFormId: '',
    formItemLayout: {
      labelCol: {
        fixedSpan: 6,
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
    dataFormPage(data) {
      dataFormService.dataFormPage(data).then(res => {
        const payload = {
          dataFormTotal: res.data.totalElements,
          dataFormTableData: res.data.content,
          dataFormCurrent: data,
          dataFormLoadingVisible: false,
        };
        dispatch.DataForm.setState(payload);
        if (data !== 1) {
          const payload2 = {
            dataItemDivVisible: true,
          };
          dispatch.DataForm.setState(payload2);
        }
      });
    },
    dataFormEdit(data) {
      if (data) {
        const payload = {
          dataFormFormData: data,
          dataFormVisible: true,
        };
        dispatch.DataForm.setState(payload);
      } else {
        const payload = {
          dataFormFormData: {},
          dataFormVisible: true,
        };
        dispatch.DataForm.setState(payload);
      }
    },
    dataFormDelete(data) {
      dataFormService.dataFormDelete(data.record).then(() => {
        dataFormService.dataFormPage(data.dataFormCurrent).then(res => {
          const payload = {
            dataFormTotal: res.data.totalElements,
            dataFormTableData: res.data.content,
            dataFormCurrent: data.dataFormCurrent,
            dataItemDivVisible: true,
          };
          dispatch.DataForm.setState(payload);
        });
      });
    },
    dataFormSave(data) {
      dataFormService.dataFormSave(data.dataFormFormData).then(() => {
        dataFormService.dataFormPage(data.dataFormCurrent).then(res => {
          const payload = {
            dataFormTotal: res.data.totalElements,
            dataFormTableData: res.data.content,
            dataFormCurrent: data.dataFormCurrent,
            dataItemDivVisible: true,
          };
          dispatch.DataForm.setState(payload);
        });
      });
      const payload = { dataFormVisible: false };
      dispatch.DataForm.setState(payload);
    },
    dataItemPage(data) {
      dataFormService.dataItemPage(data.id, data.current).then(res => {
        const payload = {
          dataItemTotal: res.data.totalElements,
          dataItemTableData: res.data.content,
          dataItemCurrent: data,
          dataItemLoadingVisible: false,
        };
        dispatch.DataForm.setState(payload);
      });
    },
    dataItemEdit(data) {
      if (data) {
        const payload = {
          dataItemFormData: data,
          dataItemVisible: true,
        };
        dispatch.DataForm.setState(payload);
      } else {
        const payload = {
          dataItemFormData: {},
          dataItemVisible: true,
        };
        dispatch.DataForm.setState(payload);
      }
    },
    dataItemSave(data) {
      dataFormService.dataItemSave(data.dataItemFormData, data.dataItemId).then(() => {
        dataFormService.dataItemPage(data.dataItemId, data.dataItemCurrent).then(res => {
          const payload = {
            dataItemTotal: res.data.totalElements,
            dataItemTableData: res.data.content,
            dataItemCurrent: data.dataItemCurrent,
          };
          dispatch.DataForm.setState(payload);
        });
      });
      const payload = { dataItemVisible: false };
      dispatch.DataForm.setState(payload);
    },
    dataItemOnRowClick(data) {
      dataFormService.dataItemPage(data.record.id, 1).then(res => {
        const payload = {
          dataItemTotal: res.data.totalElements,
          dataItemTableData: res.data.content,
          dataItemCurrent: 1,
          dataItemDivVisible: !data.selected,
        };
        dispatch.DataForm.setState(payload);
      });
      const payload = {
        dataFormId: data.record.id,
      };
      dispatch.DataForm.setState(payload);
    },
  }),
};