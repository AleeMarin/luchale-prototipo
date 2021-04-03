import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Badge, Divider, Image} from "react-native-elements";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {shopsData} from "../../utils/ShopsData";

export default function ProductItem(props) {
  const {product, screen} = props;
  const {name, description, price, offer, shop} = product.item;
  const navigation = useNavigation();

  const goTo = () => {
    if (screen === "main") {
      navigation.push("ProductVariety", {name});
    } else if (screen === "variety") {
      navigation.push("ProductDetails", product.item);
    } else if (screen === "shop" || screen === "basket") {
      navigation.navigate("ProductDetails", product.item);
    }
  };

  const goShop = () => {
    shopsData.forEach(
      (shopItem) => {
        if (shopItem.name === shop) {
          navigation.navigate("ViewShop", shopItem);
        }
      }
    )
  };

  const goProduct = () => {
    navigation.navigate("ProductVariety", {name});
  };

  return (
    <TouchableOpacity onPress={goTo}>
      <View style={styles.viewProduct}>
        <View style={styles.viewProductImage}>
          <Image source={require("../../../assets/img/circle.png")}
                 containerStyle={styles.imageProduct}
                 resizeMode="contain"
          />
        </View>
        <View>
          {
            screen === "main" &&
            <Text style={styles.productNameMain}>{name}</Text>
          }
          {
            (screen === "variety" || screen === "basket") &&
            <>
              <Text style={styles.productShopName} onPress={goShop}>{shop}</Text>
              <Text style={styles.productDescription}>{description}</Text>
              <Text style={styles.productPrice}>$ {price} {offer && <Badge value="OFERTA"
                                                                           badgeStyle={styles.badgeStyle}
                                                                           containerStyle={styles.badgeContainer}
              />}</Text>
            </>
          }
          {
            screen === "shop" &&
            <>
              <Text style={styles.shopProductName} onPress={goProduct}>{name}</Text>
              <Text style={styles.productDescription}>{description}</Text>
              <Text style={styles.productPrice}>$ {price} {offer && <Badge value="OFERTA"
                                                                           badgeStyle={styles.badgeStyle}
                                                                           containerStyle={styles.badgeContainer}
              />}</Text>
            </>
          }
        </View>
      </View>
      <Divider style={styles.divider}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewProduct: {
    flexDirection: "row",
    margin: 10,
  },
  viewProductImage: {
    marginRight: 15,
  },
  imageProduct: {
    width: 50,
    height: 50,
  },
  productNameMain: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#00a680"
  },
  productShopName: {
    fontWeight: "bold",
    color: "#00a680",
    fontSize: 18,
  },
  shopProductName: {
    fontWeight: "bold",
    color: "#00a680",
    fontSize: 18,
  },
  productDescription: {
    paddingTop: 2,
    color: "#aaa",
  },
  productPrice: {
    paddingTop: 2,
    color: "#333",
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
    marginTop: -5
  }
});