import { ResponsiveGrid, Button, Dialog, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import pageStore from '@/pages/DataForm/store';
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
    dataFormDispatchers.findDataTableAndFormByName();
  }, [dataFormDispatchers]);

  const dataFormPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => dataFormDispatchers.dataFormEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataFormDispatchers.dataFormDelete({
        record,
        dataFormCurrent: dataFormState.dataFormCurrent,
        dataFormTable: dataFormState.dataFormTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  const dataFormItemPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => dataFormItemDispatchers.dataFormItemEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataFormItemDispatchers.dataFormItemDelete({
        record,
        dataFormItemCurrent: dataFormItemState.dataFormItemCurrent,
        dataFormItemTable: dataFormItemState.dataFormItemTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataFormDispatchers.dataFormEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataFormState.dataFormVisible } footer={ false }
              onClose={ () => dataForm.setState({ dataFormVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ dataFormState.dataFormForm }
                dispatchers={ value => dataFormDispatchers.setDataForm(value) }
                onOk={ () => dataFormDispatchers.dataFormSave({
                  dataFormFormData: dataFormState.dataFormFormData,
                  dataFormCurrent: dataFormState.dataFormCurrent,
                  dataFormTable: dataFormState.dataFormTable,
                }) }
                formDataValue={ dataFormState.dataFormFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataFormState.dataFormLoadingVisible }>
            <DataTableTemple
              dataSource={ dataFormState.dataFormTableData }
              items={ dataFormState.dataFormTable }
              total={ dataFormState.dataFormTotal }
              getPage={ current => dataFormDispatchers.dataFormPage({ current, dataFormTable: dataFormState.dataFormTable, }) }
              rowSelection={ {
                mode: 'single',
                onSelect: (selected, record) => {
                  dataFormItemDispatchers.onRowClick({ selected, record });
                },
              } }
              pageRender={ dataFormPageRender } />
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={ 12 } hidden={ dataFormItemState.divVisible }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataFormItemDispatchers.dataFormItemEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataFormItemState.dataFormItemVisible } footer={ false }
              onClose={ () => dataFormItem.setState({ dataFormItemVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ dataFormItemState.dataFormItemForm }
                dispatchers={ value => dataFormItemDispatchers.setDataForm(value) }
                onOk={ () => dataFormItemDispatchers.dataFormItemSave({
                  dataFormItemFormData: dataFormItemState.dataFormItemFormData,
                  dataFormItemCurrent: dataFormItemState.dataFormItemCurrent,
                  dataFormItemTable: dataFormItemState.dataFormItemTable,
                  dataFormId: dataFormItemState.dataFormId,
                }) }
                formDataValue={ dataFormItemState.dataFormItemFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataFormItemState.dataFormItemLoadingVisible }>
            <DataTableTemple
              dataSource={ dataFormItemState.dataFormItemTableData }
              items={ dataFormItemState.dataFormItemTable }
              total={ dataFormItemState.dataFormItemTotal }
              getPage={ current => dataFormItemDispatchers.dataFormItemPage({ dataFormId: dataFormItemState.dataFormId, current }) }
              pageRender={ dataFormItemPageRender } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default DataFormPage;