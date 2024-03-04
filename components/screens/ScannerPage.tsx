import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import BarCodeScanner from "@/components/common/BarCodeScanner";
import {Camera} from "expo-camera/next";
import api from "@/service/api";
import CustomModal from "@/components/common/CustomModal";

const ScannerPage: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(true)

    const handleModalOpen = (value : boolean) => {
        setOpen(value);
    }
    const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    };
    useEffect(() => {
        getCameraPermissions();
    }, []);

    console.log(hasPermission);
    const router = useRouter()

    const handleBarCodeScanner = (event : any) => {
        setHasPermission(false);
        console.log(event);

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <BarCodeScanner handleBarCodeScanned={handleBarCodeScanner} canScan={hasPermission}/>
                <CustomModal
                    title={"title"}
                    description={"description"}
                    actions={[
                        <TouchableOpacity key="close" onPress={() => setOpen(false)}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    ]}
                    handleModalOpen={handleModalOpen}
                    open={open}
                />
            </View>
        </SafeAreaView>
    );
};

export default ScannerPage;
