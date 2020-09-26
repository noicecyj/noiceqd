import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Input, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/User';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function UserPage() {
  const [userState, userDispatchers] = pageStore.useModel('user');
  const dispatchers = pageStore.useModelDispatchers('user');
  const userTableData = JSON.parse(JSON.stringify(userState.userTableData));

  useEffect(() => {
    userDispatchers.userPage(1);
  }, [userDispatchers]);

  const UserPageRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => userDispatchers.userEdit(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => userDispatchers.userDelete({
        record,
        userCurrent: userState.userCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => userDispatchers.userEdit()}> 添加菜单 </Button>
            <Dialog title="菜单" visible={userState.userVisible}
              onOk={() => userDispatchers.saveuser({
                userFormData: userState.userFormData,
              })}
              onCancel={() => dispatchers.setState({ userVisible: false })}
              onClose={() => dispatchers.setState({ userVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...userState.formItemLayout}
                value={userState.userFormData}
                onChange={value => dispatchers.setState({ userFormData: value })}>
                  11111111111111111111111
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={userState.userLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={userTableData} isTree primaryKey="id">
              <Table.Column title="操作" lock="right" width="160px" cell={UserPageRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{userState.userTotal}</span> 条 </div>
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default UserPage;
