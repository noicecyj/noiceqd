import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Input, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/PageFunction';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function PageFunctionPage() {
  const [pageFunctionState, pageFunctionDispatchers] = pageStore.useModel('pagefunction');
  const dispatchers = pageStore.useModelDispatchers('pagefunction');
  const pageFunctionTableData = JSON.parse(JSON.stringify(pageFunctionState.pageFunctionTableData));

  useEffect(() => {
    pageFunctionDispatchers.pageFunctionPage(1);
  }, [pageFunctionDispatchers]);

  const PageFunctionPageRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => pageFunctionDispatchers.pageFunctionEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => pageFunctionDispatchers.pageFunctionDelete({
        record,
        pageFunctionCurrent: pageFunctionState.pageFunctionCurrent
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => pageFunctionDispatchers.pageFunctionEdit()}> 添加菜单 </Button>
            <Dialog title="菜单" visible={pageFunctionState.pageFunctionVisible}
              onOk={() => pageFunctionDispatchers.savepageFunction({
                pageFunctionFormData: pageFunctionState.pageFunctionFormData
              })}
              onCancel={() => dispatchers.setState({ pageFunctionVisible: false })}
              onClose={() => dispatchers.setState({ pageFunctionVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...pageFunctionState.formItemLayout}
                value={pageFunctionState.pageFunctionFormData}
                onChange={value => dispatchers.setState({ pageFunctionFormData: value })}>
                  11111111111111111111111
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={pageFunctionState.pageFunctionLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={pageFunctionTableData} isTree primaryKey="id">
              <Table.Column title="操作" lock="right" width="160px" cell={PageFunctionPageRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{pageFunctionState.pageFunctionTotal}</span> 条 </div>
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  )
}

export default PageFunctionPage;