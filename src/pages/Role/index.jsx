import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Input, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/Role';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function RolePage() {
  const [roleState, roleDispatchers] = pageStore.useModel('role');
  const dispatchers = pageStore.useModelDispatchers('role');
  const roleTableData = JSON.parse(JSON.stringify(roleState.roleTableData));

  useEffect(() => {
    roleDispatchers.rolePage(1);
  }, [roleDispatchers]);

  const RolePageRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => roleDispatchers.roleEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => roleDispatchers.roleDelete({
        record,
        roleCurrent: roleState.roleCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => roleDispatchers.roleEdit()}> 添加菜单 </Button>
            <Dialog title="菜单" visible={roleState.roleVisible}
              onOk={() => roleDispatchers.roleSave({
                roleFormData: roleState.roleFormData,
                roleCurrent: roleState.roleCurrent,
              })}
              onCancel={() => dispatchers.setState({ roleVisible: false })}
              onClose={() => dispatchers.setState({ roleVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...roleState.formItemLayout}
                value={roleState.roleFormData}
                onChange={value => dispatchers.setState({ roleFormData: value })}>
                  11111111111111111111111
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={roleState.roleLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={roleTableData} isTree primaryKey="id">
              <Table.Column title="操作" lock="right" width="160px" cell={RolePageRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{roleState.roleTotal}</span> 条 </div>
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default RolePage;
