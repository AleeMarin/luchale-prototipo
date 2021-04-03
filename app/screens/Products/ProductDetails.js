import React, {useEffect, useRef, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Badge, Button, Divider, Icon} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "../../components/Modal";
import Toast from "react-native-easy-toast";
import {useFocusEffect} from "@react-navigation/native";

export default function ProductDetails(props) {
  const toastRef = useRef();
  const {route} = props;
  const {name, description, price, offer, shop} = route.params;
  const [aggregated, setAggregated] = useState(false);
  const [user, setUser] = useState(null);
  const [requiredLoginModal, setRequiredLoginModal] = useState(false);

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

  const addBasket = () => {
    if (user) {
      setUser({...user, ...{basket: [...user.basket, name + shop]}});
      saveUser({...user, ...{basket: [...user.basket, name + shop]}}).then(
        (value) => {
          if (value) {
            toastRef.current.show(`El producto fue agregado a su lista`, 2000)
          } else {
            toastRef.current.show("Error al agregar el producto a su lista", 2000)
          }
        }
      );
    } else {
      setRequiredLoginModal(true);
    }
  };

  const removeBasket = () => {
    setUser({
      ...user, ...{
        basket: user.basket.filter((item) => {
          return item !== name + shop
        })
      }
    });
    saveUser({
      ...user, ...{
        basket: user.basket.filter((item) => {
          return item !== name + shop
        })
      }
    }).then(
      (value) => {
        if (value) {
          toastRef.current.show(`El producto fue eliminado de su lista`, 2000)
        } else {
          toastRef.current.show("Error al eliminar el producto a su lista", 2000)
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
      if (user.basket.length) {
        user.basket.forEach(
          (productshop) => {
            if (productshop === name + shop) {
              setAggregated(true);
            } else {
              setAggregated(false);
            }
          }
        )
      } else {
        setAggregated(false);
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
      <Text style={styles.infoTitle}>
        Descripción del producto
      </Text>
      <Text style={styles.info}>
        {description}
      </Text>
      <Divider style={styles.divider}/>
      <Text style={styles.infoTitle}>
        Precio
      </Text>
      <Text style={styles.info}>
        $ {price} {offer && <Badge value="OFERTA"
                                   badgeStyle={styles.badgeStyle}
                                   containerStyle={styles.badgeContainer}
      />}
      </Text>
      <Divider style={styles.divider}/>
      <Text style={styles.infoTitle}>
        Vendido por
      </Text>
      <Text style={styles.info}>
        {shop}
      </Text>
      <Divider style={styles.divider}/>
      <View style={styles.viewBtn}>
        <Button buttonStyle={aggregated ? styles.btnRemove : styles.btnAdd}
                containerStyle={styles.containerBtn}
                title={aggregated ? "Quitar de mi lista" : "Agregar a mi lista"}
                icon={
                  <Icon type="material-community"
                        name={aggregated ? "playlist-remove" : "playlist-plus"}
                        iconStyle={styles.iconBasket}
                  />
                }
                onPress={aggregated ? removeBasket : addBasket}
        />
      </View>
      <Modal isVisible={requiredLoginModal} setIsVisible={setRequiredLoginModal}>
        <ScrollView style={styles.viewBody}>
          <Text style={styles.title}>
            Debes ingresar con tu cuenta para agregar productos a tu lista
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
  infoTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#00a680",
  },
  info: {
    textAlign: "center",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 20,
    height: 3,
  },
  badgeStyle: {
    backgroundColor: "#00a680",
  },
  badgeContainer: {
    marginTop: -3
  },
  iconBasket: {
    color: "#fff",
    marginRight: 10,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#00a680",
  },
  btnAdd: {
    backgroundColor: "#00a680",
  },
  btnRemove: {
    backgroundColor: "#a60019",
  },
  containerBtn: {
    width: "70%",
  },
});
