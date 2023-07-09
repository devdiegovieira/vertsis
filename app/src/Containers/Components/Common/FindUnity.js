import { App, Select } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../../../api";

export default function FindUnity(props) {
  const [units, setUnits] = useState([]);
  const { notification } = App.useApp();

  const { onUnityChange = () => { }, ...others } = props;

  const find = (filter = '') => {
    axios.get(`unity/`, {
      params: {
        search: filter
      }
    })
      .then((data) => {
        setUnits(data);
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
    options={units.map(m => {
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
      onUnityChange(units.find(f => f._id == e))
      others.onChange(e)
    }}
  />;
};