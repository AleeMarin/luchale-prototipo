import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ListProducts from "../../components/Products/ListProducts";
import {Button, Icon, SearchBar} from "react-native-elements";
import Modal from "../../components/Modal";

export default function Shop(props) {
  const {navigation, route} = props;
  const {name, description, products, promotions, status} = route.params;
  const [filter, setFilter] = useState("");
  const [productsList, setProductsList] = useState(null);
  const [offersProductsList, setOffersProductsList] = useState(null);
  const [closeShopModal, setCloseShopModal] = useState(false);

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  useEffect(() => {
    let offersProducts = [];
    products.forEach(
      (product) => {
        if (product.offer) {
          offersProducts.push({...product, ...{shop: name}})
        }
      }
    )
    setOffersProductsList(offersProducts);
  }, []);

  useEffect(() => {
    setProductsList(null);
    let filterProducts = [];
    products.forEach(
      (product) => {
        if (product.name.includes(filter)) {
          filterProducts.push({...product, ...{shop: name}})
        }
      }
    )
    setProductsList(filterProducts);
  }, [filter])


  const goShopDetails = () => {
    navigation.push("ShopDetails", {name, description});
  };

  const goShopPromotions = () => {
    navigation.push("ShopPromotions", {promotions});
  };

  const goShopOccupation = () => {
    if (status === "Cerrado") {
      setCloseShopModal(true);
    }
  };

  return (
    <ScrollView style={styles.viewBody}
                centerContent={true}
    >
      <Image source={require("../../../assets/img/circle.png")}
             style={styles.image}
             resizeMode="contain"
      />
      <Text style={styles.title}>
        {name}
      </Text>
      <Text style={styles.info}
            onPress={goShopDetails}
      >
        Información del comercio
      </Text>
      <View style={styles.viewRow}>
        <TouchableOpacity style={styles.viewCol}
                          onPress={goShopPromotions}
        >
          <Image source={require("../../../assets/img/circle.png")}
                 style={styles.imageSection}
                 resizeMode="contain"
          />
          <Text style={styles.subtitle}>
            Promociones
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewCol}>
          <Image source={require("../../../assets/img/circle.png")}
                 style={styles.imageSection}
                 resizeMode="contain"
          />
          <Text style={styles.subtitle}>
            Solicitar turno
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewCol}
                          onPress={goShopOccupation}
        >
          <Image source={require("../../../assets/img/circle.png")}
                 style={styles.imageSection}
                 resizeMode="contain"
          />
          <Text style={styles.subtitle}>
            Ocupación
          </Text>
        </TouchableOpacity>
      </View>
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
      {
        filter === "" &&
        <>
          <Text style={styles.sectionTitle}>
            En oferta
          </Text>
          <ListProducts products={offersProductsList} screen={"shop"}/>
          <Text style={styles.sectionTitle}>
            Todos los productos
          </Text>
        </>
      }
      <ListProducts products={productsList} screen={"shop"}/>
      <Modal isVisible={closeShopModal} setIsVisible={setCloseShopModal}>
        <ScrollView style={styles.viewBody}>
          <Text style={styles.title}>
            En este momento, el comercio se encuentra cerrado
          </Text>
          <View style={styles.viewBtn}>
            <Button buttonStyle={styles.btn}
                    containerStyle={styles.containerBtn}
                    title="Aceptar"
                    onPress={() => setCloseShopModal(false)}
            />
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    margin: 10,
  },
  image: {
    height: 150,
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
  },
  info: {
    textAlign: "center",
    color: "#00a680",
  },
  viewRow: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 40,
  },
  viewCol: {
    flexDirection: "column",
    justifyContent: "center",
    width: "33.33%",
  },
  imageSection: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
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
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
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