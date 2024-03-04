import React, {ReactNode} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {COLORS} from "@/constants/theme";
import {StatusDto} from "@/interface/Interfaces";

interface TouchableTextHolderProps {
    icon: ReactNode,
    title: string,
    description?: string,
    handleTouch: Function,
    statusTransitions: StatusDto[] | undefined
}
const TouchableTextHolder : React.FC<TouchableTextHolderProps> = ({icon, title, description, handleTouch, statusTransitions}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {icon}
                <View style={styles.textHolder}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                {statusTransitions?.map((status, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: COLORS.tertiary}}
                            onPress={() => handleTouch(status.code)}
                        >
                            <Text style={styles.touchableOpacityText}>{status.code}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: COLORS.white,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
        overflow: "hidden"
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        borderColor: COLORS.primary,
        borderBottomWidth: StyleSheet.hairlineWidth
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
    },
    actionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    touchableOpacityText: {
        fontFamily: "QSBold",
        fontSize: 12,
        color: COLORS.white
    }

})

export default TouchableTextHolder;