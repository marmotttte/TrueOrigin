import React, {useContext} from "react";

import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import {ScanningResult} from "expo-camera";
import {ThemedText} from "@/components/ThemedText";
import {Product} from "@/context/BarcodeState";
import {ThemedView} from "@/components/ThemedView";

interface BarcodeInfoProps {
    scanningResult: ScanningResult | undefined;
    scannedProduct: Product  | undefined;

}

const BarcodeInfo: React.FC<BarcodeInfoProps> = (props: BarcodeInfoProps) => {


    return (
         <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.title}>Product Details</ThemedText>
            <ThemedText type={"default"}>Raw: {props.scanningResult?.raw}</ThemedText>
            <ThemedText type={"default"}>Type: {props.scanningResult?.type}</ThemedText>
            <ThemedText type={"default"}>Data: {props.scanningResult?.data}</ThemedText>
             <ThemedText type={"default"}>Registration Country: {props.scannedProduct?.registrationCountry}</ThemedText>
            <ThemedText type={"default"}>Brand: {props.scannedProduct?.brand}</ThemedText>
             <ThemedText type={"default"}>Name: {props.scannedProduct?.productName}</ThemedText>
             <ThemedText type={"default"}>Countries: {props.scannedProduct?.countries}</ThemedText>
            <ThemedText type={"default"}>Manufacturing Country: {props.scannedProduct?.manufacturingCountry}</ThemedText>
             <ThemedText type={"default"}>Purchase Places: {props.scannedProduct?.purchasePlaces}</ThemedText>
        </ThemedView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 5,
        width: '100%'
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    title: {
        marginTop: 6,
        paddingVertical: 6,
    },
});


export default BarcodeInfo;