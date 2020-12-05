import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Loading, Pagination } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/DataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function DataTablePage() {
  const [dataTableState, dataTableDispatchers] = pageStore.useModel('dataTable');
  const dataTable = pageStore.useModelDispatchers('dataTable');

  const [dataTableItemState, dataTableItemDispatchers] = pageStore.useModel('dataTableItem');
  const dataTableItem = pageStore.useModelDispatchers('dataTableItem');

  useEffect(() => {
    // <=============================自定义初始化数据 start =============================>

    // <=============================自定义初始化数据 end   =============================>
    dataTableDispatchers.dataTablePage(1);
  }, [dataTableDispatchers]);

  const dataTablePageRender = (value, index, record) => {
    return <div className={styles.opt}>
      {/* <=============================自定义组件 start =============================> */}

      {/* <=============================自定义组件 end   =============================> */}
      {/* <=============================可选组件 start =============================> */}

      {/* <=============================可选组件 end   =============================> */}
      <Button type="primary" size="small" onClick={() => dataTableDispatchers.dataTableEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => dataTableDispatchers.dataTableDelete({
        record,
        dataTableCurrent: dataTableState.dataTableCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  const dataTableItemPageRender = (value, index, record) => {
    return <div className={styles.opt}>
      {/* <=============================自定义组件 start =============================> */}

      {/* <=============================自定义组件 end   =============================> */}
      {/* <=============================可选组件 start =============================> */}

      {/* <=============================可选组件 end   =============================> */}
      <Button type="primary" size="small" onClick={() => dataTableItemDispatchers.dataTableItemEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => dataTableItemDispatchers.dataTableItemDelete({
        record,
        dataTableItemCurrent: dataTableItemState.dataTableItemCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => dataTableDispatchers.dataTableEdit()}> 添加菜单 </Button>
            <Dialog title="菜单" visible={dataTableState.dataTableVisible}
              onOk={() => dataTableDispatchers.dataTableSave({
                dataTableFormData: dataTableState.dataTableFormData,
                dataTableCurrent: dataTableState.dataTableCurrent,
              })}
              onCancel={() => dataTable.setState({ dataTableVisible: false })}
              onClose={() => dataTable.setState({ dataTableVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...dataTableState.formItemLayout}
                value={dataTableState.dataTableFormData}
                onChange={value => dataTable.setState({ dataTableFormData: value })}>
                {/* <=============================自定义表单 start =============================> */}
                  11111111111111111111111
                {/* <=============================自定义表单 end   =============================> */}
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={dataTableState.dataTableLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={dataTableState.dataTableTableData}
              rowSelection={{
                mode: 'single',
                onSelect: (selected, record) => {
                  dataTableItemDispatchers.onRowClick({ selected, record });
                },
              }} >
              {/* <=============================自定义表单 start =============================> */}
              <Table.Column title="操作" lock="right" width="160px" cell={dataTablePageRender} />
              {/* <=============================自定义表单 end   =============================> */}
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{dataTableState.dataTableTotal}</span> 条 </div>
              <Pagination onChange={current => dataTableDispatchers.dataTablePage(current)}
                stype="simple" pageSize={5} total={dataTableState.dataTableTotal} />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={12} hidden={dataTableItemState.divVisible}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => dataTableItemDispatchers.dataTableItemEdit()}> 添加菜单 </Button>
            <Dialog title="菜单" visible={dataTableItemState.dataTableItemVisible}
              onOk={() => dataTableItemDispatchers.dataTableItemSave({
                dataTableItemFormData: dataTableItemState.dataTableItemFormData,
                dataTableItemCurrent: dataTableItemState.dataTableItemCurrent,
                dataTableId: dataTableItemState.dataTableId,
              })}
              onCancel={() => dataTableItem.setState({ dataTableItemVisible: false })}
              onClose={() => dataTableItem.setState({ dataTableItemVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...dataTableItemState.formItemLayout}
                value={dataTableItemState.dataTableItemFormData}
                onChange={value => dataTableItem.setState({ dataTableItemFormData: value })}>
                {/* <=============================自定义表单 start =============================> */}
                  11111111111111111111111
                {/* <=============================自定义表单 end   =============================> */}
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={dataTableItemState.dataTableItemLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={dataTableItemState.dataTableItemTableData}>
              {/* <=============================自定义表单 start =============================> */}
              <Table.Column title="操作" lock="right" width="160px" cell={dataTableItemPageRender} />
              {/* <=============================自定义表单 end   =============================> */}
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{dataTableItemState.dataTableItemTotal}</span> 条 </div>
            </Box>
            <Pagination onChange={current => dataTableItemDispatchers.dataTableItemPage({ id: dataTableItemState.dataTableId, current })}
              stype="simple" pageSize={5} total={dataTableItemState.dataTableItemTotal} />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default DataTablePage;
