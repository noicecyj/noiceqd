import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Input, Loading, Drawer, Pagination } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/Log';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function MenuPage() {

  const [logState, logDispatchers] = pageStore.useModel('log');
  const dispatchers = pageStore.useModelDispatchers('log');
  const logTableData = JSON.parse(JSON.stringify(logState.logTableData));

  useEffect(() => {
    logDispatchers.LogPage(1);
  }, [logDispatchers]);

  const logRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => logDispatchers.editLog(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => logDispatchers.deleteLog({
        record,
        logCurrent: logState.logCurrent
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => logDispatchers.editLog()}> 添加服务 </Button>
            <Dialog title="服务" visible={logState.logVisible}
              onOk={() => logDispatchers.logSave({
                logFormData: logState.logFormData,
                logCurrent: logState.logCurrent
              })}
              onCancel={() => dispatchers.setState({ logVisible: false })}
              onClose={() => dispatchers.setState({ logVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...logState.formItemLayout}
                value={logState.logFormData}
                onChange={value => dispatchers.setState({ logFormData: value })}>
                <FormItem label="服务名称:" required requiredMessage="请输入服务名称">
                  <Input id="serverName" name="serverName" placeholder="请输入服务名称" />
                </FormItem>
                <FormItem label="服务端口:" required requiredMessage="请输入服务端口">
                  <Input id="serverPort" name="serverPort" placeholder="请输入服务端口" />
                </FormItem>
                <FormItem label="服务描述:" required requiredMessage="请输入服务描述" >
                  <Input.TextArea id="description" name="description" placeholder="请输入服务描述" />
                </FormItem>
                <FormItem label="排序代码:" required requiredMessage="请输入排序代码">
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={logState.logLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={logTableData}
              rowSelection={{
                mode: 'single',
                onSelect: (selected, record) => {
                  logDispatchers.findLogsByPort({ selected, record });
                }
              }}>
              <Table.Column title="服务名称" dataIndex="serverName" width="200px" />
              <Table.Column title="服务端口" dataIndex="serverPort" width="200px" />
              <Table.Column title="服务描述" dataIndex="description" />
              <Table.Column title="排序代码" dataIndex="sortCode" width="100px" />
              <Table.Column title="操作" lock="right" width="160px" cell={logRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{logState.logTotal}</span> 条 </div>
              <Pagination onChange={current => logDispatchers.LogPage(current)}
                type="simple" pageSize={13} total={logState.logTotal} />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Drawer title="日志" placement="right" width="100%"
        visible={logState.drawerVisible}
        onClose={() => dispatchers.setState({ drawerVisible: false })}
        onBlur={() => dispatchers.setState({ drawerVisible: false })}>
        <div className={styles.Main} style={{ whiteSpace: 'pre-wrap' }}>
          <div className={styles.add}>
            <Button type="primary" > 刷新 </Button>
            <Button type="primary" onClick={() => logDispatchers.deleteLogsByPort(logState.logPort)} warning> 删除日志 </Button>
          </div>
          {logState.logText}
        </div>
      </Drawer>
    </ResponsiveGrid>
  )
}

export default MenuPage;