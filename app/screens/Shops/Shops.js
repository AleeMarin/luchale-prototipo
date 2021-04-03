import React, {useState} from "react";
import ListShops from "../../components/Shops/ListShops";
import {shopsData} from "../../utils/ShopsData";

export default function Shops() {
  const [shops, setShops] = useState(shopsData);

  return (
    <ListShops shops={shops}/>
  )
}