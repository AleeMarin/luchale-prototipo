import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import MyAccount from "../screens/MyAccount/MyAccount";
import Login from "../screens/MyAccount/Login";

const Stack = createStackNavigator();

export default function MyAccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyAccount"
                    component={MyAccount}
                    options={
                      {
                        title: "Mi cuenta"
                      }
                    }
      />
      <Stack.Screen name="Login"
                    component={Login}
                    options={
                      {
                        title: "Ingresar"
                      }
                    }
      />
    </Stack.Navigator>
  )
}