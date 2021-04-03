import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import Loading from "../Loading";
import ShopItem from "./ShopItem";
import {Icon, SearchBar} from 'react-native-elements';

export default function ListShops(props) {
  const {shops} = props;
  const [filter, setFilter] = useState("");
  const [shopsList, setShopsList] = useState(null);

  useEffect(() => {
    setShopsList(null);
    if (filter) {
      let filterShops = [];
      shops.forEach(
        (shop) => {
          if (shop.name.includes(filter)) {
            filterShops.push(shop)
          }
        }
      )
      setShopsList(filterShops);
    } else {
      setShopsList(shops);
    }
  }, [filter])

  return (
    <View style={styles.viewBody}>
      <SearchBar placeholder="Buscar comercio"
                 placeholderTextColor="#999"
                 onChangeText={(value) => setFilter(value)}
                 value={filter}
                 lightTheme={true}
                 round={true}
                 clearIcon={
                   <Icon type="material-community"
                         name="close-circle"
                         iconStyle={styles.clearIcon}
                         onPress={() => setFilter("")}
                   />
                 }
                 containerStyle={styles.searchContainer}
                 inputContainerStyle={styles.searchInputContainer}
                 inputStyle={styles.searchInput}
      />
      {
        shopsList === null ? <Loading isVisible={true} text="Cargando..."/> :
          shopsList.length > 0 ? (
            <FlatList
              data={shopsList}
              renderItem={
                (shop) => (
                  <ShopItem shop={shop}/>
                )
              }
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={styles.viewBody}>
              <Text style={styles.title}>
                No hay comercios
              </Text>
            </View>
          )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  clearIcon: {
    color: "#999",
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginBottom: 20,
  },
  searchInputContainer: {
    backgroundColor: "#eee",
  },
  searchInput: {
    color: "#000",
  },
  viewBody: {
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
