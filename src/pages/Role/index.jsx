import { ResponsiveGrid, Button, Dialog, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import pageStore from '@/pages/Role/store';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function RolePage() {
  const [roleState, roleDispatchers] = pageStore.useModel('role');
  const role = pageStore.useModelDispatchers('role');

  useEffect(() => {
    roleDispatchers.findDataTableAndFormByName();
  }, [roleDispatchers]);

  const rolePageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => roleDispatchers.roleEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => roleDispatchers.roleDelete({
        record,
        roleCurrent: roleState.roleCurrent,
        roleTable: roleState.roleTable,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => roleDispatchers.roleEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ roleState.roleVisible } footer={ false }
              onClose={ () => role.setState({ roleVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple
                items={ roleState.roleForm }
                dispatchers={ value => roleDispatchers.setDataForm(value) }
                onOk={ () => roleDispatchers.roleSave({
                  roleFormData: roleState.roleFormData,
                  roleCurrent: roleState.roleCurrent,
                  roleTable: roleState.roleTable,
                }) }
                formDataValue={ roleState.roleFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ roleState.roleLoadingVisible }>
            <DataTableTemple
              dataSource={ roleState.roleTableData }
              items={ roleState.roleTable }
              total={ roleState.roleTotal }
              getPage={ current => roleDispatchers.rolePage({ current, roleTable: roleState.roleTable, }) }
              pageRender={ rolePageRender } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default RolePage;