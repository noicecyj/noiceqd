import { Message } from '@alifd/next';
import entityNameService from '../services/entityName';
import initService from '../../../services/init';

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
    chooseVisible: false,
    chooseFormData: {},
    chooseFountVisible: false,
    chooseFountFormData: {},
    LEVEL_ENTITY_TYPE: [],
    LEVEL_ENTITY_TYPE_FOUNT: [],
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
    async entityNamePage(data) {
      const dataRes = await entityNameService.entityNamePage(data.current);
      const entityName = await initService.transformData(dataRes.data.content, data.entityNameTable);
      const payload = {
        entityNameTotal: dataRes.data.totalElements,
        entityNameTableData: entityName.data.objectList,
        entityNameCurrent: data.current,
        entityNameLoadingVisible: false,
      };
      dispatch.entityName.setState(payload);
    },
    /**
     * 编辑
     *
     * @param {*} data
     */
    async entityNameEdit(data) {
      const entityName = await entityNameService.findEntityNameById(data.id);
      if (data) {
        const reg = /\[(.+?)\]/g;
        const fromData = {
          ...entityName.data,
          relEntity: entityName.data.relEntity === null ? null : entityName.data.relEntity.match(reg)[0].replace(reg, '$1').split(', '),
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
    async entityNameDelete(data) {
      await entityNameService.entityNameDelete(data.record);
      const dataRes = await entityNameService.entityNamePage(data.entityNameCurrent);
      const entityName = await initService.transformData(dataRes.data.content, data.entityNameTable);
      const payload = {
        entityNameTotal: dataRes.data.totalElements,
        entityNameTableData: entityName.data.objectList,
        entityNameCurrent: data.entityNameCurrent,
      };
      dispatch.entityName.setState(payload);
    },
    /**
     * 保存
     *
     * @param {*} data
     */
    async entityNameSave(data) {
      await entityNameService.entityNameSave(data.entityNameFormData);
      const dataRes = await entityNameService.entityNamePage(data.entityNameCurrent);
      const entityName = await initService.transformData(dataRes.data.content, data.entityNameTable);
      const payload = {
        entityNameTotal: dataRes.data.totalElements,
        entityNameTableData: entityName.data.objectList,
        entityNameCurrent: data.entityNameCurrent,
        entityNameVisible: false,
      };
      dispatch.entityName.setState(payload);
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
     * 获取表格和表格初始化数据
     *
     * @param {*} data
     */
    async findDataTableAndFormByName() {
      const dataRes = await entityNameService.entityNamePage(1);
      const dataTableRes = await initService.findDataTableByName('entityNameTable');
      const dataFormRes = await initService.findDataFormByName('entityNameForm');
      const data = await initService.transformData(dataRes.data.content, dataTableRes.data, dataFormRes.data);
      const payload = {
        entityNameTable: dataTableRes.data,
        entityNameForm: data.data.objectForm,
        entityNameTotal: dataRes.data.totalElements,
        entityNameTableData: data.data.objectList,
        entityNameCurrent: 1,
        entityNameLoadingVisible: false,
      };
      dispatch.entityName.setState(payload);
    },
    // <=============================自定义方法 start =============================>
    createEntityFile(data) {
      entityNameService.createEntityFile(data).then(res => {
        if (res.code === 200) {
          Message.success('生成成功');
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