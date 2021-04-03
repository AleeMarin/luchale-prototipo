import React, {useEffect, useState} from "react";
import ListProducts from "../../components/Products/ListProducts";
import {shopsData} from "../../utils/ShopsData";
import {StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../components/Loading";
import {useFocusEffect} from '@react-navigation/native';

export default function Basket() {
  const [basketList, setBasketList] = useState([]);
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getUser()
        .then(
          (value) => {
            setUser(value);
          }
        );
    }, [])
  );


  const getUser = async () => {
    try {
      const username = await AsyncStorage.getItem("user_logged");
      if (username) {
        const user_json = await AsyncStorage.getItem(username);
        if (user_json) {
          return JSON.parse(user_json);
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  useEffect(() => {
    if (user) {
      let listBasket = [];
      user.basket.forEach(
        (productShop) => {
          shopsData.forEach(
            (shop) => {
              if (productShop.includes(shop.name)) {
                let product_name = productShop.split(shop.name)[0];
                shop.products.forEach(
                  (product) => {
                    if (product.name === product_name) {
                      listBasket.push({...product, ...{shop: shop.name}});
                    }
                  }
                )
              }
            }
          )
        }
      )
      return setBasketList(listBasket);
    }
  }, [user]);

  if (user === null) return <Loading isVisible={true} text="Cargando"/>

  return user ?
    (
      <ListProducts products={basketList} screen="basket"/>
    ) : (
      <View style={styles.viewBody}>
        <Text style={styles.title}>
          Debes ingresar con tu cuenta para ver los ítems de tu lista
        </Text>
      </View>
    )
}

const styles = StyleSheet.create({
  viewBody: {
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
  },
  iconSuscription: {
    marginLeft: 10,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#00a680",
  },
  containerBtn: {
    width: "70%",
  }
});