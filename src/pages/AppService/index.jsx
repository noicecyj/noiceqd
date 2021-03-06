import { ResponsiveGrid, Button, Dialog, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import pageStore from '@/pages/AppService/store';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function AppServicePage() {
  const [appServiceState, appServiceDispatchers] = pageStore.useModel('appService');
  const appService = pageStore.useModelDispatchers('appService');

  useEffect(() => {
    appServiceDispatchers.findDataTableAndFormByName();
  }, [appServiceDispatchers]);

  const appServicePageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => appServiceDispatchers.appServiceEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => appServiceDispatchers.appServiceDelete({
        record,
        appServiceCurrent: appServiceState.appServiceCurrent,
        appServiceTable: appServiceState.appServiceTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => appServiceDispatchers.appServiceEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ appServiceState.appServiceVisible } footer={ false }
              onClose={ () => appService.setState({ appServiceVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ appServiceState.appServiceForm }
                dispatchers={ value => appServiceDispatchers.setDataForm(value) }
                onOk={ () => appServiceDispatchers.appServiceSave({
                  appServiceFormData: appServiceState.appServiceFormData,
                  appServiceCurrent: appServiceState.appServiceCurrent,
                  appServiceTable: appServiceState.appServiceTable,
                }) }
                formDataValue={ appServiceState.appServiceFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ appServiceState.appServiceLoadingVisible }>
            <DataTableTemple
              dataSource={ appServiceState.appServiceTableData }
              items={ appServiceState.appServiceTable }
              total={ appServiceState.appServiceTotal }
              getPage={ current => appServiceDispatchers.appServicePage({ current, appServiceTable: appServiceState.appServiceTable, }) }
              pageRender={ appServicePageRender } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default AppServicePage;