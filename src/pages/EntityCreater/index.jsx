import { ResponsiveGrid, Button, Table, Form, Input, Radio, Transfer, Drawer } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/EntityCreater';
import MonacoEditor from 'react-monaco-editor';
import EditablePane from './components/EditablePane'
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function EntityCreaterPage() {

  const [entitycreaterState, entitycreaterDispatchers] = pageStore.useModel('entitycreater');
  const dispatchers = pageStore.useModelDispatchers('entitycreater');

  useEffect(() => {
    entitycreaterDispatchers.findCatalogByValue('ENTITY_TYPE');
    entitycreaterDispatchers.findCatalogByValue('YES_NO');
    entitycreaterDispatchers.findCatalogByValue('OVERRIDE_METHOD');
    entitycreaterDispatchers.findCatalogByValue('DATA_TYPE');
  }, [entitycreaterDispatchers]);

  const entityNameCell = (value, index, record) => {
    return <EditablePane defaultTitle={value} type='input'
      data={entitycreaterState} setEntityData={(entityName, type) => entitycreaterDispatchers.setEntityData({
        index, record, entityName, type, entityData: entitycreaterState.entityData
      })} />;
  }

  const entityPropertyCell = (value, index, record) => {
    return <EditablePane defaultTitle={value} type='select'
      data={entitycreaterState} setEntityData={(entityProperty, type) => entitycreaterDispatchers.setEntityData({
        index, record, entityProperty, type, entityData: entitycreaterState.entityData
      })} />;
  }

  const operateRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.upEntityData({
        entityData: entitycreaterState.entityData, index
      })}> 上移 </Button>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.downEntityData({
        entityData: entitycreaterState.entityData, index
      })}> 下移 </Button>
      <Button type="primary" size="small" onClick={() => entitycreaterDispatchers.deleteEntityData({
        entityData: entitycreaterState.entityData,
        index: record.id
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={6} >
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => entitycreaterDispatchers.addEntityData({
              entityData: entitycreaterState.entityData,
              index: entitycreaterState.index
            })}> 添加属性 </Button>
            <Button onClick={() => dispatchers.setState({ entityData: [] })}> 重置属性 </Button>
          </div>
          <Table hasBorder className={styles.Table} primaryKey='id'
            dataSource={entitycreaterState.entityData} rowSelection={{
              mode: 'single',
              onChange: (selected, record) => {
                dispatchers.setState({ primaryKey: record[0].id })
              }
            }}>
            <Table.Column title="序号" dataIndex="id" key={1} width="65px" />
            <Table.Column title="属性名" dataIndex="entityName" key={2} cell={entityNameCell} />
            <Table.Column title="数据类型" dataIndex="entityProperty" key={3} cell={entityPropertyCell} />
            <Table.Column title="操作" lock="right" width="222px" cell={operateRender} />
          </Table>
        </div>
      </Cell>
      <Cell colSpan={6} >
        <div className={styles.Main}>
          <Form style={{ width: '100%' }} {...entitycreaterState.formItemLayout}
            value={entitycreaterState.catalogFormData}
            onChange={value => dispatchers.setState({ entityFormData: value })}>
            <FormItem>
              <Form.Submit validate type="primary" onClick={(value, errors) => entitycreaterDispatchers.createEntity({
                entityData: entitycreaterState.entityData, primaryKey: entitycreaterState.primaryKey, ...value, errors
              })} htmlType="submit" style={{ margin: '0 10px' }}> 生成实体类代码 </Form.Submit>
              <Form.Reset > 重置表单 </Form.Reset>
              <Form.Submit validate type="primary" onClick={(value, errors) => entitycreaterDispatchers.createEntityFile({
                entityData: entitycreaterState.entityData, primaryKey: entitycreaterState.primaryKey, ...value, errors
              })} htmlType="submit" style={{ margin: '0 10px' }}> 下载到指定路径 </Form.Submit>
            </FormItem>
            <FormItem label="实体类名称：" required requiredMessage="请输入实体类名称">
              <Input id="name" name="name" />
            </FormItem>
            <FormItem label="实体对象类型：" required requiredMessage="请选择实体对象类型">
              <RadioGroup dataSource={entitycreaterState.ENTITY_TYPE} name="type" />
            </FormItem>
            <FormItem label="是否使用lombok：" required requiredMessage="请选择是否使用lombok">
              <RadioGroup dataSource={entitycreaterState.YES_NO} name="lombok" />
            </FormItem>
            <FormItem label="重写方法：">
              <Transfer mode="simple" dataSource={entitycreaterState.OVERRIDE_METHOD}
                titles={['可重写方法', '需重写方法']} name="method" />
            </FormItem>
            <FormItem label="项目生成路径:">
              <Input id="path" name="path" />
            </FormItem>
          </Form>
        </div>
      </Cell>
      <Drawer title="实体类代码" placement="right" width="800px"
        visible={entitycreaterState.drawerVisible}
        onClose={() => dispatchers.setState({ drawerVisible: false })}
        onBlur={() => dispatchers.setState({ drawerVisible: false })}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => entitycreaterDispatchers.download({
              code: entitycreaterState.code,
              entityName: entitycreaterState.entityName
            })}> 下载文件 </Button>
          </div>
          <MonacoEditor width="755" height="755" language="java" theme="vs-dark" value={entitycreaterState.code} />
        </div>
      </Drawer>
    </ResponsiveGrid >
  )
}

export default EntityCreaterPage;