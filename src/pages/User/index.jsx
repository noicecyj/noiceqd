import { ResponsiveGrid, Button, Box, Dialog, Loading, Pagination } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/User';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function UserPage() {
  const [userState, userDispatchers] = pageStore.useModel('user');
  const user = pageStore.useModelDispatchers('user');

  useEffect(() => {
    userDispatchers.userPage(1);
    userDispatchers.findDataFormByName('userForm');
    userDispatchers.findDataTableByName('userTable');
  }, [userDispatchers]);

  const userPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => userDispatchers.userEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => userDispatchers.userDelete({
        record,
        userCurrent: userState.userCurrent,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => userDispatchers.userEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ userState.userVisible } footer={ false }
              onClose={ () => user.setState({ userVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple items={ userState.userForm }
                dispatchers={ value => userDispatchers.setDataForm(value) }
                onOk={ () => userDispatchers.userSave({
                  userFormData: userState.userFormData,
                  userCurrent: userState.userCurrent,
                }) }
                formDataValue={ userState.userFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ userState.userLoadingVisible }>
            <DataTableTemple dataSource={ userState.userTableData }
              items={ userState.userTable }
              pageRender={ userPageRender } />
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ userState.userTotal }</span> 条 </div>
              <Pagination onChange={ current => userDispatchers.userPage(current) }
                type="simple" pageSize={ 5 } total={ userState.userTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default UserPage;