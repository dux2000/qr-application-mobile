import {Link, Stack, useRouter} from "expo-router";
import React, {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text} from "react-native";
import api from "@/service/api";
import {useDispatch, useSelector} from "react-redux";
import {COLORS} from "@/constants/theme";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const dispatch = useDispatch()

    const handleLogin = () => {
        api.user.loginUser(username, password)
            .then((data) => {
                dispatch({type: "user/login", payload: data})
                setErrorMessage("")
                router.replace("/scanner")
            })
            .catch((e) => {console.log(e); setErrorMessage("Wrong username or password.")})
    }
  return (
      <SafeAreaView>
          <Stack.Screen options={{headerTitle: "", headerShadowVisible: false, headerStyle: { backgroundColor: "#FAFAFC"}}} />
          <View style={styles.loginContainer}>
              <View style={styles.searchContainer}>
                  <View style={styles.searchWrapper}>
                      <TextInput
                          style={styles.searchInput}
                          value={username}
                          onChangeText={(e : string) => setUsername(e)}
                          placeholder='Username'
                      />
                  </View>

                  <View style={styles.searchWrapper}>
                      <TextInput
                          style={styles.searchInput}
                          value={password}
                          secureTextEntry={true}
                          onChangeText={(e : string) => setPassword(e)}
                          placeholder='Password'
                      />
                  </View>
                  {errorMessage && <Text>{errorMessage}</Text>}
                  <TouchableOpacity
                      style={styles.loginButton}
                      onPress={() => handleLogin()}
                  >
                      <Text style={styles.text}>Log in</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    loginContainer: {
        width: "100%",
        padding: 20,
        backgroundColor: "#FAFAFC"
    },
    searchContainer: {
        flexDirection: "column",
        gap: 10,
        paddingHorizontal: 50,
        marginVertical: 5,
        height: "100%",
        alignItems: "center"
    },
    searchWrapper : {
        width: "100%",
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    searchInput: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontWeight: "bold"
    },
    loginButton : {
        height: 50,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 25
    },
    text: {
        color: "white",
        fontWeight: "bold"
    }
});
export default Login;