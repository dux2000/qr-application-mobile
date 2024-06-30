import {View, Text, SafeAreaView, ActivityIndicator, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import api from "@/service/api";
import {Stack, useLocalSearchParams} from "expo-router";
import React from "react";
import {ProductDto, SearchRequest, StatusDto, UserInterface} from "@/interface/Interfaces";
import {Ionicons, MaterialCommunityIcons   } from '@expo/vector-icons';
import TextHolder from "@/components/common/TextHolder";
import {COLORS} from "@/constants/theme";
import TouchableTextHolder from "@/components/common/TouchableTextHolder";
import {useSelector} from "react-redux";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const Product = () => {
    const user = useSelector((state: any) => state.user)
    const {id} = useLocalSearchParams<{ id: string }>()
    const [data ,setData] = useState<ProductDto>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>()
    const [statusTransitions, setStatusTransitions] = useState<StatusDto[]>();
    const [apiCarrier, setApiCarrier] = useState<SearchRequest>({
        page: 0, size: 1,
        searchFilter: {
            searchCriteria: [
                {
                    filterKey: "id",
                    value: id,
                    operation: "eq"
                }],
            logicalOperator: "AND"
        }
    })
    useEffect(() => {
        setIsLoading(true);

        api.products.getProducts(apiCarrier)
            .then((response) => {
                const productData = response.data[0];
                setData(productData);

                // Check if productData is available before accessing its properties
                if (productData && productData.status && productData.status.code) {
                    //fetchStatusTransitions(productData.status);
                } else {
                    setError("Product data or its status code is unavailable.");
                    setIsLoading(false);
                }
            })
            .catch((e) => {
                setError(e);
                setIsLoading(false);
            });
    }, [id, apiCarrier]);

    const fetchStatusTransitions = (status: StatusDto) => {
        setIsLoading(true)
        api.status.getStatusTransitions(status.code)
            .then((response) => {
                setStatusTransitions(response);
                setIsLoading(false);
            })
            .catch((e) => {
                setError(e);
                setIsLoading(false);
            });
    }
    const handleTouch = (nextStatus: string) => {
        setIsLoading(true)
        api.products.updateProduct(id!, user.id, nextStatus)
            .then((data) => {
                setData(data);
                fetchStatusTransitions(data.status);
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
                    headerTitle: "Product information",
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
                            icon={<FontAwesome5 name="pen" size={22} color={COLORS.primary} />}
                            title={"Name"}
                            description={data?.name}
                        />
                        <TextHolder
                            icon={<MaterialIcons name="description" size={30} color={COLORS.primary} />}
                            title={"Description"}
                            description={data?.description}
                        />
                        {data?.characteristics.map((characteristic, index) =>
                            <TextHolder
                                key={index}
                                icon={<FontAwesome5 name="info" size={22} color={COLORS.primary} />}
                                title={characteristic.code + "- " + characteristic.globalCode}
                                description={characteristic.value}
                            />
                        )}
                        {/*<TouchableTextHolder
                            icon={<MaterialCommunityIcons name="check" size={30} color={COLORS.primary} />}
                            title={"Current status"}
                            description={data?.status.description}
                            handleTouch={handleTouch}
                            statusTransitions={statusTransitions}
                        />*/}
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

export default  Product