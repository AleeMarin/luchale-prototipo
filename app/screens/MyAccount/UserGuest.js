import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.viewBody}
                centerContent={true}
    >
      <Image source={require("../../../assets/img/circle.png")}
             style={styles.image}
             resizeMode="contain"
      />
      <Text style={styles.title}>
        Ingresa a tu cuenta
      </Text>
      <Text style={styles.description}>
        Busca y visualiza los comercios con los productos que necesitas. Crea tus listas de compra, evitá el
        aglomeramiento y no dejes pasar ni una sola oferta.
      </Text>
      <View style={styles.viewBtn}>
        <Button buttonStyle={styles.btn}
                containerStyle={styles.containerBtn}
                title="Ingresar"
                onPress={() => navigation.push("Login")}
        />
      </View>
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