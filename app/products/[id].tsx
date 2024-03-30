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


const Product = () => {
    const user = useSelector((state: any) => state.user)
    const {id} = useLocalSearchParams<{ id: string }>()
    const [data ,setData] = useState<ProductDto>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>()
    const [statusTransitions, setStatusTransitions] = useState<[StatusDto][]>([[{code: "TAKEN", description: "Radnik preuzeo proizvod"}], [{code: "DONE", description: "Radnik završio"}]]);
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
                setData(response.data[0]);
                setIsLoading(false);
            })
            .catch((e) => {
                setError(e);
                setIsLoading(false); // Set loading to false even on error
            });
    }, []);

    const handleTouch = (nextStatus: string) => {
        setIsLoading(true)
        api.products.updateProduct(id, user.id, nextStatus)
            .then((data) => {
                setData(data);
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
                            icon={<Ionicons name="shirt" size={30} color={COLORS.primary} />}
                            title={"Name"}
                            description={data?.name}
                        />
                        {user.id === data?.currentUser.id && data?.status.code === "TAKEN" ?
                            <TouchableTextHolder
                                icon={<MaterialCommunityIcons name="check" size={30} color={COLORS.primary} />}
                                title={"Finish product"}
                                description={"Finish the product"}
                                handleTouch={handleTouch}
                                statusTransitions={statusTransitions[1]}
                            />
                            : user.id === data?.currentUser.id && data?.status.code === "DONE"
                                ? <Text>Product is finished</Text>
                                : <TouchableTextHolder
                                        icon={<MaterialCommunityIcons name="list-status" size={30} color={COLORS.primary} />}
                                        title={"Status"}
                                        description={data?.status.description}
                                        handleTouch={handleTouch}
                                        statusTransitions={statusTransitions[0]}
                                    />
                        }
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