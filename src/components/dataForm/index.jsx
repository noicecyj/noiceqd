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
        const obj = JSON.parse(item.jsonData);
        if (obj.type === 'Input' || obj.type == null) {
          if (obj.required === 'true') {
            return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
              <Input id={ obj.name } name={ obj.name } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <Input id={ obj.name } name={ obj.name } />
            </FormItem>);
          }
        } else if (obj.type === 'Select') {
          if (obj.dataSource != null) {
            if (obj.required === 'true') {
              return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
                <Select id={ obj.name } name={ obj.name } filterLocal={ false } dataSource={ obj.dataSource } style={ { width: 414 } } />
              </FormItem>);
            } else {
              return (<FormItem label={ `${obj.label}：` } key={ item.id }>
                <Select id={ obj.name } name={ obj.name } filterLocal={ false } dataSource={ obj.dataSource } style={ { width: 414 } } />
              </FormItem>);
            }
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <Select id={ obj.name } name={ obj.name } filterLocal={ false } dataSource={ obj.dataSource } style={ { width: 414 } } />
            </FormItem>);
          }
        } else if (obj.type === 'ReactJson') {
          let jsonObj = {};
          if (formDataValue.jsonData) {
            jsonObj = JSON.parse(formDataValue.jsonData);
          }
          return (<ReactJson src={ jsonObj } name={ obj.name } key={ item.id }
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
        } else if (obj.type === 'NumberPicker' || obj.type == null) {
          if (obj.required === 'true') {
            return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
              <NumberPicker id={ obj.name } name={ obj.name } min={ 1 } max={ 10 } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <NumberPicker id={ obj.name } name={ obj.name } min={ 1 } max={ 10 } />
            </FormItem>);
          }
        } else if (obj.type === 'Switch' || obj.type == null) {
          if (obj.required === 'true') {
            return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
              <Switch id={ obj.name } name={ obj.name } defaultChecked />
            </FormItem>);
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <Switch id={ obj.name } name={ obj.name } defaultChecked />
            </FormItem>);
          }
        } else if (obj.type === 'Range' || obj.type == null) {
          if (obj.required === 'true') {
            return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
              <Range id={ obj.name } name={ obj.name } defaultValue={ 0 } scales={ [0, 100] } marks={ [0, 100] } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <Range id={ obj.name } name={ obj.name } defaultValue={ 0 } scales={ [0, 100] } marks={ [0, 100] } />
            </FormItem>);
          }
        } else if (obj.type === 'DatePicker' || obj.type == null) {
          if (obj.required === 'true') {
            return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
              <DatePicker id={ obj.name } name={ obj.name } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <DatePicker id={ obj.name } name={ obj.name } />
            </FormItem>);
          }
        } else if (obj.type === 'RangePicker' || obj.type == null) {
          if (obj.required === 'true') {
            return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
              <RangePicker id={ obj.name } name={ obj.name } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <RangePicker id={ obj.name } name={ obj.name } />
            </FormItem>);
          }
        } else if (obj.type === 'TimePicker' || obj.type == null) {
          if (obj.required === 'true') {
            return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
              <TimePicker id={ obj.name } name={ obj.name } />
            </FormItem>);
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <TimePicker id={ obj.name } name={ obj.name } />
            </FormItem>);
          }
        } else if (obj.type === 'Checkbox' || obj.type == null) {
          if (obj.required === 'true') {
            return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
              <CheckboxGroup id={ obj.name } name={ obj.name } dataSource={ obj.dataSource } itemDirection="ver" />
            </FormItem>);
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <CheckboxGroup id={ obj.name } name={ obj.name } dataSource={ obj.dataSource } itemDirection="ver" />
            </FormItem>);
          }
        } else if (obj.type === 'Radio' || obj.type == null) {
          if (obj.required === 'true') {
            return (<FormItem label={ `${obj.label}：` } required key={ item.id }>
              <RadioGroup id={ obj.name } name={ obj.name } dataSource={ obj.dataSource } itemDirection="ver" />
            </FormItem>);
          } else {
            return (<FormItem label={ `${obj.label}：` } key={ item.id }>
              <RadioGroup id={ obj.name } name={ obj.name } dataSource={ obj.dataSource } itemDirection="ver" />
            </FormItem>);
          }
        } else {
          return (
            <FormItem label={ `${obj.label}：` } key={ item.id }>
              <Input id={ obj.name } name={ obj.name } />
            </FormItem>);
        }
      }) }
      <FormItem >
        <Form.Submit validate type="primary"
          onClick={ (v, e) => {
            console.log(v, e);
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
