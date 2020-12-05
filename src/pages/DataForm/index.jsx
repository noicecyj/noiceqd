import { ResponsiveGrid, Button, Table, Box, Dialog, Form, Loading, Pagination, Input } from '@alifd/next';
import React, { useEffect } from 'react';
import { store as pageStore } from 'ice/DataForm';
import DataFormTemple from '@/components/dataForm';
import DataTableTemple from '@/components/dataTable';
import styles from './index.module.scss';

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

function DataFormPage() {
  const [dataFormState, dataFormDispatchers] = pageStore.useModel('dataForm');
  const dataForm = pageStore.useModelDispatchers('dataForm');

  const [dataItemState, dataItemDispatchers] = pageStore.useModel('dataItem');
  const dataItem = pageStore.useModelDispatchers('dataItem');

  useEffect(() => {
    dataFormDispatchers.dataFormPage(1);
    dataFormDispatchers.findDataFormByName('dataFormForm');
    dataFormDispatchers.findDataTableByName('dataFormTable');
  }, [dataFormDispatchers]);

  const dataFormPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      {/* <=============================自定义组件 start =============================> */ }

      {/* <=============================自定义组件 end   =============================> */ }
      {/* <=============================可选组件 start =============================> */ }

      {/* <=============================可选组件 end   =============================> */ }
      <Button type="primary" size="small" onClick={ () => dataFormDispatchers.dataFormEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataFormDispatchers.dataFormDelete({
        record,
        dataFormCurrent: dataFormState.dataFormCurrent,
      }) } warning> 删除 </Button>
    </div>;
  };

  const dataItemPageRender = (value, index, record) => {
    return <div className={ styles.opt }>
      {/* <=============================自定义组件 start =============================> */ }

      {/* <=============================自定义组件 end   =============================> */ }
      {/* <=============================可选组件 start =============================> */ }

      {/* <=============================可选组件 end   =============================> */ }
      <Button type="primary" size="small" onClick={ () => dataItemDispatchers.dataItemEdit(record) }> 编辑 </Button>
      <Button type="primary" size="small" onClick={ () => dataItemDispatchers.dataItemDelete({
        record,
        dataItemCurrent: dataItemState.dataItemCurrent
      }) } warning> 删除 </Button>
    </div>;
  };

  return (
    <ResponsiveGrid gap={ 20 }>
      <Cell colSpan={ 12 }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataFormDispatchers.dataFormEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataFormState.dataFormVisible }
              onOk={ () => dataFormDispatchers.dataFormSave({
                dataFormFormData: dataFormState.dataFormFormData,
                dataFormCurrent: dataFormState.dataFormCurrent,
              }) }
              onCancel={ () => dataForm.setState({ dataFormVisible: false }) }
              onClose={ () => dataForm.setState({ dataFormVisible: false }) }
              style={ { width: '30%' } }>
              <DataFormTemple items={ dataFormState.dataFormDataForm }
                dispatchers={ value => dataFormDispatchers.setDataForm(value) }
                formDataValue={ dataFormState.dataFormFormData } />
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataFormState.dataFormLoadingVisible }>
            {/* <DataTableTemple items={ dataFormState.dataFormDataTable }
              pageRender={ dataFormPageRender }
              formTableValue={ dataFormState.dataFormTableData } /> */}
            <Table hasBorder className={ styles.Table } dataSource={ dataFormState.dataFormTableData }
              rowSelection={ {
                mode: 'single',
                onSelect: (selected, record) => {
                  dataItemDispatchers.onRowClick({ selected, record });
                },
              } } >
              {/* <=============================自定义表单 start =============================> */ }
              <Table.Column title="模板名称" dataIndex="dataFormName" key={ 1 } />
              <Table.Column title="模板类型" dataIndex="dataFormType" key={ 2 } />
              <Table.Column title="模板描述" dataIndex="description" key={ 3 } />
              <Table.Column title="排序代码" dataIndex="sortCode" key={ 4 } />
              <Table.Column title="操作" lock="right" width="160px" cell={ dataFormPageRender } />
              {/* <=============================自定义表单 end   =============================> */ }
            </Table>
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ dataFormState.dataFormTotal }</span> 条 </div>
              <Pagination onChange={ current => dataFormDispatchers.dataFormPage(current) }
                stype="simple" pageSize={ 5 } total={ dataFormState.dataFormTotal } />
            </Box>
          </Loading>
        </div>
      </Cell>
      <Cell colSpan={ 12 } hidden={ dataItemState.divVisible }>
        <div className={ styles.Main }>
          <div className={ styles.add }>
            <Button type="primary" onClick={ () => dataItemDispatchers.dataItemEdit() }> 添加菜单 </Button>
            <Dialog title="菜单" visible={ dataItemState.dataItemVisible }
              onOk={ () => dataItemDispatchers.dataItemSave({
                dataItemFormData: dataItemState.dataItemFormData,
                dataItemCurrent: dataItemState.dataItemCurrent,
                dataFormId: dataItemState.dataFormId,
              }) }
              onCancel={ () => dataItem.setState({ dataItemVisible: false }) }
              onClose={ () => dataItem.setState({ dataItemVisible: false }) }
              style={ { width: '30%' } }>
              <Form style={ { width: '100%' } } { ...dataItemState.formItemLayout }
                value={ dataItemState.dataItemFormData }
                onChange={ value => dataItem.setState({ dataItemFormData: value }) }>
                {/* <=============================自定义表单 start =============================> */ }
                <FormItem label="标签名称：" required requiredMessage="请输入标签名称">
                  <Input id="label" name="label" placeholder="请输入标签名称" />
                </FormItem>
                <FormItem label="字段名称：" required requiredMessage="请输入字段名称">
                  <Input id="name" name="name" placeholder="请输入字段名称" />
                </FormItem>
                <FormItem label="是否必输：">
                  <Input id="required" name="required" placeholder="请输入是否必输" />
                </FormItem>
                <FormItem label="字段类型：">
                  <Input id="type" name="type" placeholder="请输入字段类型" />
                </FormItem>
                <FormItem label="数据源：">
                  <Input id="dataSource" name="dataSource" placeholder="请输入字段类型" />
                </FormItem>
                <FormItem label="排序代码：" required requiredMessage="请选择排序代码">
                  <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
                </FormItem>
                {/* <=============================自定义表单 end   =============================> */ }
              </Form>
            </Dialog>
          </div>
          <Loading tip="加载中..." visible={ dataItemState.dataItemLoadingVisible }>
            <Table hasBorder className={ styles.Table } dataSource={ dataItemState.dataItemTableData }>
              {/* <=============================自定义表单 start =============================> */ }
              <Table.Column title="标签名称" dataIndex="label" key={ 1 } />
              <Table.Column title="字段名称" dataIndex="name" key={ 2 } />
              <Table.Column title="是否必输" dataIndex="required" key={ 3 } />
              <Table.Column title="字段类型" dataIndex="type" key={ 4 } />
              <Table.Column title="数据源" dataIndex="dataSource" key={ 5 } />
              <Table.Column title="排序代码" dataIndex="sortCode" key={ 6 } />
              <Table.Column title="操作" lock="right" width="160px" cell={ dataItemPageRender } />
              {/* <=============================自定义表单 end   =============================> */ }
            </Table>
            <Box margin={ [15, 0, 0, 0] } direction="row" align="center" justify="space-between">
              <div className={ styles.total }> 共 <span>{ dataItemState.dataItemTotal }</span> 条 </div>
            </Box>
            <Pagination onChange={ current => dataItemDispatchers.dataItemPage({ id: dataItemState.dataFormId, current }) }
              stype="simple" pageSize={ 5 } total={ dataItemState.dataItemTotal } />
          </Loading>
        </div>
      </Cell>
    </ResponsiveGrid >
  );
}

export default DataFormPage;