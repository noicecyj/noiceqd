import { ResponsiveGrid, Button, Box, Dialog, Loading, Pagination } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/EntityName';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;

function EntityNamePage() {
  const [entityNameState, entityNameDispatchers] = pageStore.useModel('entityName');
  const entityName = pageStore.useModelDispatchers('entityName');

  const [entityState, entityDispatchers] = pageStore.useModel('entity');
  const entity = pageStore.useModelDispatchers('entity');

  useEffect(() => {
    entityNameDispatchers.entityNamePage(1);
    entityNameDispatchers.findDataFormByName('entityNameForm');
    entityNameDispatchers.findDataTableByName('entityNameTable');
    entityDispatchers.findDataFormByName('entityForm');
    entityDispatchers.findDataTableByName('entityTable');
  }, [entityNameDispatchers, entityDispatchers]);

  const entityNamePageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.chooseEntityFile(record) }> 生成后端代码 </Button>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.chooseFountEntityFile(record) }> 生成前端代码 </Button>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.entityNameEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.entityNameDelete({
        record,
        entityNameCurrent: entityNameState.entityNameCurrent,
      }) } warning> 删除 </Button>
    </div>;
  };

  const entityPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => entityDispatchers.upEntity({ record, entityCurrent: entityState.entityCurrent }) }> 上移 </Button>
      <Button type="primary" size="small" onClick={ () => entityDispatchers.downEntity({ record, entityCurrent: entityState.entityCurrent }) }> 下移 </Button>
      <Button type="primary" size="small" onClick={ () => entityDispatchers.entityEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => entityDispatchers.entityDelete({
        record,
        entityCurrent: entityState.entityCurrent,
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => entityNameDispatchers.entityNameEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ entityNameState.entityNameVisible } footer={ false }
              onClose={ () => entityName.setState({ entityNameVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple items={ entityNameState.entityNameForm }
                dispatchers={ value => entityNameDispatchers.setDataForm(value) }
                onOk={ () => entityNameDispatchers.entityNameSave({
                  entityNameFormData: entityNameState.entityNameFormData,
                  entityNameCurrent: entityNameState.entityNameCurrent,
                }) }
                formDataValue={ entityNameState.entityNameFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ entityNameState.entityNameLoadingVisible }>
            <DataTableTemple dataSource={ entityNameState.entityNameTableData }
              items={ entityNameState.entityNameTable }
              rowSelection={ {
                mode: 'single',
                onSelect: (selected, record) => {
                  entityDispatchers.onRowClick({ selected, record });
                },
              } }
              pageRender={ entityNamePageRender } />
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ entityNameState.entityNameTotal }</span> 条 </div>
              <Pagination onChange={ current => entityNameDispatchers.entityNamePage(current) }
                type="simple" pageSize={ 5 } total={ entityNameState.entityNameTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={ 12 } hidden={ entityState.divVisible }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => entityDispatchers.entityEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ entityState.entityVisible } footer={ false }
              onClose={ () => entity.setState({ entityVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple items={ entityState.entityForm }
                dispatchers={ value => entityDispatchers.setDataForm(value) }
                onOk={ () => entityDispatchers.entitySave({
                  entityFormData: entityState.entityFormData,
                  entityCurrent: entityState.entityCurrent,
                  entityNameId: entityState.entityNameId,
                }) }
                formDataValue={ entityState.entityFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ entityState.entityLoadingVisible }>
            <DataTableTemple dataSource={ entityState.entityTableData }
              items={ entityState.entityTable }
              pageRender={ entityPageRender } />
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ entityState.entityTotal }</span> 条 </div>
              <Pagination onChange={ current => entityDispatchers.entityPage({ id: entityState.entityNameId, current }) }
                type="simple" pageSize={ 5 } total={ entityState.entityTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default EntityNamePage;