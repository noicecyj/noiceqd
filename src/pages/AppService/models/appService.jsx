import { Message } from '@alifd/next';
import appServiceService from '../services/appService';


export default {

  namespace: 'appService',

  state: {
    appServiceTableData: [],
    appServiceVisible: false,
    appServiceFormData: {},
    appServiceLoadingVisible: true,
    appServiceTotal: 0,
    appServiceCurrent: 1,
    appServiceForm: [],
    appServiceTable: [],
    // <=============================自定义状态 start =============================>

    // <=============================自定义状态 end   =============================>
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
    appServicePage(data) {
      appServiceService.appServicePage(data).then(res => {
        const payload = {
          appServiceTotal: res.data.totalElements,
          appServiceTableData: res.data.content,
          appServiceCurrent: data,
          appServiceLoadingVisible: false,
        };
        dispatch.appService.setState(payload);
      });
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    appServiceEdit(data) {
      if (data) {
        const fromData = {
          ...data,
        };
        const payload = {
          appServiceFormData: fromData,
          appServiceVisible: true,
        };
        dispatch.appService.setState(payload);
      } else {
        const payload = {
          appServiceFormData: {},
          appServiceVisible: true,
        };
        dispatch.appService.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    appServiceDelete(data) {
      appServiceService.appServiceDelete(data.record).then(() => {
        appServiceService.appServicePage(data.appServiceCurrent).then(res => {
          const payload = {
            appServiceTotal: res.data.totalElements,
            appServiceTableData: res.data.content,
            appServiceCurrent: data.appServiceCurrent,
          };
          dispatch.appService.setState(payload);
        });
      });
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    appServiceSave(data) {
      appServiceService.appServiceSave(data.appServiceFormData).then(() => {
        appServiceService.appServicePage(data.appServiceCurrent).then(res => {
          const payload = {
            appServiceTotal: res.data.totalElements,
            appServiceTableData: res.data.content,
            appServiceCurrent: data.appServiceCurrent,
          };
          dispatch.appService.setState(payload);
        });
      });
      const payload = { appServiceVisible: false };
      dispatch.appService.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      appServiceService.findCatalogByValue(data).then(res => {
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
        dispatch.appService.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        appServiceFormData: data,
      };
      dispatch.appService.setState(payload);
    },
    /**
     * 获取表单
     *
     * @param {*} data
     */
    async findDataFormByName(data) {
      const dataFormRes = await appServiceService.findDataFormByName(data);
      const payload = {
        appServiceForm: dataFormRes.data,
      };
      dispatch.appService.setState(payload);
    },
    /**
     * 获取表格
     *
     * @param {*} data
     */
    async findDataTableByName(data) {
      const dataTableRes = await appServiceService.findDataTableByName(data);
      const payload = {
        appServiceTable: dataTableRes.data,
      };
      dispatch.appService.setState(payload);
    },
    // <=============================可选方法 start =============================>
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>
    createAppFile(data) {
      appServiceService.createAppFile(data).then(res => {
        if (res.code === 200) {
          Message.success('生成成功');
        } else {
          Message.error('生成失败');
        }
      });
    },
    // <=============================自定义方法 end   =============================>
  }),
};