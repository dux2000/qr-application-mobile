import {Link, Stack, useRouter} from "expo-router";
import React, {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text} from "react-native";
import api from "@/service/api";

const Login = () => {
    api.clothes.getClothesById(3)
        .then((data) => console.log(data))
        .catch((e) => console.log(e))
    const router = useRouter();
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

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
                          onChangeText={(e : string) => setPassword(e)}
                          placeholder='Password'
                      />
                  </View>
                  <Link href={"/scanner"} asChild replace>
                      <TouchableOpacity
                          style={styles.loginButton}>
                          <Text style={styles.text}>Log in</Text>
                      </TouchableOpacity>
                  </Link>
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
        borderRadius: 10,
        borderColor: "#255227",
        borderWidth: 1,
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
        backgroundColor: "#255227",
        borderRadius: 25
    },
    text: {
        color: "white",
        fontWeight: "bold"
    }
});
export default Login;