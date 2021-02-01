import { ResponsiveGrid, Button, Dialog, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import pageStore from '@/pages/DataTable/store';
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
    dataTableDispatchers.findDataTableAndFormByName();
  }, [dataTableDispatchers]);

  const dataTablePageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => dataTableDispatchers.dataTableEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataTableDispatchers.dataTableDelete({
        record,
        dataTableCurrent: dataTableState.dataTableCurrent,
        dataTableTable: dataTableState.dataTableTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  const dataTableItemPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => dataTableItemDispatchers.dataTableItemEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataTableItemDispatchers.dataTableItemDelete({
        record,
        dataTableItemCurrent: dataTableItemState.dataTableItemCurrent,
        dataTableItemTable: dataTableItemState.dataTableItemTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataTableDispatchers.dataTableEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataTableState.dataTableVisible } footer={ false }
              onClose={ () => dataTable.setState({ dataTableVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ dataTableState.dataTableForm }
                dispatchers={ value => dataTableDispatchers.setDataForm(value) }
                onOk={ () => dataTableDispatchers.dataTableSave({
                  dataTableFormData: dataTableState.dataTableFormData,
                  dataTableCurrent: dataTableState.dataTableCurrent,
                  dataTableTable: dataTableState.dataTableTable,
                }) }
                formDataValue={ dataTableState.dataTableFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataTableState.dataTableLoadingVisible }>
            <DataTableTemple
              dataSource={ dataTableState.dataTableTableData }
              items={ dataTableState.dataTableTable }
              total={ dataTableState.dataTableTotal }
              getPage={ current => dataTableDispatchers.dataTablePage({ current, dataTableTable: dataTableState.dataTableTable, }) }
              rowSelection={ {
                mode: 'single',
                onSelect: (selected, record) => {
                  dataTableItemDispatchers.onRowClick({ selected, record });
                },
              } }
              pageRender={ dataTablePageRender } />
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={ 12 } hidden={ dataTableItemState.divVisible }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataTableItemDispatchers.dataTableItemEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataTableItemState.dataTableItemVisible } footer={ false }
              onClose={ () => dataTableItem.setState({ dataTableItemVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ dataTableItemState.dataTableItemForm }
                dispatchers={ value => dataTableItemDispatchers.setDataForm(value) }
                onOk={ () => dataTableItemDispatchers.dataTableItemSave({
                  dataTableItemFormData: dataTableItemState.dataTableItemFormData,
                  dataTableItemCurrent: dataTableItemState.dataTableItemCurrent,
                  dataTableItemTable: dataTableItemState.dataTableItemTable,
                  dataTableId: dataTableItemState.dataTableId,
                }) }
                formDataValue={ dataTableItemState.dataTableItemFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataTableItemState.dataTableItemLoadingVisible }>
            <DataTableTemple
              dataSource={ dataTableItemState.dataTableItemTableData }
              items={ dataTableItemState.dataTableItemTable }
              total={ dataTableItemState.dataTableItemTotal }
              getPage={ current => dataTableItemDispatchers.dataTableItemPage({ dataTableId: dataTableItemState.dataTableId, current }) }
              pageRender={ dataTableItemPageRender } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default DataTablePage;