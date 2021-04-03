import React, {useEffect, useRef, useState} from "react";
import ListProducts from "../../components/Products/ListProducts";
import {shopsData} from "../../utils/ShopsData";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button, Icon} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "../../components/Modal";
import Toast from "react-native-easy-toast";
import {useFocusEffect} from "@react-navigation/native";

export default function ProductVariety(props) {
  const toastRef = useRef();
  const {navigation, route} = props;
  const {name} = route.params;
  const getProductsList = () => {
    let productsList = [];
    shopsData.forEach(
      (shop) => {
        shop.products.forEach(
          (product) => {
            if (product.name === name) {
              productsList.push({...product, ...{shop: shop.name}});
            }
          }
        )
      }
    )
    return productsList;
  };
  const [products, setProducts] = useState(getProductsList());
  const [offersProductsList, setOffersProductsList] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [user, setUser] = useState(null);
  const [requiredLoginModal, setRequiredLoginModal] = useState(false);

  useEffect(() => {
    if (products) {
      let filterProducts = [];
      products.forEach(
        (product) => {
          if (product.offer) {
            filterProducts.push(product)
          }
        }
      )
      setOffersProductsList(filterProducts);
    } else {
      setOffersProductsList([]);
    }
  }, [products])


  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

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

  const subscribe = () => {
    if (user) {
      setUser({...user, ...{subscriptions: [...user.subscriptions, name]}});
      saveUser({...user, ...{subscriptions: [...user.subscriptions, name]}}).then(
        (value) => {
          if (value) {
            toastRef.current.show(`Notificaciones para ofertas de ${name} activadas`, 2000)
          } else {
            toastRef.current.show("Error al activar las notificaciones", 2000)
          }
        }
      );
    } else {
      setRequiredLoginModal(true);
    }
  };

  const unsubscribe = () => {
    setUser({
      ...user, ...{
        subscriptions: user.subscriptions.filter((item) => {
          return item !== name
        })
      }
    });
    saveUser({
      ...user, ...{
        subscriptions: user.subscriptions.filter((item) => {
          return item !== name
        })
      }
    }).then(
      (value) => {
        if (value) {
          toastRef.current.show(`Notificaciones para ofertas de ${name} desactivadas`, 2000)
        } else {
          toastRef.current.show("Error al desactivar las notificaciones", 2000)
        }
      }
    );
  }

  const saveUser = async (user_object) => {
    try {
      await AsyncStorage.setItem(user.username, JSON.stringify(user_object));
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      if (user.subscriptions.length) {
        user.subscriptions.forEach(
          (subscription) => {
            if (subscription === name) {
              setSubscribed(true);
            } else {
              setSubscribed(false);
            }
          }
        )
      } else {
        setSubscribed(false);
      }
    }
  }, [user]);

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
      <Text style={styles.sectionTitle}>
        Ofertas <Icon type="material-community"
                      name={subscribed ? "bell-ring" : "bell-outline"}
                      iconStyle={styles.iconSuscription}
                      onPress={subscribed ? unsubscribe : subscribe}
      />

      </Text>
      <ListProducts products={offersProductsList} screen="variety"/>
      <Text style={styles.sectionTitle}>
        Todas las publicaciones
      </Text>
      <ListProducts products={products} screen="variety"/>
      <Modal isVisible={requiredLoginModal} setIsVisible={setRequiredLoginModal}>
        <ScrollView style={styles.viewBody}>
          <Text style={styles.title}>
            Debes ingresar con tu cuenta para suscribirte a las notificaciones de ofertas
          </Text>
          <View style={styles.viewBtn}>
            <Button buttonStyle={styles.btn}
                    containerStyle={styles.containerBtn}
                    title="Aceptar"
                    onPress={() => setRequiredLoginModal(false)}
            />
          </View>
        </ScrollView>
      </Modal>
      <Toast ref={toastRef}
             position="center"
             opacity={0.9}
      />
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