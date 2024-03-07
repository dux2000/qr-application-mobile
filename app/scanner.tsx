import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import BarCodeScanner from "@/components/common/BarCodeScanner";
import {Camera} from "expo-camera/next";
import api from "@/service/api";
import CustomModal from "@/components/common/CustomModal";
import {COLORS} from "@/constants/theme";

const ScannerPage: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(false)
    const [showCamera, setShowCamera] = useState<boolean>(true);

    const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    };

    useEffect(() => {
        console.log("mounted")
        getCameraPermissions();
        return () => {
            console.log("unmounted")
            setShowCamera(false);
        };
    }, []);


    const router = useRouter()

    const handleBarCodeScanner = (event : any) => {
        const data = JSON.parse(event.data);
        router.push(`/clothes/${data.id}`)
    }

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Stack.Screen options={{
                headerTitle: "QR code scanner",
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerTitleStyle: {color: COLORS.primary, fontFamily: "QSBold"},
                headerShadowVisible: false
            }}/>
            <View style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.lightWhite,
            }}>
                {showCamera && <BarCodeScanner handleBarCodeScanned={handleBarCodeScanner} canScan={hasPermission} />}
            </View>
        </SafeAreaView>
    );
};

export default ScannerPage;
