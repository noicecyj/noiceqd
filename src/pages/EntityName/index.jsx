import { ResponsiveGrid, Button, Dialog, Loading, Form, Checkbox } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/EntityName';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;
const { Group: CheckboxGroup } = Checkbox;

function EntityNamePage() {
  const [entityNameState, entityNameDispatchers] = pageStore.useModel('entityName');
  const entityName = pageStore.useModelDispatchers('entityName');

  const [entityState, entityDispatchers] = pageStore.useModel('entity');
  const entity = pageStore.useModelDispatchers('entity');

  useEffect(() => {
    entityNameDispatchers.findDataTableAndFormByName();
    entityNameDispatchers.findCatalogByValue('LEVEL_ENTITY_TYPE');
    entityNameDispatchers.findCatalogByValue('LEVEL_ENTITY_TYPE_FOUNT');
  }, [entityNameDispatchers]);

  const entityNamePageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.chooseEntityFile(record) }> 生成后端代码 </Button>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.chooseFountEntityFile(record) }> 生成前端代码 </Button>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.entityNameEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => entityNameDispatchers.entityNameDelete({
        record,
        entityNameCurrent: entityNameState.entityNameCurrent,
        entityNameTable: entityNameState.entityNameTable,
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
        entityTable: entityState.entityTable,
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
                  entityNameTable: entityNameState.entityNameTable,
                }) }
                formDataValue={ entityNameState.entityNameFormData } />
            </Dialog>
            <Dialog title="选择生成类" visible={ entityNameState.chooseVisible }
              onOk={ () => entityNameDispatchers.createEntityFile({
                ...entityNameState.chooseFormData,
                ...entityNameState.entityNameFormData,
                entityNameCurrent: entityNameState.entityNameCurrent,
              }) }
              onCancel={ () => entityName.setState({ chooseVisible: false }) }
              onClose={ () => entityName.setState({ chooseVisible: false }) }
              style={ { width: '30%' } }>
              <Form style={ { width: '100%' } } { ...entityNameState.formItemLayout }
                value={ entityNameState.chooseFormData }
                onChange={ value => entityName.setState({ chooseFormData: value }) }>
                <FormItem label="选择生成：" required requiredMessage="请选择生成类" >
                  <CheckboxGroup dataSource={ entityNameState.LEVEL_ENTITY_TYPE } itemDirection="ver" id="choose" name="choose" />
                </FormItem>
              </Form>
            </Dialog>
            <Dialog title="选择生成类" visible={ entityNameState.chooseFountVisible }
              onOk={ () => entityNameDispatchers.createComponentFile({
                ...entityNameState.chooseFountFormData,
                ...entityNameState.entityNameFormData,
                entityNameCurrent: entityNameState.entityNameCurrent,
              }) }
              onCancel={ () => entityName.setState({ chooseFountVisible: false }) }
              onClose={ () => entityName.setState({ chooseFountVisible: false }) }
              style={ { width: '30%' } }>
              <Form style={ { width: '100%' } } { ...entityNameState.formItemLayout }
                value={ entityNameState.chooseFountFormData }
                onChange={ value => entityName.setState({ chooseFountFormData: value }) }>
                <FormItem label="选择生成：" required requiredMessage="请选择生成类" >
                  <CheckboxGroup dataSource={ entityNameState.LEVEL_ENTITY_TYPE_FOUNT } itemDirection="ver" id="choose" name="choose" />
                </FormItem>
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ entityNameState.entityNameLoadingVisible }>
            <DataTableTemple dataSource={ entityNameState.entityNameTableData }
              items={ entityNameState.entityNameTable }
              total={ entityNameState.entityNameTotal }
              getPage={ current => entityNameDispatchers.entityNamePage({ current, entityNameTable: entityNameState.entityNameTable, }) }
              rowSelection={ {
                mode: 'single',
                onSelect: (selected, record) => {
                  entityDispatchers.onRowClick({ selected, record });
                },
              } }
              pageRender={ entityNamePageRender } />
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
              <DataFormTemple
                items={ entityState.entityForm }
                dispatchers={ value => entityDispatchers.setDataForm(value) }
                onOk={ () => entityDispatchers.entitySave({
                  entityFormData: entityState.entityFormData,
                  entityCurrent: entityState.entityCurrent,
                  entityTable: entityState.entityTable,
                  entityNameId: entityState.entityNameId,
                }) }
                formDataValue={ entityState.entityFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ entityState.entityLoadingVisible }>
            <DataTableTemple dataSource={ entityState.entityTableData }
              items={ entityState.entityTable }
              total={ entityState.entityTotal }
              getPage={ current => entityDispatchers.entityPage({ id: entityState.entityNameId, current }) }
              pageRender={ entityPageRender }
              className={ styles.Table } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid>
  );
}

export default EntityNamePage;