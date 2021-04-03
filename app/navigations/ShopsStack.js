import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Shops from "../screens/Shops/Shops";
import Shop from "../screens/Shops/Shop";
import ShopDetails from "../screens/Shops/ShopDetails";
import ShopPromotions from "../screens/Shops/ShopPromotions";

const Stack = createStackNavigator();

export default function ShopsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shops"
                    component={Shops}
                    options={
                      {
                        title: "Comercios"
                      }
                    }
      />
      <Stack.Screen name="ViewShop"
                    component={Shop}
                    options={
                      {
                        title: "Ver comercio"
                      }
                    }
      />
      <Stack.Screen name="ShopDetails"
                    component={ShopDetails}
                    options={
                      {
                        title: "Información del comercio"
                      }
                    }
      />
      <Stack.Screen name="ShopPromotions"
                    component={ShopPromotions}
                    options={
                      {
                        title: "Promociones del comercio"
                      }
                    }
      />
    </Stack.Navigator>
  )
}