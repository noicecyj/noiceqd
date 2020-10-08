import React from 'react';
import { Form, Input } from '@alifd/next';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 6,
  },
  wrapperCol: {
    span: 40,
  },
}

function dataForm(props) {

  const { items } = props;

  const formItem = () => {
    items.map((item) => {
      return (
        <FormItem label={item.label} required={item.required} requiredMessage={item.requiredMessage}>
          <Input id={item.id} name={item.name} placeholder={item.placeholder} />
        </FormItem>);
    })
  };
  return (
    <Form style={{ width: '100%' }} {...formItemLayout}
      value={props.pagemenuFormData}
      onChange={value => props.dispatchers.setState({ pagemenuFormData: value })}>
      {formItem}
    </Form>
  );
}

export default dataForm;