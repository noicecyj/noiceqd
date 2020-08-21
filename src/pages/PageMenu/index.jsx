import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Input, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/PageMenu';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function MenuPage() {

  const [pagemenuState, pagemenuDispatchers] = pageStore.useModel('pagemenu');
  const dispatchers = pageStore.useModelDispatchers('pagemenu');
  const pagemenuTableData = JSON.parse(JSON.stringify(pagemenuState.pagemenuTableData));

  useEffect(() => {
    pagemenuDispatchers.PageMenuPage();
  }, [pagemenuDispatchers]);

  const menuPageRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => pagemenuDispatchers.editPageMenu(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => pagemenuDispatchers.deletePageMenu(record)} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => pagemenuDispatchers.editPageMenu()}> 添加菜单 </Button>
            <Button type="primary" onClick={() => pagemenuDispatchers.createRouteFile()}> 生成路由文件 </Button>
            <Dialog title="菜单" visible={pagemenuState.pagemenuVisible}
              onOk={() => pagemenuDispatchers.savePageMenu({
                pagemenuFormData: pagemenuState.pagemenuFormData
              })}
              onCancel={() => dispatchers.setState({ pagemenuVisible: false })}
              onClose={() => dispatchers.setState({ pagemenuVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...pagemenuState.formItemLayout}
                value={pagemenuState.pagemenuFormData}
                onChange={value => dispatchers.setState({ pagemenuFormData: value })}>
                <FormItem label="菜单代号:" required requiredMessage="请输入菜单代号">
                  <Input id="id" name="id" placeholder="请输入菜单代号" />
                </FormItem>
                <FormItem label="上级菜单代号:" required requiredMessage="请输入上级菜单代号">
                  <Input id="pid" name="pid" placeholder="请输入上级菜单代号" />
                </FormItem>
                <FormItem label="菜单名称:" required requiredMessage="请输入菜单名称" >
                  <Input id="name" name="name" placeholder="请输入菜单名称" />
                </FormItem>
                <FormItem label="菜单路径:" required requiredMessage="请输入菜单路径">
                  <Input id="path" name="path" placeholder="请输入菜单路径" />
                </FormItem>
                <FormItem label="组件名称:" requiredMessage="请输入组件名称">
                  <Input id="componentName" name="componentName" placeholder="请输入组件名称" />
                </FormItem>
                <FormItem label="接口路径:" requiredMessage="请输入接口路径">
                  <Input id="apiPath" name="apiPath" placeholder="请输入接口路径" />
                </FormItem>
                <FormItem label="排序代码:" required requiredMessage="请输入排序代码">
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
                <FormItem label="菜单图标:">
                  <Input id="icon" name="icon" placeholder="请输入菜单图标" />
                </FormItem>
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={pagemenuState.pagemenuLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={pagemenuTableData} isTree primaryKey="id">
              <Table.Column title="菜单代号" dataIndex="id" width="150px" />
              <Table.Column title="上级菜单代号" dataIndex="pid" width="150px" />
              <Table.Column title="菜单名称" dataIndex="name" />
              <Table.Column title="菜单路径" dataIndex="path" />
              <Table.Column title="组件名称" dataIndex="componentName" />
              <Table.Column title="接口路径" dataIndex="apiPath" />
              <Table.Column title="菜单图标" dataIndex="icon" />
              <Table.Column title="排序代码" dataIndex="sortCode" width="100px" />
              <Table.Column title="操作" lock="right" width="160px" cell={menuPageRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{pagemenuState.pagemenuTotal}</span> 条 </div>
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  )
}

export default MenuPage;