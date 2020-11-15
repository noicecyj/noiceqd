import { Message } from '@alifd/next';
import entityNameService from '../services/entityName';

export default {

  namespace: 'entityName',

  state: {
    entityNameTableData: [],
    entityNameVisible: false,
    entityNameFormData: {},
    entityNameTotal: 0,
    entityNameCurrent: 1,
    entityNameLoadingVisible: true,
    formItemLayout: {
      labelCol: {
        fixedSpan: 5,
      },
      wrapperCol: {
        span: 40,
      },
    },
    // <=============================自定义状态 start =============================>
    ENTITY_TYPE: [],
    DATA_TYPE: [],
    SELECT_ENTITY: [],
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
          relEntity: data.relEntity === null ? null : data.relEntity.match(reg)[0].replace(reg, '$1').split(', ')
        }
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
    // <=============================自定义方法 start =============================>
    selectEntityFindAll(data) {
      entityNameService.selectEntityFindAll().then(res => {
        const formArr = [];
        res.data.forEach(item => {
          formArr.push({
            label: item.name,
            value: item.id,
          });
        });
        const payload = JSON.parse(JSON.stringify({
          datas: formArr,
        }).replace(/datas/g, data));
        dispatch.entityName.setState(payload);
      });
    },
    createEntityFile(data) {
      entityNameService.createEntityFile(data).then(res => {
        if (res.code === 200) {
          Message.success('生成成功');
        } else {
          Message.error('生成失败');
        }
      });
    },
    createComponentFile(data) {
      entityNameService.createComponentFile(data).then(res => {
        if (res.code === 200) {
          Message.success('生成成功');
        } else {
          Message.error('生成失败');
        }
      });
    },
    // <=============================自定义方法 end   =============================>
  })
};
