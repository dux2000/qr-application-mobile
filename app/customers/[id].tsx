import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera/next";

export default function QRScanner({handleBarCodeScanned} : {handleBarCodeScanned : Function}) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // @ts-ignore
  const handleScanned = ({ type, data}) => {
    handleBarCodeScanned(type, data);
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={styles.container}>
        {/* Container for the camera view with border and rounded corners */}
        <View style={styles.cameraContainer}>
          <CameraView
              onBarcodeScanned={scanned ? undefined : handleScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
              }}
              style={{ flex: 1 }} // Use flex to fill the container
          />
        </View>

        {scanned && (
            <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  cameraContainer: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden",
  },
});
