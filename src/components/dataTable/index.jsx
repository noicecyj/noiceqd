import React from 'react';
import { Table } from '@alifd/next';
import styles from './index.module.scss';

function DataTable(props) {
  const { items, pageRender, dataSource, rowSelection } = props;

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
    </div>

  );
}

export default DataTable;
