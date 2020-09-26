import { ResponsiveGrid, Button, Table, Pagination, Box, Radio, Dialog, Form, Input, Loading, Select } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/EntityCreater';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function EntityCreaterPage() {
  const [entitycreaterState, entitycreaterDispatchers] = pageStore.useModel('entitycreater');
  const dispatchers = pageStore.useModelDispatchers('entitycreater');

  useEffect(() => {
    entitycreaterDispatchers.findCatalogByValue('ENTITY_TYPE');
    entitycreaterDispatchers.findCatalogByValue('DATA_TYPE');
    entitycreaterDispatchers.entityNamePage(1);
  }, [entitycreaterDispatchers]);

  const entityNameRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.createEntityFile(record)}> 生成代码 </Button>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.entityNameEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.entityNameDelete({
        record,
        entityNameCurrent: entitycreaterState.entityNameCurrent,
      })} warning> 删除 </Button>
    </div >;
  };

  const entityRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.upEntity({ record, entityCurrent: entitycreaterState.entityCurrent })}> 上移 </Button>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.downEntity({ record, entityCurrent: entitycreaterState.entityCurrent })}> 下移 </Button>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.entityEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.entityDelete({
        record,
        entityCurrent: entitycreaterState.entityCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => entitycreaterDispatchers.entityNameEdit()}> 添加实体 </Button>
            <Dialog title="实体" visible={entitycreaterState.entityNameVisible}
              onOk={() => entitycreaterDispatchers.entityNameSave({
                entityNameFormData: entitycreaterState.entityNameFormData,
                entityNameCurrent: entitycreaterState.entityNameCurrent,
              })}
              onCancel={() => dispatchers.setState({ entityNameVisible: false })}
              onClose={() => dispatchers.setState({ entityNameVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...entitycreaterState.formItemLayout}
                value={entitycreaterState.entityNameFormData}
                onChange={value => dispatchers.setState({ entityNameFormData: value })}>
                <FormItem label="实体名称：" required requiredMessage="请输入实体名称">
                  <Input id="name" name="name" placeholder="请输入实体名称" />
                </FormItem>
                <FormItem label="对象类型：" required requiredMessage="请选择对象类型">
                  <RadioGroup dataSource={entitycreaterState.ENTITY_TYPE} name="type" />
                </FormItem>
                <FormItem label="生成路径：" required requiredMessage="请选择生成路径">
                  <Input id="path" name="path" placeholder="请输入生成路径" />
                </FormItem>
                <FormItem label="接口名称：" required requiredMessage="请选择接口名称">
                  <Input id="api" name="api" placeholder="请输入接口名称" />
                </FormItem>
                <FormItem label="排序代码：" required requiredMessage="请输入排序代码" >
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={entitycreaterState.entityNameLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={entitycreaterState.entityNameTableData}
              rowSelection={{
                mode: 'single',
                onSelect: (selected, record) => {
                  entitycreaterDispatchers.onRowClick({ selected, record });
                },
              }} >
              <Table.Column title="实体名称" dataIndex="name" key={1} width="200px" />
              <Table.Column title="对象类型" dataIndex="type" key={2} width="100px" />
              <Table.Column title="生成路径" dataIndex="path" key={3} />
              <Table.Column title="接口名称" dataIndex="api" key={4} width="150px" />
              <Table.Column title="排序代码" dataIndex="sortCode" key={5} width="100px" />
              <Table.Column title="操作" lock="right" width="246px" cell={entityNameRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{entitycreaterState.entityNameTotal}</span> 条 </div>
              <Pagination onChange={current => entitycreaterDispatchers.entityNamePage(current)}
                stype="simple" pageSize={5} total={entitycreaterState.entityNameTotal} />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={12} hidden={entitycreaterState.divVisible}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => entitycreaterDispatchers.entityEdit()}> 添加属性 </Button>
            <Dialog title="属性" visible={entitycreaterState.entityVisible}
              onOk={() => entitycreaterDispatchers.entitySave({
                entityFormData: entitycreaterState.entityFormData,
                entityCurrent: entitycreaterState.entityCurrent,
                entityNameId: entitycreaterState.entityNameId,
              })}
              onCancel={() => dispatchers.setState({ entityVisible: false })}
              onClose={() => dispatchers.setState({ entityVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...entitycreaterState.formItemLayout}
                value={entitycreaterState.entityFormData}
                onChange={value => dispatchers.setState({ entityFormData: value })}>
                <FormItem label="属性名：" required requiredMessage="请输入属性名" >
                  <Input id="entityName" name="entityName" placeholder="请输入属性名" />
                </FormItem>
                <FormItem label="数据类型：" required requiredMessage="请输入数据类型" >
                  {/* <Input id="entityProperty" name="entityProperty" placeholder="请输入数据类型" /> */}
                  <Select dataSource={entitycreaterState.DATA_TYPE} id="entityProperty" name="entityProperty" placeholder="请输入数据类型" style={{ width: 433 }} />
                </FormItem>
                <FormItem label="排序代码：" required requiredMessage="请输入排序代码" >
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={entitycreaterState.entityLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={entitycreaterState.entityTableData}>
              <Table.Column title="属性名" dataIndex="entityName" key={1} />
              <Table.Column title="数据类型" dataIndex="entityProperty" key={2} />
              <Table.Column title="排序代码" dataIndex="sortCode" key={3} width="100px" />
              <Table.Column title="操作" lock="right" width="285px" cell={entityRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{entitycreaterState.entityTotal}</span> 条 </div>
              <Pagination onChange={current => entitycreaterDispatchers.entityPage({ id: entitycreaterState.entityNameId, current })}
                type="simple" pageSize={5} total={entitycreaterState.entityTotal} />
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default EntityCreaterPage;
