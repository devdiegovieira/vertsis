
import React from "react";
import { useUrlId } from "../../../utils/hooks";

export default function SwitchPage(props) {

  const { 
    resource = '',
    list = <></>,
    detail = <></>
  } = props
  
  const hasDetail = useUrlId(window.location.pathname, resource)

  return hasDetail ? detail : list
}