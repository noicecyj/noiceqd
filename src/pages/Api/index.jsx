import { ResponsiveGrid, Button, Dialog, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import pageStore from '@/pages/Api/store';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function ApiPage() {
  const [apiState, apiDispatchers] = pageStore.useModel('api');
  const api = pageStore.useModelDispatchers('api');

  useEffect(() => {
    apiDispatchers.findDataTableAndFormByName();
  }, [apiDispatchers]);

  const apiPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => apiDispatchers.apiEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => apiDispatchers.apiDelete({
        record,
        apiCurrent: apiState.apiCurrent,
        apiTable: apiState.apiTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => apiDispatchers.apiEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ apiState.apiVisible } footer={ false }
              onClose={ () => api.setState({ apiVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ apiState.apiForm }
                dispatchers={ value => apiDispatchers.setDataForm(value) }
                onOk={ () => apiDispatchers.apiSave({
                  apiFormData: apiState.apiFormData,
                  apiCurrent: apiState.apiCurrent,
                  apiTable: apiState.apiTable,
                }) }
                formDataValue={ apiState.apiFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ apiState.apiLoadingVisible }>
            <DataTableTemple
              dataSource={ apiState.apiTableData }
              items={ apiState.apiTable }
              total={ apiState.apiTotal }
              getPage={ current => apiDispatchers.apiPage({ current, apiTable: apiState.apiTable, }) }
              pageRender={ apiPageRender } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default ApiPage;