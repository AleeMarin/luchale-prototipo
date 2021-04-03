import {StyleSheet, Text, View} from "react-native";
import {Divider, Image} from "react-native-elements";
import React from "react";

export default function PromotionItem(props) {
  const {promotion} = props;
  const {name, description} = promotion.item;

  return (
    <>
      <View style={styles.viewPromotion}>
        <View style={styles.viewPromotionImage}>
          <Image source={require("../../../assets/img/circle.png")}
                 containerStyle={styles.imagePromotion}
                 resizeMode="contain"
          />
        </View>
        <View style={styles.promotionBody}>
          <Text style={styles.promotionName}>{name}</Text>
          <Text style={styles.promotionDescription}>{description}</Text>
        </View>
      </View>
      <Divider style={styles.divider}/>
    </>
  );
}

const styles = StyleSheet.create({
  viewPromotion: {
    flexDirection: "row",
    margin: 10,
  },
  viewPromotionImage: {
    marginRight: 15,
  },
  imagePromotion: {
    width: 50,
    height: 50,
  },
  promotionBody: {
    flexShrink: 1
  },
  promotionName: {
    fontWeight: "bold",
    color: "#00a680"
  },
  promotionDescription: {
    paddingTop: 2,
    color: "#333",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 20,
    height: 3,
  },
});