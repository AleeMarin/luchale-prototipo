import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Basket from "../screens/Basket/Basket";

const Stack = createStackNavigator();

export default function BasketStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Basket"
                    component={Basket}
                    options={
                      {
                        title: "Mi lista"
                      }
                    }
      />
    </Stack.Navigator>
  )
}