import React from 'react';
import ReactJson from 'react-json-view'
import { Form, Input, Select, NumberPicker, Switch, Range, DatePicker, TimePicker, Checkbox, Radio } from '@alifd/next';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 40,
  },
};

function DataForm(props) {

  const { items, dispatchers, onOk, formDataValue } = props;

  return (
    <Form style={ { width: '100%' } } { ...formItemLayout }
      value={ formDataValue } onChange={ value => dispatchers(value) }>
      {items.map(item => {
        if (item.type === 'Input' || item.type == null) {
          if (item.required === 'true') {
            return (<FormItem label={ `${item.label}：` } required key={ item.id }>
              <Input id={ item.name } name={ item.name } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <Input id={ item.name } name={ item.name } />
            </FormItem>);
          }
        } else if (item.type === 'Select') {
          if (item.dataSource != null) {
            if (item.required === 'true') {
              return (<FormItem label={ `${item.label}：` } required key={ item.id }>
                <Select id={ item.name } name={ item.name }
                  filterLocal={ false } dataSource={ item.dataSource }
                  style={ { width: 414 } } mode={ item.mode }
                  defaultValue={ item.defaultValue != null ? item.defaultValue : null } />
              </FormItem>);
            } else {
              return (<FormItem label={ `${item.label}：` } key={ item.id }>
                <Select id={ item.name } name={ item.name }
                  filterLocal={ false } dataSource={ item.dataSource }
                  style={ { width: 414 } } mode={ item.mode }
                  defaultValue={ item.defaultValue != null ? item.defaultValue : null } />
              </FormItem>);
            }
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <Select id={ item.name } name={ item.name }
                filterLocal={ false } style={ { width: 414 } } mode={ item.mode }
                defaultValue={ item.defaultValue != null ? item.defaultValue : null } />
            </FormItem>);
          }
        } else if (item.type === 'ReactJson') {
          let jsonObj = {};
          if (formDataValue.jsonData) {
            jsonObj = JSON.parse(formDataValue.jsonData);
          }
          return (<ReactJson src={ jsonObj } name={ item.name } key={ item.id }
            onAdd={ (add) => {
              dispatchers({ ...formDataValue, jsonData: JSON.stringify(add.updated_src) });
            } }
            onEdit={ (edit) => {
              dispatchers({ ...formDataValue, jsonData: JSON.stringify(edit.updated_src) });
            } }
            onDelete={ (deleteCont) => {
              dispatchers({ ...formDataValue, jsonData: JSON.stringify(deleteCont.updated_src) });
            } }
          />);
        } else if (item.type === 'NumberPicker' || item.type == null) {
          if (item.required === 'true') {
            return (<FormItem label={ `${item.label}：` } required key={ item.id }>
              <NumberPicker id={ item.name } name={ item.name } min={ 1 } max={ 10 } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <NumberPicker id={ item.name } name={ item.name } min={ 1 } max={ 10 } />
            </FormItem>);
          }
        } else if (item.type === 'Switch' || item.type == null) {
          if (item.required === 'true') {
            return (<FormItem label={ `${item.label}：` } required key={ item.id }>
              <Switch id={ item.name } name={ item.name } defaultChecked />
            </FormItem>);
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <Switch id={ item.name } name={ item.name } defaultChecked />
            </FormItem>);
          }
        } else if (item.type === 'Range' || item.type == null) {
          if (item.required === 'true') {
            return (<FormItem label={ `${item.label}：` } required key={ item.id }>
              <Range id={ item.name } name={ item.name } defaultValue={ 0 } scales={ [0, 100] } marks={ [0, 100] } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <Range id={ item.name } name={ item.name } defaultValue={ 0 } scales={ [0, 100] } marks={ [0, 100] } />
            </FormItem>);
          }
        } else if (item.type === 'DatePicker' || item.type == null) {
          if (item.required === 'true') {
            return (<FormItem label={ `${item.label}：` } required key={ item.id }>
              <DatePicker id={ item.name } name={ item.name } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <DatePicker id={ item.name } name={ item.name } />
            </FormItem>);
          }
        } else if (item.type === 'RangePicker' || item.type == null) {
          if (item.required === 'true') {
            return (<FormItem label={ `${item.label}：` } required key={ item.id }>
              <RangePicker id={ item.name } name={ item.name } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <RangePicker id={ item.name } name={ item.name } />
            </FormItem>);
          }
        } else if (item.type === 'TimePicker' || item.type == null) {
          if (item.required === 'true') {
            return (<FormItem label={ `${item.label}：` } required key={ item.id }>
              <TimePicker id={ item.name } name={ item.name } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <TimePicker id={ item.name } name={ item.name } />
            </FormItem>);
          }
        } else if (item.type === 'Checkbox' || item.type == null) {
          if (item.required === 'true') {
            return (<FormItem label={ `${item.label}：` } required key={ item.id }>
              <CheckboxGroup id={ item.name } name={ item.name } dataSource={ item.dataSource } itemDirection={ item.itemDirection } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <CheckboxGroup id={ item.name } name={ item.name } dataSource={ item.dataSource } itemDirection={ item.itemDirection } />
            </FormItem>);
          }
        } else if (item.type === 'Radio' || item.type == null) {
          if (item.required === 'true') {
            return (<FormItem label={ `${item.label}：` } required key={ item.id }>
              <RadioGroup id={ item.name } name={ item.name } dataSource={ item.dataSource } itemDirection={ item.itemDirection } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${item.label}：` } key={ item.id }>
              <RadioGroup id={ item.name } name={ item.name } dataSource={ item.dataSource } itemDirection={ item.itemDirection } />
            </FormItem>);
          }
        } else {
          return (
            <FormItem label={ `${item.label}：` } key={ item.id }>
              <Input id={ item.name } name={ item.name } />
            </FormItem>);
        }
      }) }
      <FormItem label="排序代码：" required requiredMessage="请输入排序代码" >
        <Input id="sortCode" name="sortCode" placeholder="请输入排序代码" />
      </FormItem>
      <FormItem >
        <Form.Submit validate type="primary"
          onClick={ (v, e) => {
            if (e == null) {
              onOk();
            }
          } }
          style={ { marginRight: 10 } }>确定</Form.Submit>
        <Form.Reset >重置</Form.Reset>
      </FormItem>
    </Form>
  );
}

export default DataForm;
