import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import Loading from "../Loading";
import ProductItem from "./ProductItem";

export default function ListProducts(props) {
  const {products, screen} = props;

  return (
    <>
      {
        products === null ? <Loading isVisible={true} text="Cargando..."/> :
          products.length > 0 ? (
            <FlatList
              data={products}
              renderItem={
                (product) => (
                  <ProductItem product={product} screen={screen}/>
                )
              }
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={styles.viewBody}>
              <Text style={styles.title}>
                No hay productos
              </Text>
            </View>
          )
      }
    </>
  );
}

const styles = StyleSheet.create({
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
