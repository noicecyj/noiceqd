import { ResponsiveGrid, Button, Table, Pagination, Box, Dialog, Form, Input, Search, Loading } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/Dictionary';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function DictionaryPage() {
  const [dictionaryState, dictionaryDispatchers] = pageStore.useModel('dictionary');
  const dispatchers = pageStore.useModelDispatchers('dictionary');

  useEffect(() => {
    dictionaryDispatchers.catalogPageInfo(1);
  }, [dictionaryDispatchers]);

  const catalogRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => dictionaryDispatchers.editCatalog(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => dictionaryDispatchers.deleteCatalog({
        record,
        catalogCurrent: dictionaryState.catalogCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  const dictionaryRender = (value, index, record) => {
    return <div className={styles.opt}>
      <Button type="primary" size="small" onClick={() => dictionaryDispatchers.editDictionary(record)}> 编辑 </Button>
      <Button type="primary" size="small" onClick={() => dictionaryDispatchers.deleteDictionary({
        record,
        dictionaryCurrent: dictionaryState.dictionaryCurrent,
      })} warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => dictionaryDispatchers.editCatalog()}> 添加目录 </Button>
            <Search key="4" style={{ width: '400px', float: 'right' }}
              onSearch={value => dictionaryDispatchers.searchCatalog(value)} />
            <Dialog title="目录" visible={dictionaryState.catalogVisible}
              onOk={() => dictionaryDispatchers.saveCatalog({
                catalogFormData: dictionaryState.catalogFormData,
                catalogCurrent: dictionaryState.catalogCurrent,
              })}
              onCancel={() => dispatchers.setState({ catalogVisible: false })}
              onClose={() => dispatchers.setState({ catalogVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...dictionaryState.formItemLayout}
                value={dictionaryState.catalogFormData}
                onChange={value => dispatchers.setState({ catalogFormData: value })}>
                <FormItem label="目录名称:" required requiredMessage="请输入目录名称" >
                  <Input id="catalogName" name="catalogName" placeholder="请输入目录名称" />
                </FormItem>
                <FormItem label="目录代号:" required requiredMessage="请输入目录代号">
                  <Input id="catalogValue" name="catalogValue" placeholder="请输入目录代号" />
                </FormItem>
                <FormItem label="字典描述:">
                  <Input.TextArea id="description" name="description" placeholder="请输入目录描述" />
                </FormItem>
                <FormItem label="排序代码:" required requiredMessage="请输入排序代码">
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={dictionaryState.catalogLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={dictionaryState.catalogTableData}
              rowSelection={{
                mode: 'single',
                onSelect: (selected, record) => {
                  dictionaryDispatchers.onRowClick({ selected, record });
                },
              }} >
              <Table.Column title="目录名称" dataIndex="catalogName" key={1} width="200px" />
              <Table.Column title="目录代号" dataIndex="catalogValue" key={2} width="200px" />
              <Table.Column title="目录描述" dataIndex="description" key={3} />
              <Table.Column title="排序代码" dataIndex="sortCode" key={4} width="100px" />
              <Table.Column title="操作" lock="right" width="160px" cell={catalogRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{dictionaryState.catalogTotal}</span> 条 </div>
              <Pagination onChange={current => dictionaryDispatchers.catalogPageInfo(current)}
                stype="simple" pageSize={5} total={dictionaryState.catalogTotal} />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={12} hidden={dictionaryState.divVisible}>
        <div className={styles.Main}>
          <div className={styles.add}>
            <Button type="primary" onClick={() => dictionaryDispatchers.editDictionary()}> 添加字典 </Button>
            <Dialog title="字典" visible={dictionaryState.dictionaryVisible}
              onOk={() => dictionaryDispatchers.saveDictionary({
                dictionaryFormData: dictionaryState.dictionaryFormData,
                dictionaryCurrent: dictionaryState.dictionaryCurrent,
                dictionaryId: dictionaryState.dictionaryId,
              })}
              onCancel={() => dispatchers.setState({ dictionaryVisible: false })}
              onClose={() => dispatchers.setState({ dictionaryVisible: false })}
              style={{ width: '30%' }}>
              <Form style={{ width: '100%' }} {...dictionaryState.formItemLayout}
                value={dictionaryState.dictionaryFormData}
                onChange={value => dispatchers.setState({ dictionaryFormData: value })}>
                <FormItem label="键:" required requiredMessage="请输入目录名称" >
                  <Input id="dictionaryName" name="dictionaryName" placeholder="请输入目录名称" />
                </FormItem>
                <FormItem label="值:" required requiredMessage="请输入目录代号" >
                  <Input id="dictionaryValue" name="dictionaryValue" placeholder="请输入目录代号" />
                </FormItem>
                <FormItem label="排序代码:" required requiredMessage="请输入排序代码" >
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={dictionaryState.dictionaryLoadingVisible}>
            <Table hasBorder className={styles.Table} dataSource={dictionaryState.dictionaryTableData}>
              <Table.Column title="键" dataIndex="dictionaryName" key={1} />
              <Table.Column title="值" dataIndex="dictionaryValue" key={2} />
              <Table.Column title="排序代码" dataIndex="sortCode" key={3} width="100px" />
              <Table.Column title="操作" lock="right" width="160px" cell={dictionaryRender} />
            </Table>
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}> 共 <span>{dictionaryState.dictionaryTotal}</span> 条 </div>
              <Pagination onChange={current => dictionaryDispatchers.dictionaryPageInfo({ id: dictionaryState.dictionaryId, current })}
                type="simple" pageSize={5} total={dictionaryState.dictionaryTotal} />
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default DictionaryPage;
