import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {Divider} from "react-native-elements";

export default function ShopDetails(props) {
  const {route} = props;
  const {name, description} = route.params;

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
        Sobre nosotros
      </Text>
      <Text style={styles.info}>
        {description}
      </Text>
      <Divider style={styles.divider}/>
      <Text style={styles.infoTitle}>
        Horarios de atención
      </Text>
      <View style={styles.viewRow}>
        <View style={styles.viewColDays}>
          <Text style={styles.infoDays}>
            {"Lunes\nMartes\nMiércoles\nJueves\nViernes\nSábado"}
          </Text>
        </View>
        <View style={styles.viewColHours}>
          <Text style={styles.infoHours}>
            {"09:00 hs. a 18:00 hs.\n09:00 hs. a 18:00 hs.\n09:00 hs. a 18:00 hs.\n09:00 hs. a 18:00 hs.\n09:00 hs. a 18:00 hs.\n09:00 hs. a 13:00 hs."}
          </Text>
        </View>
      </View>
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
  infoDays: {
    textAlign: "left",
  },
  infoHours: {
    textAlign: "right",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 20,
    height: 3,
  },
  viewRow: {
    flexDirection: "row",
  },
  viewColDays: {
    flexDirection: "column",
    width: "50%",
    justifyContent: "center",
  },
  viewColHours: {
    flexDirection: "column",
    width: "50%",
    justifyContent: "center",
  },
});