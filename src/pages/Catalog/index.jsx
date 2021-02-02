import { ResponsiveGrid, Button, Dialog, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import pageStore from '@/pages/Catalog/store';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function CatalogPage() {
  const [catalogState, catalogDispatchers] = pageStore.useModel('catalog');
  const catalog = pageStore.useModelDispatchers('catalog');

  const [dictionaryState, dictionaryDispatchers] = pageStore.useModel('dictionary');
  const dictionary = pageStore.useModelDispatchers('dictionary');

  useEffect(() => {
    catalogDispatchers.findDataTableAndFormByName();
  }, [catalogDispatchers]);

  const catalogPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => catalogDispatchers.catalogEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => catalogDispatchers.catalogDelete({
        record,
        catalogCurrent: catalogState.catalogCurrent,
        catalogTable: catalogState.catalogTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  const dictionaryPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => dictionaryDispatchers.dictionaryEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dictionaryDispatchers.dictionaryDelete({
        record,
        dictionaryCurrent: dictionaryState.dictionaryCurrent,
        dictionaryTable: dictionaryState.dictionaryTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => catalogDispatchers.catalogEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ catalogState.catalogVisible } footer={ false }
              onClose={ () => catalog.setState({ catalogVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ catalogState.catalogForm }
                dispatchers={ value => catalogDispatchers.setDataForm(value) }
                onOk={ () => catalogDispatchers.catalogSave({
                  catalogFormData: catalogState.catalogFormData,
                  catalogCurrent: catalogState.catalogCurrent,
                  catalogTable: catalogState.catalogTable,
                }) }
                formDataValue={ catalogState.catalogFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ catalogState.catalogLoadingVisible }>
            <DataTableTemple
              dataSource={ catalogState.catalogTableData }
              items={ catalogState.catalogTable }
              total={ catalogState.catalogTotal }
              getPage={ current => catalogDispatchers.catalogPage({ current, catalogTable: catalogState.catalogTable, }) }
              rowSelection={ {
                mode: 'single',
                onSelect: (selected, record) => {
                  dictionaryDispatchers.onRowClick({ selected, record });
                },
              } }
              pageRender={ catalogPageRender } />
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={ 12 } hidden={ dictionaryState.divVisible }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dictionaryDispatchers.dictionaryEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dictionaryState.dictionaryVisible } footer={ false }
              onClose={ () => dictionary.setState({ dictionaryVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ dictionaryState.dictionaryForm }
                dispatchers={ value => dictionaryDispatchers.setDataForm(value) }
                onOk={ () => dictionaryDispatchers.dictionarySave({
                  dictionaryFormData: dictionaryState.dictionaryFormData,
                  dictionaryCurrent: dictionaryState.dictionaryCurrent,
                  dictionaryTable: dictionaryState.dictionaryTable,
                  catalogId: dictionaryState.catalogId,
                }) }
                formDataValue={ dictionaryState.dictionaryFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dictionaryState.dictionaryLoadingVisible }>
            <DataTableTemple
              dataSource={ dictionaryState.dictionaryTableData }
              items={ dictionaryState.dictionaryTable }
              total={ dictionaryState.dictionaryTotal }
              getPage={ current => dictionaryDispatchers.dictionaryPage({ catalogId: dictionaryState.catalogId, current }) }
              pageRender={ dictionaryPageRender } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default CatalogPage;