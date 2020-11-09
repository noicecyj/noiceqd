import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Loading, Pagination, Input } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/DataForm';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function DataFormPage() {
  const [dataFormState, dataFormDispatchers] = pageStore.useModel('DataForm');
  const dispatchers = pageStore.useModelDispatchers('DataForm');

  useEffect(() => {
    dataFormDispatchers.dataFormPage(1);
  }, [dataFormDispatchers]);

  const dataFormPageRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => dataFormDispatchers.dataFormEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => dataFormDispatchers.dataFormDelete({
        record,
        dataFormCurrent: dataFormState.dataFormCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  const dataItemPageRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => dataFormDispatchers.dataItemEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => dataFormDispatchers.dataItemDelete({
        record,
        dataItemCurrent: dataFormState.dataItemCurrent
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => dataFormDispatchers.dataFormEdit()}> 添加菜单 </Button>
            <Dialog title="菜单" visible={dataFormState.dataFormVisible}
              onOk={() => dataFormDispatchers.dataFormSave({
                dataFormFormData: dataFormState.dataFormFormData,
                dataFormCurrent: dataFormState.dataFormCurrent,
              })}
              onCancel={() => dispatchers.setState({ dataFormVisible: false })}
              onClose={() => dispatchers.setState({ dataFormVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...dataFormState.formItemLayout}
                value={dataFormState.dataFormFormData}
                onChange={value => dispatchers.setState({ dataFormFormData: value })}>
                <FormItem label="模板名称：" required requiredMessage="请输入模板名称">
                  <Input id="dataFormName" name="dataFormName" placeholder="请输入模板名称" />
                </FormItem>
                <FormItem label="模板描述：" required requiredMessage="请选择模板描述">
                  <Input id="description" name="description" placeholder="请输入模板描述" />
                </FormItem>
                <FormItem label="排序代码：" required requiredMessage="请选择排序代码">
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={dataFormState.dataFormLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={dataFormState.dataFormTableData}
              rowSelection={{
                mode: 'single',
                onSelect: (selected, record) => {
                  dataFormDispatchers.dataItemOnRowClick({ selected, record });
                },
              }} >
              <Table.Column title="模板名称" dataIndex="dataFormName" key={1} />
              <Table.Column title="模板描述" dataIndex="description" key={2} />
              <Table.Column title="排序代码" dataIndex="sortCode" key={3} />
              <Table.Column title="操作" lock="right" width="160px" cell={dataFormPageRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{dataFormState.dataFormTotal}</span> 条 </div>
              <Pagination onChange={current => dataFormDispatchers.dataFormPage(current)}
                stype="simple" pageSize={5} total={dataFormState.dataFormTotal} />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={12} hidden={dataFormState.dataItemDivVisible}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => dataFormDispatchers.dataItemEdit()}> 添加菜单 </Button>
            <Dialog title="菜单" visible={dataFormState.dataItemVisible}
              onOk={() => dataFormDispatchers.dataItemSave({
                dataItemFormData: dataFormState.dataItemFormData,
                dataItemCurrent: dataFormState.dataItemCurrent,
                dataFormId: dataFormState.dataFormId,
              })}
              onCancel={() => dispatchers.setState({ dataItemVisible: false })}
              onClose={() => dispatchers.setState({ dataItemVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...dataFormState.formItemLayout}
                value={dataFormState.dataItemFormData}
                onChange={value => dispatchers.setState({ dataItemFormData: value })}>
                11111111111111111111111
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={dataFormState.dataItemLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={dataFormState.dataItemTableData} isTree primaryKey="id">
              <Table.Column title="操作" lock="right" width="160px" cell={dataItemPageRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{dataFormState.dataItemTotal}</span> 条 </div>
            </Box>
            <Pagination onChange={current => dataFormDispatchers.dataItemPage({ id: dataFormState.dataFormId, current })}
              stype="simple" pageSize={5} total={dataFormState.dataItemTotal} />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default DataFormPage;