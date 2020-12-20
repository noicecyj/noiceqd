import React from 'react';
import ReactJson from 'react-json-view'
import { Form, Input, Select } from '@alifd/next';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 40,
  },
};

function DataForm(props) {
  const { items, dispatchers, formDataValue } = props;
  return (
    <Form style={ { width: '100%' } } { ...formItemLayout }
      value={ formDataValue } onChange={ value => dispatchers(value) }>
      {items.map(item => {
        const obj = JSON.parse(item.jsonData);
        if (obj.type === 'Input' || obj.type == null) {
          if (obj.required === 'true') {
            return (
              <FormItem label={ `${obj.label}：` } required requiredMessage={ `请输入${obj.label}` } key={ item.id }>
                <Input id={ obj.name } name={ obj.name } placeholder={ `请输入${obj.label}` } defaultValue="" />
              </FormItem>);
          } else {
            return (
              <FormItem label={ `${obj.label}：` } key={ item.id }>
                <Input id={ obj.name } name={ obj.name } placeholder={ `请输入${obj.label}` } defaultValue="" />
              </FormItem>);
          }
        } else if (obj.type === 'Select') {
          if (obj.dataSource != null) {
            if (obj.required === 'true') {
              return (
                <FormItem label={ `${obj.label}：` } required requiredMessage={ `请输入${obj.label}` } key={ item.id }>
                  <Select id={ obj.name } name={ obj.name } placeholder={ `请输入${obj.label}` } filterLocal={ false }
                    dataSource={ obj.dataSource } style={ { width: 414 } } defaultValue="" />
                </FormItem>);
            } else {
              return (
                <FormItem label={ `${obj.label}：` } key={ item.id }>
                  <Select id={ obj.name } name={ obj.name } placeholder={ `请输入${obj.label}` } filterLocal={ false }
                    dataSource={ obj.dataSource } style={ { width: 414 } } defaultValue="" />
                </FormItem>);
            }
          } else {
            return (
              <FormItem label={ `${obj.label}：` } key={ item.id } requiredMessage={ `请输入${obj.label}` }>
                <Select id={ obj.name } name={ obj.name } placeholder={ `请输入${obj.label}` } filterLocal={ false }
                  dataSource={ obj.dataSource } style={ { width: 414 } } defaultValue="" />
              </FormItem>);
          }
        } else {
          return (
            <FormItem label={ `${obj.label}：` } key={ item.id }>
              <Input id={ obj.name } name={ obj.name } placeholder={ `请输入${obj.label}` } defaultValue="" />
            </FormItem>);
        }
      }) }
      <ReactJson src={ { 'qwret': 'asd' } } />
    </Form>
  );
}

export default DataForm;
