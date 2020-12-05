import React from 'react';
import { Table } from '@alifd/next';
import styles from './index.module.scss';

function DataTable(props) {
  const { items, pageRender, formTableValue } = props;
  console.log(items);
  return (
    <Table hasBorder className={ styles.Table } dataSource={ formTableValue }>
      {items.map((item, index) => {
        return <Table.Column title={ item.label } dataIndex={ item.name } key={ index } />;
      }) }
      <Table.Column title="操作" lock="right" width="160px" cell={ pageRender } />
    </Table>
  );
}

export default DataTable;
