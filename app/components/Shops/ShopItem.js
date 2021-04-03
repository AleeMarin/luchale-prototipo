import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Divider, Image} from "react-native-elements";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export default function ShopItem(props) {
  const {shop} = props;
  const {name, status, description} = shop.item;
  const navigation = useNavigation();

  const goShop = () => {
    navigation.push("ViewShop", shop.item)
  };

  return (
    <TouchableOpacity onPress={goShop}>
      <View style={styles.viewShop}>
        <View style={styles.viewShopImage}>
          <Image source={require("../../../assets/img/circle.png")}
                 containerStyle={styles.imageShop}
                 resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.shopName}>{name}</Text>
          <Text style={styles.shopStatus}>{status}</Text>
          <Text style={styles.shopDescription}>
            {description.substr(0, 35)}{description.length > 35 ? "..." : ""}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewShop: {
    flexDirection: "row",
    margin: 10,
  },
  viewShopImage: {
    marginRight: 15,
  },
  imageShop: {
    width: 50,
    height: 50,
  },
  shopName: {
    fontWeight: "bold",
    color: "#00a680"
  },
  shopStatus: {
    paddingTop: 2,
    color: "#aaa",
  },
  shopDescription: {
    paddingTop: 2,
    color: "#333",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 20,
    height: 3,
  },
});