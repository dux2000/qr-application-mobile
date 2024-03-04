import React, {ReactNode} from "react";
import {StyleSheet, View, Text} from "react-native";
import {COLORS} from "@/constants/theme";

interface TextHolderProps {
    icon: ReactNode,
    title: string,
    description?: string
}
const TextHolder : React.FC<TextHolderProps> = ({icon, title, description}) => {
    return (
        <View style={styles.container}>
            {icon}
            <View style={styles.textHolder}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primary
    },
    textHolder: {
        marginLeft: 20,
        flexDirection: "column",
    },
    title: {
        fontFamily: "QSBold",
        fontSize: 20,
        color: COLORS.gray
    },
    description: {
        fontFamily: "QSMedium",
        fontSize: 15,
        color: COLORS.gray2,
    }

})

export default TextHolder;