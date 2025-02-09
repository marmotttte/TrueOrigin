import React, {useContext} from "react";
import BarcodeScanner from "@/components/barcode-scanner/BarcodeScanner";
import {ScanningResult} from "expo-camera";
import BarcodeContext from "@/context/BarcodeState";
import BarcodeInfo from "@/components/barcode-scanner/BarcodeInfo";
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet} from "react-native";

const  HomeScreen = ()=> {
    const { state: barcodeState, dispatch: barcodeDispatch } = useContext(BarcodeContext);

    const handleOnBarcodeScanned = (scanningResult: ScanningResult) => {
        barcodeDispatch( {
            type: 'SET_SCANNING_RESULT',
            payload: scanningResult
        });

    }

    return (
        <ThemedView style={styles.container}>
            <BarcodeScanner onBarcodeScanning={handleOnBarcodeScanned}/>
            <BarcodeInfo scanningResult={barcodeState.scannedData} scannedProduct={barcodeState.scannedProduct}  />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0,
    },
});


export default HomeScreen;