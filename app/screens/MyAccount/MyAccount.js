import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import {useFocusEffect} from "@react-navigation/native";

export default function MyAccount() {
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getUser()
        .then(
          (value) => {
            setUser(value);
          }
        );
    }, [])
  );

  const getUser = async () => {
    try {
      const username = await AsyncStorage.getItem("user_logged");
      if (username) {
        const user_json = await AsyncStorage.getItem(username);
        if (user_json) {
          return JSON.parse(user_json);
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  if (user === null) return <Loading isVisible={true} text="Cargando"/>

  return user ? <UserLogged username={user.username}/> : <UserGuest/>
}