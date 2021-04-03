import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Shifts from "../screens/Shifts/Shifts";

const Stack = createStackNavigator();

export default function ShiftsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shifts"
                    component={Shifts}
                    options={
                      {
                        title: "Turnos"
                      }
                    }
      />
    </Stack.Navigator>
  )
}