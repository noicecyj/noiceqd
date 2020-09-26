import { Input, Select } from '@alifd/next';
import React, { useEffect, useState } from 'react';

function EditablePane(props) {
  const [editable, setEditable] = useState(false);
  const [cellTitle, setCellTitle] = useState(props.defaultTitle);
  const [selectValue, setSelectValue] = useState();

  useEffect(() => {
    setCellTitle(props.defaultTitle);
  }, [props.defaultTitle]);

  function onKeyDown(e) {
    const { keyCode } = e;
    if (keyCode > 36 && keyCode < 41) {
      e.stopPropagation();
    }
  }

  function onBlur(e) {
    setEditable(false);
    if (props.type === 'input') {
      setCellTitle(e.target.value);
      props.setEntityData(e.target.value, props.type);
    } else if (props.type === 'select') {
      if (selectValue) {
        setCellTitle(selectValue);
        props.setEntityData(selectValue, props.type);
      } else {
        setCellTitle(cellTitle);
        props.setEntityData(cellTitle, props.type);
      }
    }
  }

  function onDblClick() {
    setEditable(true);
  }

  function onChange(value) {
    setSelectValue(value);
  }

  if (editable) {
    if (props.type === 'input') {
      return <Input autoFocus defaultValue={cellTitle} onKeyDown={onKeyDown} onBlur={onBlur} size="small" />;
    } else if (props.type === 'select') {
      return <Select dataSource={props.data.DATA_TYPE} defaultValue={cellTitle}
        onKeyDown={onKeyDown} onBlur={onBlur} size="small" onChange={onChange} style={{ width: 200 }} />;
    }
  }
  return <span onDoubleClick={onDblClick}>{cellTitle}</span>;
}

export default EditablePane;
