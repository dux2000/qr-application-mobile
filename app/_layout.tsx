import React from 'react';
import {Stack} from 'expo-router'
import {useFonts} from "expo-font";
import {Provider} from "react-redux";
import {store} from "@/store/store";
const Layout = () => {
    const [fontsLoaded] = useFonts({
        QSBold: require("../assets/fonts/Quicksand-Bold.ttf"),
        QSMedium: require("../assets/fonts/Quicksand-Medium.ttf"),
        QSRegular: require("../assets/fonts/Quicksand-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="index" options={{title: "login"}}/>
            </Stack>
        </Provider>
    );
};

export default Layout;