import React, {useEffect, useState} from "react";
import ListProducts from "../../components/Products/ListProducts";
import {shopsData} from "../../utils/ShopsData";
import {Icon, SearchBar} from "react-native-elements";
import {StyleSheet, View} from "react-native";

export default function Products() {
  const getProductsList = () => {
    let productsList = [];
    shopsData.forEach(
      (shop) => {
        shop.products.forEach(
          (product) => {
            productsList.push(product.name);
          }
        )
      }
    )
    productsList = [...new Set(productsList)];
    let orderedProductsList = productsList.sort();
    productsList = [];
    orderedProductsList.forEach(
      (name) => {
        productsList.push({name: name});
      }
    )
    return productsList;
  };
  const products = getProductsList();
  const [filter, setFilter] = useState("");
  const [productsList, setProductsList] = useState(null);

  useEffect(() => {
    setProductsList(null);
    if (filter) {
      let filterProducts = [];
      products.forEach(
        (product) => {
          if (product.name.includes(filter)) {
            filterProducts.push(product)
          }
        }
      )
      setProductsList(filterProducts);
    } else {
      setProductsList(products);
    }
  }, [filter]);


  return (
    <View style={styles.viewBody}>
      <SearchBar placeholder="Buscar producto"
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
      <ListProducts products={productsList} screen="main"/>
    </View>
  )
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
});