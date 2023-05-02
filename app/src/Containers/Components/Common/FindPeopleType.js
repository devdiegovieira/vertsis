import { App, Select } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../../api";

export default function FindPeopleType(props) {
  const [accessTypes, setAccessTypes] = useState([]);
  const { notification } = App.useApp();

  const { onPeopleTypeChange = () => { }, concierge = false, ...others } = props;

  const find = (filter = '') => {
    axios.get(`access-type`, {
      params: {
        search: filter,
        concierge
      }
    })
      .then((data) => {
        setAccessTypes(data);
      })
      .catch((err) => {
        notification.error({
          message: `Erro`,
          description: err,
          placement: 'bottomLeft',
        });
      });
  }

  useEffect(() => {
    find()
  }, [])


  return <Select
    filterOption={false}
    allowClear
    showSearch
    autoFocus
    options={accessTypes.map(m => {
      return {
        value: m._id,
        label: m.name
      }
    })}
    onSearch={(e) => {
      find(e)
    }}
    {...others}
    onChange={(e) => {
      onPeopleTypeChange(accessTypes.find(f => f._id == e))
      others.onChange(e)
    }}
  />
};