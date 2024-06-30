import {CameraView} from "expo-camera";
import React from "react";
import {StyleSheet, View} from "react-native";

const BarCodeScanner = ({handleBarCodeScanned, canScan} : {handleBarCodeScanned : Function, canScan : boolean}) => {

    const handleScanned = (event: any) => {
        handleBarCodeScanned(event)
    }

  return (
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={canScan ? handleScanned : undefined}
          barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
          }}
          style={{ flex: 1 }}
        />
      </View>
  )
}
const styles = StyleSheet.create({
    cameraContainer: {
        width: 300,
        height: 300,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
        overflow: "hidden",
    },
});
export default  BarCodeScanner;