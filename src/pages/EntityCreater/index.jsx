import { ResponsiveGrid, Button, Table, Pagination, Box, Radio, Dialog, Form, Input, Loading, Select, Checkbox } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/EntityCreater';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Group: CheckboxGroup } = Checkbox;

function EntityCreaterPage() {
  const [entityNameState, entityNameDispatchers] = pageStore.useModel('entityName');
  const entityName = pageStore.useModelDispatchers('entityName');

  const [entityState, entityDispatchers] = pageStore.useModel('entity');
  const entity = pageStore.useModelDispatchers('entity');

  useEffect(() => {
    // <=============================自定义初始化数据 start =============================>
    entityNameDispatchers.findCatalogByValue('ENTITY_TYPE');
    entityNameDispatchers.findCatalogByValue('DATA_TYPE');
    entityNameDispatchers.findCatalogByValue('LEVEL_ENTITY_TYPE');
    entityNameDispatchers.findCatalogByValue('LEVEL_ENTITY_TYPE_FOUNT');
    entityNameDispatchers.selectEntityFindAll('SELECT_ENTITY');
    // <=============================自定义初始化数据 end   =============================>
    entityNameDispatchers.entityNamePage(1);
  }, [entityNameDispatchers]);

  const entityNameRender = (value, index, record) => {
    return <div className={ styles.opt }>
      {/* <=============================自定义组件 start =============================> */ }
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.chooseEntityFile(record) }> 生成后端代码 </Button>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.chooseFountEntityFile(record) }> 生成前端代码 </Button>
      {/* <=============================自定义组件 end   =============================> */ }
      {/* <=============================可选组件 start =============================> */ }

      {/* <=============================可选组件 end   =============================> */ }
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.entityNameEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.entityNameDelete({
        record,
        entityNameCurrent: entityNameState.entityNameCurrent,
      }) } warning> 删除 </Button>
    </div >;
  };

  const entityRender = (value, index, record) => {
    return <div className={ styles.opt }>
      {/* <=============================自定义组件 start =============================> */ }

      {/* <=============================自定义组件 end   =============================> */ }
      {/* <=============================可选组件 start =============================> */ }
      <Button type="primary" size="small" onClick={ () => entityDispatchers.upEntity({ record, entityCurrent: entityState.entityCurrent }) }> 上移 </Button>
      <Button type="primary" size="small" onClick={ () => entityDispatchers.downEntity({ record, entityCurrent: entityState.entityCurrent }) }> 下移 </Button>
      {/* <=============================可选组件 end   =============================> */ }
      <Button type="primary" size="small" onClick={ () => entityDispatchers.entityEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => entityDispatchers.entityDelete({
        record,
        entityCurrent: entityState.entityCurrent,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => entityNameDispatchers.entityNameEdit() }> 添加实体 </Button>
            <Dialog title="实体" visible={ entityNameState.entityNameVisible }
              onOk={ () => entityNameDispatchers.entityNameSave({
                entityNameFormData: entityNameState.entityNameFormData,
                entityNameCurrent: entityNameState.entityNameCurrent,
              }) }
              onCancel={ () => entityName.setState({ entityNameVisible: false }) }
              onClose={ () => entityName.setState({ entityNameVisible: false }) }
              style={ { width: '30%' } }>
              <Form style={ { width: '100%' } } { ...entityNameState.formItemLayout }
                value={ entityNameState.entityNameFormData }
                onChange={ value => entityName.setState({ entityNameFormData: value }) }>
                {/* <=============================自定义表单 start =============================> */ }
                <FormItem label="实体名称：" required requiredMessage="请输入实体名称">
                  <Input id="name" name="name" placeholder="请输入实体名称" />
                </FormItem>
                <FormItem label="对象类型：" required requiredMessage="请选择对象类型">
                  <RadioGroup dataSource={ entityNameState.ENTITY_TYPE } name="type" id="type" />
                </FormItem>
                <FormItem label="生成路径：" required requiredMessage="请选择生成路径">
                  <Input id="path" name="path" placeholder="请输入生成路径" />
                </FormItem>
                <FormItem label="关联实体：" requiredMessage="请选择关联实体">
                  <Select mode="tag" dataSource={ entityNameState.SELECT_ENTITY } id="relEntity" filterLocal={ false }
                    name="relEntity" style={ { width: 414 } } placeholder="请输入关联实体" />
                </FormItem>
                <FormItem label="接口名称：" required requiredMessage="请选择接口名称">
                  <Input id="api" name="api" placeholder="请输入接口名称" />
                </FormItem>
                <FormItem label="表单模板：">
                  <Input id="formModelCode" name="formModelCode" placeholder="请输入模板代码" />
                </FormItem>
                <FormItem label="表格模板：">
                  <Input id="tableModelCode" name="tableModelCode" placeholder="请输入模板代码" />
                </FormItem>
                <FormItem label="排序代码：" required requiredMessage="请输入排序代码" >
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
                {/* <=============================自定义表单 end   =============================> */ }
              </Form>
            </Dialog>
            <Dialog title="选择生成类" visible={ entityNameState.chooseVisible }
              onOk={ () => entityNameDispatchers.createEntityFile({
                ...entityNameState.chooseFormData,
                ...entityNameState.entityNameFormData,
                entityNameCurrent: entityNameState.entityNameCurrent,
              }) }
              onCancel={ () => entityName.setState({ chooseVisible: false }) }
              onClose={ () => entityName.setState({ chooseVisible: false }) }
              style={ { width: '30%' } }>
              <Form style={ { width: '100%' } } { ...entityNameState.formItemLayout }
                value={ entityNameState.chooseFormData }
                onChange={ value => entityName.setState({ chooseFormData: value }) }>
                {/* <=============================自定义表单 start =============================> */ }
                <FormItem label="选择生成：" required requiredMessage="请选择生成类" >
                  <CheckboxGroup dataSource={ entityNameState.LEVEL_ENTITY_TYPE } itemDirection="ver" id="choose" name="choose" />
                </FormItem>
                {/* <=============================自定义表单 end   =============================> */ }
              </Form>
            </Dialog>
            <Dialog title="选择生成类" visible={ entityNameState.chooseFountVisible }
              onOk={ () => entityNameDispatchers.createComponentFile({
                ...entityNameState.chooseFountFormData,
                ...entityNameState.entityNameFormData,
                entityNameCurrent: entityNameState.entityNameCurrent,
              }) }
              onCancel={ () => entityName.setState({ chooseFountVisible: false }) }
              onClose={ () => entityName.setState({ chooseFountVisible: false }) }
              style={ { width: '30%' } }>
              <Form style={ { width: '100%' } } { ...entityNameState.formItemLayout }
                value={ entityNameState.chooseFountFormData }
                onChange={ value => entityName.setState({ chooseFountFormData: value }) }>
                {/* <=============================自定义表单 start =============================> */ }
                <FormItem label="选择生成：" required requiredMessage="请选择生成类" >
                  <CheckboxGroup dataSource={ entityNameState.LEVEL_ENTITY_TYPE_FOUNT } itemDirection="ver" id="choose" name="choose" />
                </FormItem>
                {/* <=============================自定义表单 end   =============================> */ }
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ entityNameState.entityNameLoadingVisible }>
            <Table hasBorder className={ styles.Table } dataSource={ entityNameState.entityNameTableData }
              rowSelection={ {
                mode: 'single',
                onSelect: (selected, record) => {
                  entityDispatchers.onRowClick({ selected, record });
                },
              } } >
              {/* <=============================自定义表单 start =============================> */ }
              <Table.Column title="实体名称" dataIndex="name" key={ 1 } width="150px" />
              <Table.Column title="对象类型" dataIndex="type" key={ 2 } width="100px" />
              <Table.Column title="生成路径" dataIndex="path" key={ 3 } />
              <Table.Column title="接口名称" dataIndex="api" key={ 4 } width="150px" />
              <Table.Column title="表单模板" dataIndex="formModelCode" key={ 5 } width="150px" />
              <Table.Column title="表格模板" dataIndex="tableModelCode" key={ 6 } width="150px" />
              <Table.Column title="排序代码" dataIndex="sortCode" key={ 7 } width="100px" />
              <Table.Column title="操作" lock="right" width="381px" cell={ entityNameRender } />
              {/* <=============================自定义表单 end   =============================> */ }
            </Table>
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ entityNameState.entityNameTotal }</span> 条 </div>
              <Pagination onChange={ current => entityNameDispatchers.entityNamePage(current) }
                type="simple" pageSize={ 5 } total={ entityNameState.entityNameTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={ 12 } hidden={ entityState.divVisible }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => entityDispatchers.entityEdit() }> 添加属性 </Button>
            <Dialog title="属性" visible={ entityState.entityVisible }
              onOk={ () => entityDispatchers.entitySave({
                entityFormData: entityState.entityFormData,
                entityCurrent: entityState.entityCurrent,
                entityNameId: entityState.entityNameId,
              }) }
              onCancel={ () => entity.setState({ entityVisible: false }) }
              onClose={ () => entity.setState({ entityVisible: false }) }
              style={ { width: '30%' } }>

              <Form style={ { width: '100%' } } { ...entityNameState.formItemLayout }
                value={ entityState.entityFormData }
                onChange={ value => entity.setState({ entityFormData: value }) }>
                {/* <=============================自定义表单 start =============================> */ }
                <FormItem label="属性名：" required requiredMessage="请输入属性名" >
                  <Input id="entityName" name="entityName" placeholder="请输入属性名" />
                </FormItem>
                <FormItem label="数据类型：" required requiredMessage="请输入数据类型" >
                  <Select dataSource={ entityNameState.DATA_TYPE } id="entityProperty" name="entityProperty" placeholder="请输入数据类型" style={ { width: 433 } } defaultValue="String" />
                </FormItem>
                <FormItem label="排序代码：" required requiredMessage="请输入排序代码" >
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
                {/* <=============================自定义表单 end   =============================> */ }
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ entityState.entityLoadingVisible }>
            <Table hasBorder className={ styles.Table } dataSource={ entityState.entityTableData }>
              {/* <=============================自定义表单 start =============================> */ }
              <Table.Column title="属性名" dataIndex="entityName" key={ 1 } />
              <Table.Column title="数据类型" dataIndex="entityProperty" key={ 2 } />
              <Table.Column title="排序代码" dataIndex="sortCode" key={ 3 } width="100px" />
              <Table.Column title="操作" lock="right" width="285px" cell={ entityRender } />
              {/* <=============================自定义表单 end   =============================> */ }
            </Table>
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ entityState.entityTotal }</span> 条 </div>
              <Pagination onChange={ current => entityDispatchers.entityPage({ id: entityState.entityNameId, current }) }
                type="simple" pageSize={ 5 } total={ entityState.entityTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default EntityCreaterPage;
