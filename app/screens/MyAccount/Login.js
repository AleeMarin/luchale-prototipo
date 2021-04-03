import React, {useRef} from "react";
import {Image, ScrollView, StyleSheet, View} from "react-native";
import CreateAccount from "../../components/MyAccount/CreateAccount";
import LoginForm from "../../components/MyAccount/LoginForm";
import Toast from "react-native-easy-toast";

export default function Login() {
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image source={require("../../../assets/img/circle.png")}
             style={styles.logo}
             resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef}/>
        <CreateAccount/>
      </View>
      <Toast ref={toastRef}
             position="center"
             opacity={0.9}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
});
