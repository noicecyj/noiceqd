import { Message } from '@alifd/next';
import entityNameService from '../services/entityName';

export default {

  namespace: 'entityName',

  state: {
    entityNameTableData: [],
    entityNameVisible: false,
    entityNameFormData: {},
    entityNameLoadingVisible: true,
    entityNameTotal: 0,
    entityNameCurrent: 1,
    entityNameForm: [],
    entityNameTable: [],
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
    entityNamePage(data) {
      entityNameService.entityNamePage(data).then(res => {
        const payload = {
          entityNameTotal: res.data.totalElements,
          entityNameTableData: res.data.content,
          entityNameCurrent: data,
          entityNameLoadingVisible: false,
        };
        dispatch.entityName.setState(payload);
      });
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    entityNameEdit(data) {
      if (data) {
        const reg = /\[(.+?)\]/g;
        const fromData = {
          ...data,
          relEntity: data.relEntity === null ? null : data.relEntity.match(reg)[0].replace(reg, '$1').split(', '),
        };
        const payload = {
          entityNameFormData: fromData,
          entityNameVisible: true,
        };
        dispatch.entityName.setState(payload);
      } else {
        const payload = {
          entityNameFormData: {},
          entityNameVisible: true,
        };
        dispatch.entityName.setState(payload);
      }
    },
    /**
     * 删除
     *
     * @param {*} data
     */
    entityNameDelete(data) {
      entityNameService.entityNameDelete(data.record).then(() => {
        entityNameService.entityNamePage(data.entityNameCurrent).then(res => {
          const payload = {
            entityNameTotal: res.data.totalElements,
            entityNameTableData: res.data.content,
            entityNameCurrent: data.entityNameCurrent,
          };
          dispatch.entityName.setState(payload);
        });
      });
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    entityNameSave(data) {
      entityNameService.entityNameSave(data.entityNameFormData).then(() => {
        entityNameService.entityNamePage(data.entityNameCurrent).then(res => {
          const payload = {
            entityNameTotal: res.data.totalElements,
            entityNameTableData: res.data.content,
            entityNameCurrent: data.entityNameCurrent,
          };
          dispatch.entityName.setState(payload);
        });
      });
      const payload = { entityNameVisible: false };
      dispatch.entityName.setState(payload);
    },
    /**
     * 获取字典
     *
     * @param {*} data
     */
    findCatalogByValue(data) {
      entityNameService.findCatalogByValue(data).then(res => {
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
        dispatch.entityName.setState(payload);
      });
    },
    /**
     * 设置表单数据
     *
     * @param {*} data
     */
    setDataForm(data) {
      const payload = {
        entityNameFormData: data,
      };
      dispatch.entityName.setState(payload);
    },
    /**
     * 获取表单
     *
     * @param {*} data
     */
    async findDataFormByName(data) {
      const dataFormRes = await entityNameService.findDataFormByName(data);
      const payload = {
        entityNameForm: dataFormRes.data,
      };
      dispatch.entityName.setState(payload);
    },
    /**
     * 获取表格
     *
     * @param {*} data
     */
    async findDataTableByName(data) {
      const dataTableRes = await entityNameService.findDataTableByName(data);
      const payload = {
        entityNameTable: dataTableRes.data,
      };
      dispatch.entityName.setState(payload);
    },
    // <=============================可选方法 start =============================>
    // <=============================可选方法 end   =============================>
    // <=============================自定义方法 start =============================>
    createEntityFile(data) {
      entityNameService.createEntityFile(data).then(res => {
        if (res.code === 200) {
          Message.success('生成成功');
          entityNameService.entityNamePage(data.entityNameCurrent).then(resdata => {
            const payload = {
              entityNameTotal: resdata.data.totalElements,
              entityNameTableData: resdata.data.content,
              entityNameCurrent: data.entityNameCurrent,
            };
            dispatch.entityName.setState(payload);
          });
        } else {
          Message.error('生成失败');
        }
      });
      const payload = {
        chooseVisible: false,
        entityNameFormData: {},
      };
      dispatch.entityName.setState(payload);
    },
    createComponentFile(data) {
      entityNameService.createComponentFile(data).then(res => {
        if (res.code === 200) {
          Message.success('生成成功');
          entityNameService.entityNamePage(data.entityNameCurrent).then(resdata => {
            const payload = {
              entityNameTotal: resdata.data.totalElements,
              entityNameTableData: resdata.data.content,
              entityNameCurrent: data.entityNameCurrent,
            };
            dispatch.entityName.setState(payload);
          });
        } else {
          Message.error('生成失败');
        }
      });
    },
    chooseEntityFile(data) {
      const reg = /\[(.+?)\]/g;
      const fromData = {
        ...data,
        relEntity: data.relEntity === null ? null : data.relEntity.match(reg)[0].replace(reg, '$1').split(', '),
      };
      const payload = {
        chooseVisible: true,
        entityNameFormData: fromData,
      };
      dispatch.entityName.setState(payload);
    },
    chooseFountEntityFile(data) {
      const reg = /\[(.+?)\]/g;
      const fromData = {
        ...data,
        relEntity: data.relEntity === null ? null : data.relEntity.match(reg)[0].replace(reg, '$1').split(', '),
      };
      const payload = {
        chooseFountVisible: true,
        entityNameFormData: fromData,
      };
      dispatch.entityName.setState(payload);
    },
    // <=============================自定义方法 end   =============================>
  }),
};