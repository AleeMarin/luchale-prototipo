import React, {useRef, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../components/Loading";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-easy-toast";

export default function UserLogged(props) {
  const {username} = props;
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const toastRef = useRef();
  const navigation = useNavigation();

  const logout = async () => {
    setIsVisibleLoading(true);
    logoutUser()
      .then(
        (value) => {
          value ? navigation.push("MyAccount") : toastRef.current.show("Error al cerrar sesión", 2000)
        }
      )
    setIsVisibleLoading(false);
  };

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("user_logged");
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <ScrollView style={styles.viewBody}
                centerContent={true}
    >
      <Image source={require("../../../assets/img/circle.png")}
             style={styles.image}
             resizeMode="contain"
      />
      <Text style={styles.title}>
        Usuario
      </Text>
      <Text style={styles.description}>
        {username}
      </Text>
      <View style={styles.viewBtn}>
        <Button buttonStyle={styles.btn}
                containerStyle={styles.containerBtn}
                title="Cerrar sesión"
                onPress={logout}
        />
      </View>
      <Loading text="Saliendo"
               isVisible={isVisibleLoading}
      />
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
    height: 250,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
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