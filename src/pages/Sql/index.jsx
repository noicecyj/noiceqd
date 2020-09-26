import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Input, Loading, Drawer, Radio } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/Sql';
import MonacoEditor from 'react-monaco-editor';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function SqlPage() {
  const [sqlState, sqlDispatchers] = pageStore.useModel('sql');
  const dispatchers = pageStore.useModelDispatchers('sql');

  useEffect(() => {
    sqlDispatchers.findCatalogByValue('SQL_TYPE');
    sqlDispatchers.sqlPage(1);
  }, [sqlDispatchers]);

  const SqlPageRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => sqlDispatchers.sqlExcited(record)}> 执行 </Button>
      <Button type="primary" size="small" onClick={() => sqlDispatchers.sqlEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => sqlDispatchers.sqlDelete({
        record,
        sqlCurrent: sqlState.sqlCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  function renderCols() {
    if (sqlState.drawerTableData[0]) {
      const cols = sqlState.drawerTableData[0];
      return Object.keys(cols).map(key => {
        return <Table.Column title={key} dataIndex={key} key={key} />;
      });
    }
  }

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => sqlDispatchers.sqlEdit()}> 添加sql </Button>
            <Dialog title="菜单" visible={sqlState.sqlVisible}
              onOk={() => sqlDispatchers.sqlSave({
                sqlFormData: sqlState.sqlFormData,
                sqlCurrent: sqlState.sqlCurrent,
              })}
              onCancel={() => dispatchers.setState({ sqlVisible: false, sqlStr: '' })}
              onClose={() => dispatchers.setState({ sqlVisible: false, sqlStr: '' })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...sqlState.formItemLayout}
                value={sqlState.sqlFormData}
                onChange={value => dispatchers.setState({ sqlFormData: value })}>
                <FormItem label="sql语句:" required requiredMessage="请输入sql语句">
                  <Input id="sqlStr" name="sqlStr" htmlType="hidden" />
                  <MonacoEditor width="430" height="250" language="sql" theme="vs-dark"
                    onChange={value => sqlDispatchers.setInputValue(value, sqlState.sqlFormData)} value={sqlState.sqlStr} />
                </FormItem>
                <FormItem label="sql描述:">
                  <Input.TextArea id="sqlDescription" name="sqlDescription" placeholder="请输入sql描述" />
                </FormItem>
                <FormItem label="sql类型:" required requiredMessage="请输入sql类型">
                  <RadioGroup dataSource={sqlState.SQL_TYPE} name="sqlType" />
                </FormItem>
                <FormItem label="排序代码:" required requiredMessage="请输入排序代码">
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={sqlState.sqlLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={sqlState.sqlTableData}>
              <Table.Column title="sql语句" dataIndex="sqlStr" key={1} />
              <Table.Column title="sql描述" dataIndex="sqlDescription" key={2} width="300px" />
              <Table.Column title="sql类型" dataIndex="sqlType" key={3} width="100px" />
              <Table.Column title="排序代码" dataIndex="sortCode" key={4} width="100px" />
              <Table.Column title="操作" lock="right" width="222px" cell={SqlPageRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{sqlState.sqlTotal}</span> 条 </div>
            </Box>
          </Loading>
        </div>
      </Cell>
      <Drawer title="查询结果" placement="right" width="100%"
        visible={sqlState.drawerVisible}
        onClose={() => dispatchers.setState({ drawerVisible: false })}
        onBlur={() => dispatchers.setState({ drawerVisible: false })}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Loading tip="加载中..." visible={sqlState.drawerLoadingVisible}>
              <Table className={styles.Table} dataSource={sqlState.drawerTableData}>
                {renderCols()}
              </Table>
              <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
                <div className={styles.total}> 共 <span>{sqlState.drawerTotal}</span> 条 </div>
              </Box>
            </Loading>
          </div>
        </div>
      </Drawer>
    </ResponsiveGrid>
  );
}

export default SqlPage;
