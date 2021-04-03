import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Products from "../screens/Products/Products";
import ProductVariety from "../screens/Products/ProductVariety";
import ProductDetails from "../screens/Products/ProductDetails";

const Stack = createStackNavigator();

export default function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Products"
                    component={Products}
                    options={
                      {
                        title: "Productos"
                      }
                    }
      />
      <Stack.Screen name="ProductVariety"
                    component={ProductVariety}
                    options={
                      {
                        title: "Producto"
                      }
                    }
      />
      <Stack.Screen name="ProductDetails"
                    component={ProductDetails}
                    options={
                      {
                        title: "Detalle de Producto"
                      }
                    }
      />
    </Stack.Navigator>
  )
}