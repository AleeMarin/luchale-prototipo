import React from "react";
import ListPromotions from "../../components/Shops/ListPromotions";

export default function ShopPromotions(props) {
  const {route} = props;
  const {promotions} = route.params;

  return (
    <ListPromotions promotions={promotions}/>
  )
}