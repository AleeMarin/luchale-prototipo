import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {Button, Icon, Input} from "react-native-elements";
import Loading from "../Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

export default function LoginForm(props) {
  const {toastRef} = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const navigation = useNavigation();

  const login = async () => {
    setIsVisibleLoading(true);
    if (!username || !password) {
      toastRef.current.show("Todos los campos son obligatorios", 2000)
    } else {
      loginUser(username)
        .then(
          (value) => {
            value ? navigation.push("MyAccount") : toastRef.current.show("Error al iniciar sesión", 2000)
          }
        )
    }
    setIsVisibleLoading(false);
  };

  const loginUser = async (username) => {
    try {
      const value = await AsyncStorage.getItem(username);
      if (!value) {
        await AsyncStorage.setItem(username, JSON.stringify({username: username, subscriptions: [], basket: []}));
      }
      await AsyncStorage.setItem("user_logged", username);
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <>
      <Input placeholder="Usuario"
             containerStyle={styles.inputForm}
             onChange={(event) => setUsername(event.nativeEvent.text)}
             rightIcon={
               <Icon type="material-community"
                     name="at"
                     iconStyle={styles.iconRight}
               />
             }
      />
      <Input placeholder="Contraseña"
             password={true}
             secureTextEntry={hidePassword}
             containerStyle={styles.inputForm}
             onChange={(event) => setPassword(event.nativeEvent.text)}
             rightIcon={
               <Icon type="material-community"
                     name={hidePassword ? "eye-outline" : "eye-off-outline"}
                     iconStyle={styles.iconRight}
                     onPress={() => setHidePassword(!hidePassword)}
               />
             }
      />
      <Button title="Identificarse"
              containerStyle={styles.btnContainerLogin}
              buttonStyle={styles.btnLogin}
              onPress={login}
      />
      <Loading text="Ingresado"
               isVisible={isVisibleLoading}
      />
    </>
  )
}

const styles = StyleSheet.create({
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#ccc",
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  }
});
