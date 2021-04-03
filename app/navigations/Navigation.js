import React from "react";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MyAccountStack from "./MyAccountStack";
import ShopsStack from "./ShopsStack";
import ProductStack from "./ProductsStack";
import ShiftsStack from "./ShiftsStack";
import BasketStack from "./BasketStack";
import {Icon} from "react-native-elements";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        tabBarOptions={
          {
            activeTintColor: "#00a680",
            inactiveTintColor: "#666",
          }
        }
        screenOptions={
          ({route}) => ({
            tabBarIcon: ({color}) => screenOptions(route, color),
          })
        }
      >
        <Tab.Screen name="Shops"
                    component={ShopsStack}
                    options={
                      {
                        title: "Comercios"
                      }
                    }
        />
        <Tab.Screen name="Products"
                    component={ProductStack}
                    options={
                      {
                        title: "Productos"
                      }
                    }
        />
        <Tab.Screen name="Shifts"
                    component={ShiftsStack}
                    options={
                      {
                        title: "Turnos"
                      }
                    }
        />
        <Tab.Screen name="Basket"
                    component={BasketStack}
                    options={
                      {
                        title: "Mi lista"
                      }
                    }
        />
        <Tab.Screen name="MyAccount"
                    component={MyAccountStack}
                    options={
                      {
                        title: "Mi cuenta"
                      }
                    }
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "Shops":
      iconName = "store"
      break;
    case "Products":
      iconName = "basket"
      break;
    case "Shifts":
      iconName = "calendar-clock"
      break;
    case "Basket":
      iconName = "playlist-star"
      break;
    case "MyAccount":
      iconName = "account"
      break;
  }

  return (
    <Icon type="material-community"
          name={iconName}
          color={color}
    />
  )
}