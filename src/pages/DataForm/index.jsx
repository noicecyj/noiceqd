import { ResponsiveGrid, Button, Box, Dialog, Loading, Pagination } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/DataForm';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function DataFormPage() {
  const [dataFormState, dataFormDispatchers] = pageStore.useModel('dataForm');
  const dataForm = pageStore.useModelDispatchers('dataForm');

  const [dataFormItemState, dataFormItemDispatchers] = pageStore.useModel('dataFormItem');
  const dataFormItem = pageStore.useModelDispatchers('dataFormItem');

  useEffect(() => {
    dataFormDispatchers.dataFormPage(1);
    dataFormDispatchers.findDataFormByName('dataFormForm');
    dataFormDispatchers.findDataTableByName('dataFormTable');
    dataFormItemDispatchers.findDataFormByName('dataFormItemForm');
    dataFormItemDispatchers.findDataTableByName('dataFormItemTable');
  }, [dataFormDispatchers, dataFormItemDispatchers]);

  const dataFormPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => dataFormDispatchers.dataFormEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataFormDispatchers.dataFormDelete({
        record,
        dataFormCurrent: dataFormState.dataFormCurrent,
      }) } warning> 删除 </Button>
    </div>;
  };

  const dataFormItemPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => dataFormItemDispatchers.dataFormItemEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataFormItemDispatchers.dataFormItemDelete({
        record,
        dataFormItemCurrent: dataFormItemState.dataFormItemCurrent,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataFormDispatchers.dataFormEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataFormState.dataFormVisible }
              onOk={ () => dataFormDispatchers.dataFormSave({
                dataFormFormData: dataFormState.dataFormFormData,
                dataFormCurrent: dataFormState.dataFormCurrent,
              }) }
              onCancel={ () => dataForm.setState({ dataFormVisible: false }) }
              onClose={ () => dataForm.setState({ dataFormVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple items={ dataFormState.dataFormForm }
                dispatchers={ value => dataFormDispatchers.setDataForm(value) }
                formDataValue={ dataFormState.dataFormFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataFormState.dataFormLoadingVisible }>
            <DataTableTemple dataSource={ dataFormState.dataFormTableData }
              items={ dataFormState.dataFormTable }
              rowSelection={ {
                mode: 'single',
                onSelect: (selected, record) => {
                  dataFormItemDispatchers.onRowClick({ selected, record });
                },
              } }
              pageRender={ dataFormPageRender } />
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ dataFormState.dataFormTotal }</span> 条 </div>
              <Pagination onChange={ current => dataFormDispatchers.dataFormPage(current) }
                type="simple" pageSize={ 5 } total={ dataFormState.dataFormTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={ 12 } hidden={ dataFormItemState.divVisible }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataFormItemDispatchers.dataFormItemEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataFormItemState.dataFormItemVisible }
              onOk={ () => dataFormItemDispatchers.dataFormItemSave({
                dataFormItemFormData: dataFormItemState.dataFormItemFormData,
                dataFormItemCurrent: dataFormItemState.dataFormItemCurrent,
                dataFormId: dataFormItemState.dataFormId,
              }) }
              onCancel={ () => dataFormItem.setState({ dataFormItemVisible: false }) }
              onClose={ () => dataFormItem.setState({ dataFormItemVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple items={ dataFormItemState.dataFormItemForm }
                dispatchers={ value => dataFormItemDispatchers.setDataForm(value) }
                formDataValue={ dataFormItemState.dataFormItemFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataFormItemState.dataFormItemLoadingVisible }>
            <DataTableTemple dataSource={ dataFormItemState.dataFormItemTableData }
              items={ dataFormItemState.dataFormItemTable }
              pageRender={ dataFormItemPageRender } />
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ dataFormItemState.dataFormItemTotal }</span> 条 </div>
              <Pagination onChange={ current => dataFormItemDispatchers.dataFormItemPage({ id: dataFormItemState.dataFormId, current }) }
                type="simple" pageSize={ 5 } total={ dataFormItemState.dataFormItemTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default DataFormPage;