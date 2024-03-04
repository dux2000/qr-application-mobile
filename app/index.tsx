import {Link, useRouter} from "expo-router";
import React from "react";
import {Button, TouchableOpacity} from "react-native";

const Home = () => {

    return (
        <Link href={"/login"} asChild>
            <Button title={"login"}/>
        </Link>
    )
}

export default Home