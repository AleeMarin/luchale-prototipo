import React from "react";
import {StyleSheet, Text, View} from "react-native";

export default function CreateAccount() {
  return (
    <View>
      <Text style={styles.textRegister}>
        ¿Aún no tienes una cuenta?{" "}
      </Text>
      <Text style={styles.btnRegister}>
        Regístrate
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
    textAlign: "center",
  },
});