import { ResponsiveGrid, Button, Dialog, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import pageStore from '@/pages/MenuPage/store';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function MenuPagePage() {
  const [menuPageState, menuPageDispatchers] = pageStore.useModel('menuPage');
  const menuPage = pageStore.useModelDispatchers('menuPage');

  useEffect(() => {
    menuPageDispatchers.findDataTableAndFormByName();
  }, [menuPageDispatchers]);

  const menuPagePageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => menuPageDispatchers.menuPageEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => menuPageDispatchers.menuPageDelete({
        record,
        menuPageCurrent: menuPageState.menuPageCurrent,
        menuPageTable: menuPageState.menuPageTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => menuPageDispatchers.menuPageEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ menuPageState.menuPageVisible } footer={ false }
              onClose={ () => menuPage.setState({ menuPageVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ menuPageState.menuPageForm }
                dispatchers={ value => menuPageDispatchers.setDataForm(value) }
                onOk={ () => menuPageDispatchers.menuPageSave({
                  menuPageFormData: menuPageState.menuPageFormData,
                  menuPageCurrent: menuPageState.menuPageCurrent,
                  menuPageTable: menuPageState.menuPageTable,
                }) }
                formDataValue={ menuPageState.menuPageFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ menuPageState.menuPageLoadingVisible }>
            <DataTableTemple
              dataSource={ menuPageState.menuPageTableData }
              items={ menuPageState.menuPageTable }
              total={ menuPageState.menuPageTotal }
              getPage={ current => menuPageDispatchers.menuPagePage({ current, menuPageTable: menuPageState.menuPageTable, }) }
              pageRender={ menuPagePageRender } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default MenuPagePage;