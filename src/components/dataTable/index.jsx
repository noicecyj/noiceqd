import React, { useEffect } from 'react';
import { Table, Box, Pagination } from '@alifd/next';
import { store } from 'ice';
import styles from './index.module.scss';

function DataTable(props) {
  const [dictionaryState, dictionaryDispatchers] = store.useModel('dictionary');
  const { items, pageRender, dataSource, rowSelection, total, getPage, dispatchers } = props;
  useEffect(() => {
    if (items.length !== 0 && dataSource.length !== 0) {
      dictionaryDispatchers.findTableCatalogByValue({ dataSource, items, dispatchers });
    }
  }, [dictionaryDispatchers, dataSource, items, dispatchers]);
  return (
    <div>
      <Table hasBorder className={ styles.Table } dataSource={ dataSource } rowSelection={ rowSelection } >
        { items.length === 0 ? null : items.map((item, index) => {
          const obj = JSON.parse(item.jsonData);
          return <Table.Column title={ obj.title } dataIndex={ obj.dataIndex } key={ index } />;
        }) }
        <Table.Column title="排序代码" dataIndex="sortCode" key="sortCode" width="100px" />
        <Table.Column title="操作" lock="right" width="400px" align="right" cell={ pageRender } />
      </Table>
      <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
        <div className={ styles.total }> 共 <span>{ total }</span> 条 </div>
        <Pagination onChange={ current => getPage(current) }
          type="simple" pageSize={ 5 } total={ total } />
      </Box>
    </div>

  );
}

export default DataTable;
