import React from 'react';
import {Stack} from 'expo-router'
import {useFonts} from "expo-font";

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
        <Stack>
            <Stack.Screen name="index" options={{title: "login"}}/>
        </Stack>
    );
};

export default Layout;