import { ResponsiveGrid, Button, Box, Dialog, Loading, Pagination } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/DataTable';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function DataTablePage() {
  const [dataTableState, dataTableDispatchers] = pageStore.useModel('dataTable');
  const dataTable = pageStore.useModelDispatchers('dataTable');

  const [dataTableItemState, dataTableItemDispatchers] = pageStore.useModel('dataTableItem');
  const dataTableItem = pageStore.useModelDispatchers('dataTableItem');

  useEffect(() => {
    dataTableDispatchers.dataTablePage(1);
    dataTableDispatchers.findDataFormByName('null');
    dataTableDispatchers.findDataTableByName('null');
    dataTableItemDispatchers.findDataFormByName('null');
    dataTableItemDispatchers.findDataTableByName('null');
  }, [dataTableDispatchers, dataTableItemDispatchers]);

  const dataTablePageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      {/* <=============================自定义组件 start =============================> */ }

      {/* <=============================自定义组件 end   =============================> */ }
      {/* <=============================可选组件 start =============================> */ }

      {/* <=============================可选组件 end   =============================> */ }
      <Button type="primary" size="small" onClick={ () => dataTableDispatchers.dataTableEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataTableDispatchers.dataTableDelete({
        record,
        dataTableCurrent: dataTableState.dataTableCurrent,
      }) } warning> 删除 </Button>
    </div>;
  };

  const dataTableItemPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      {/* <=============================自定义组件 start =============================> */ }

      {/* <=============================自定义组件 end   =============================> */ }
      {/* <=============================可选组件 start =============================> */ }

      {/* <=============================可选组件 end   =============================> */ }
      <Button type="primary" size="small" onClick={ () => dataTableItemDispatchers.dataTableItemEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataTableItemDispatchers.dataTableItemDelete({
        record,
        dataTableItemCurrent: dataTableItemState.dataTableItemCurrent,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataTableDispatchers.dataTableEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataTableState.dataTableVisible }
              onOk={ () => dataTableDispatchers.dataTableSave({
                dataTableFormData: dataTableState.dataTableFormData,
                dataTableCurrent: dataTableState.dataTableCurrent,
              }) }
              onCancel={ () => dataTable.setState({ dataTableVisible: false }) }
              onClose={ () => dataTable.setState({ dataTableVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple items={ dataTableState.dataTableDataForm }
                dispatchers={ value => dataTableDispatchers.setDataForm(value) }
                formDataValue={ dataTableState.dataTableFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataTableState.dataTableLoadingVisible }>
            <DataTableTemple dataSource={ dataTableState.dataTableDataTable } pageRender={ dataTablePageRender } />
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ dataTableState.dataTableTotal }</span> 条 </div>
              <Pagination onChange={ current => dataTableDispatchers.dataTablePage(current) }
                stype="simple" pageSize={ 5 } total={ dataTableState.dataTableTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={ 12 } hidden={ dataTableItemState.divVisible }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataTableItemDispatchers.dataTableItemEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataTableItemState.dataTableItemVisible }
              onOk={ () => dataTableItemDispatchers.dataTableItemSave({
                dataTableItemFormData: dataTableItemState.dataTableItemFormData,
                dataTableItemCurrent: dataTableItemState.dataTableItemCurrent,
                dataTableId: dataTableItemState.dataTableId,
              }) }
              onCancel={ () => dataTableItem.setState({ dataTableItemVisible: false }) }
              onClose={ () => dataTableItem.setState({ dataTableItemVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple items={ dataTableItemState.dataTableItemDataForm }
                dispatchers={ value => dataTableItemDispatchers.setDataForm(value) }
                formDataValue={ dataTableItemState.dataTableItemFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataTableItemState.dataTableItemLoadingVisible }>
            <DataTableTemple dataSource={ dataTableItemState.dataTableItemDataTable } pageRender={ dataTableItemPageRender } />
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ dataTableItemState.dataTableItemTotal }</span> 条 </div>
              <Pagination onChange={ current => dataTableItemDispatchers.dataTableItemPage({ id: dataTableItemState.dataTableId, current }) }
                stype="simple" pageSize={ 5 } total={ dataTableItemState.dataTableItemTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default DataTablePage;