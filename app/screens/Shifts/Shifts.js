import React from "react";
import {StyleSheet, Text, View} from "react-native";

export default function Shifts() {
  return (
    <View style={styles.viewBody}>
      <Text style={styles.title}>
        Aquí encontraras tus turnos
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
});