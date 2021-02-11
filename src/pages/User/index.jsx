import { ResponsiveGrid, Button, Dialog, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import pageStore from '@/pages/User/store';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function UserPage() {
  const [userState, userDispatchers] = pageStore.useModel('user');
  const user = pageStore.useModelDispatchers('user');

  useEffect(() => {
    userDispatchers.findDataTableAndFormByName();
  }, [userDispatchers]);

  const userPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => userDispatchers.userEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => userDispatchers.userDelete({
        record,
        userCurrent: userState.userCurrent,
        userTable: userState.userTable,
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
              <DataFormTemple
                items={ userState.userForm }
                dispatchers={ value => userDispatchers.setDataForm(value) }
                onOk={ () => userDispatchers.userSave({
                  userFormData: userState.userFormData,
                  userCurrent: userState.userCurrent,
                  userTable: userState.userTable,
                }) }
                formDataValue={ userState.userFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ userState.userLoadingVisible }>
            <DataTableTemple
              dataSource={ userState.userTableData }
              items={ userState.userTable }
              total={ userState.userTotal }
              getPage={ current => userDispatchers.userPage({ current, userTable: userState.userTable, }) }
              pageRender={ userPageRender } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default UserPage;