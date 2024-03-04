import {View, Text, SafeAreaView, ActivityIndicator, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import api from "@/service/api";
import {Stack, useLocalSearchParams} from "expo-router";
import React from "react";
import {ClothesDto, StatusDto} from "@/interface/Interfaces";
import { MaterialIcons, Ionicons, MaterialCommunityIcons   } from '@expo/vector-icons';
import TextHolder from "@/components/common/TextHolder";
import {COLORS} from "@/constants/theme";
import TouchableTextHolder from "@/components/common/TouchableTextHolder";
import {set} from "yaml/dist/schema/yaml-1.1/set";

const Clothes = () => {
    const params = useLocalSearchParams()
    const [data ,setData] = useState<ClothesDto>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>()
    const [statusTransitions, setStatusTransitions] = useState<StatusDto[]>();

    useEffect(() => {
        setIsLoading(true);

        api.clothes.getClothesById(Number(params.id))
            .then((data) => {
                setData(data);
                // Run the second API call only if data is retrieved successfully
                if (data) {
                    return api.status.getStatusTransitions(data.status.code);
                }
                return null; // Or throw an error if no data is found
            })
            .then((statusTransitions) => {
                if (statusTransitions !== null)
                    setStatusTransitions(statusTransitions);

                setIsLoading(false);
            })
            .catch((e) => {
                setError(e);
                setIsLoading(false); // Set loading to false even on error
            });
    }, []);

    const handleTouch = (nextStatus: string) => {
        setIsLoading(true)
        api.clothes.changeStatus(Number(params.id), nextStatus)
            .then((data) => {
                setData(data);

                if (data) {
                    return api.status.getStatusTransitions(data.status.code);
                }
                return null;
            })
            .then((statusTransitions) => {
                if (statusTransitions !== null)
                    setStatusTransitions(statusTransitions);

                setIsLoading(false);
            })
            .catch((e) => {
                setError(e);
                setIsLoading(false); // Set loading to false even on error
            });
    }

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerTitle: "Clothes information",
                    headerTitleStyle: {color: COLORS.primary, fontFamily: "QSBold"},
                }}
            />
            {isLoading ?
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.lightWhite}}>
                    <ActivityIndicator color={COLORS.primary} size={"large"}/>
                </View>
                : error ? <Text>error</Text>
                    : <View style={styles.clothesContainer}>
                        <TextHolder
                            icon={<MaterialIcons name="color-lens" size={30} color={COLORS.primary} />}
                            title={"Boja"}
                            description={data?.color}
                        />
                        <TextHolder
                            icon={<Ionicons name="resize" size={30} color={COLORS.primary} />}
                            title={"Veličina"}
                            description={data?.size}
                        />
                        <TouchableTextHolder
                            icon={<MaterialCommunityIcons name="list-status" size={30} color={COLORS.primary} />}
                            title={"Status"}
                            description={data?.status.description}
                            handleTouch={handleTouch}
                            statusTransitions={statusTransitions}
                        />
                      </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    clothesContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.lightWhite,
        gap: 10
    },
})

export default  Clothes