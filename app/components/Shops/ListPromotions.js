import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import PromotionItem from "./PromotionItem";

export default function ListPromotions(props) {
  const {promotions} = props;

  return (
    <View style={styles.viewBody}>
      {
        promotions.length > 0 ? (
          <FlatList
            data={promotions}
            renderItem={
              (promotion) => (
                <PromotionItem promotion={promotion}/>
              )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.viewBody}>
            <Text style={styles.title}>
              No hay promociones
            </Text>
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
