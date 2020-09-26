import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Input, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/Api';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function ApiPage() {
  const [apiState, apiDispatchers] = pageStore.useModel('api');
  const dispatchers = pageStore.useModelDispatchers('api');
  const apiTableData = JSON.parse(JSON.stringify(apiState.apiTableData));

  useEffect(() => {
    apiDispatchers.apiPage(1);
  }, [apiDispatchers]);

  const ApiPageRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => apiDispatchers.apiEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => apiDispatchers.apiDelete({
        record,
        apiCurrent: apiState.apiCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => apiDispatchers.apiEdit()}> 添加菜单 </Button>
            <Dialog title="菜单" visible={apiState.apiVisible}
              onOk={() => apiDispatchers.saveapi({
                apiFormData: apiState.apiFormData,
              })}
              onCancel={() => dispatchers.setState({ apiVisible: false })}
              onClose={() => dispatchers.setState({ apiVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...apiState.formItemLayout}
                value={apiState.apiFormData}
                onChange={value => dispatchers.setState({ apiFormData: value })}>
                  11111111111111111111111
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={apiState.apiLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={apiTableData} isTree primaryKey="id">
              <Table.Column title="操作" lock="right" width="160px" cell={ApiPageRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{apiState.apiTotal}</span> 条 </div>
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default ApiPage;
