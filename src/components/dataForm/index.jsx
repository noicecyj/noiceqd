import React from 'react';
import { Form, Input, Select } from '@alifd/next';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 40,
  },
}

function DataForm(props) {

  const { items, dispatchers, formDataValue } = props;
  console.log(items);
  return (
    <Form style={ { width: '100%' } } { ...formItemLayout }
      value={ formDataValue } onChange={ value => dispatchers(value) }>
      {items.map(item => {
        if (item.type === 'Input') {
          if (item.required === 'true') {
            return (
              <FormItem label={ `${item.label}：` } required requiredMessage={ `请输入${item.label}` } key={ item.id }>
                <Input id={ item.name } name={ item.name } placeholder={ `请输入${item.label}` } defaultValue="" />
              </FormItem>);
          } else {
            return (
              <FormItem label={ `${item.label}：` } key={ item.id }>
                <Input id={ item.name } name={ item.name } defaultValue="" />
              </FormItem>);
          }
        } else if (item.type === 'Select') {
          if (item.dataSource != null) {
            if (item.required === 'true') {
              return (
                <FormItem label={ `${item.label}：` } required requiredMessage={ `请输入${item.label}` } key={ item.id }>
                  <Select id={ item.name } name={ item.name } placeholder={ `请输入${item.label}` } dataSource={ item.dataSource } style={ { width: 414 } } defaultValue="" />
                </FormItem>);
            } else {
              return (
                <FormItem label={ `${item.label}：` } key={ item.id }>
                  <Select id={ item.name } name={ item.name } dataSource={ item.dataSource } style={ { width: 414 } } defaultValue="" />
                </FormItem>);
            }
          } else {
            return (
              <FormItem label={ `${item.label}：` } key={ item.id }>
                <Select id={ item.name } name={ item.name } dataSource={ item.dataSource } style={ { width: 414 } } defaultValue="" />
              </FormItem>);
          }
        } else {
          return (
            <FormItem label={ `${item.label}：` } key={ item.id }>
              <Input id={ item.name } name={ item.name } defaultValue="" />
            </FormItem>);
        }
      }) }
    </Form>
  );
}

export default DataForm;