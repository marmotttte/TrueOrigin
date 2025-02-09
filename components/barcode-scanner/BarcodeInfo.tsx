import React, { useContext } from "react";

import {Text, View, TouchableOpacity, StyleSheet, Animated} from "react-native";
import { ScanningResult } from "expo-camera";
import { ThemedText } from "@/components/ThemedText";
import { Product } from "@/context/BarcodeState";
import { ThemedView } from "@/components/ThemedView";
import ScrollView = Animated.ScrollView;
import {useTranslation} from "react-i18next";

interface BarcodeInfoProps {
	scanningResult: ScanningResult | undefined;
	scannedProduct: Product | undefined;
}

const BarcodeInfo: React.FC<BarcodeInfoProps> = (props: BarcodeInfoProps) => {
	const { t } = useTranslation();

	return (
		<ThemedView style={styles.container}>
			<ThemedText type="title" style={styles.title}>
				Product Details
			</ThemedText>
			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				{props.scanningResult == undefined || props.scannedProduct == undefined ? (
					<ThemedView style={styles.responseContent}>
						<ThemedText type={"default"}>Scan a barcode first.</ThemedText>
					</ThemedView>
				) : (
					<ThemedView style={styles.responseContent}>
						<ThemedText type={"default"}>Raw: {props.scanningResult?.raw}</ThemedText>
						<ThemedText type={"default"}>
							Type: {props.scanningResult?.type}
						</ThemedText>
						<ThemedText type={"default"}>
							Data: {props.scanningResult?.data}
						</ThemedText>
						<ThemedText type={"default"}>
							Registration Country: {props.scannedProduct?.registrationCountry}
						</ThemedText>
						<ThemedText type={"default"}>
							Brand: {props.scannedProduct?.brand}
						</ThemedText>
						<ThemedText type={"default"}>
							Name: {props.scannedProduct?.productName}
						</ThemedText>
						<ThemedText type={"default"}>
							Countries: {props.scannedProduct?.countries}
						</ThemedText>
						<ThemedText type={"default"}>
							Manufacturing Country: {props.scannedProduct?.manufacturingCountry}
						</ThemedText>
						<ThemedText type={"default"}>
							Purchase Places: {props.scannedProduct?.purchasePlaces}
						</ThemedText>
					</ThemedView>
				)}
			</ScrollView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0.6,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		padding: 0,
		paddingLeft: 5,
		width: "100%",
	},
	scrollViewContent: {
		paddingBottom: 20,  // Optional: Add some space at the bottom
		justifyContent: 'center',
		alignItems: "center",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	title: {
		marginTop: 6,
		paddingVertical: 6,
	},
	responseContent: {
		margin: 10,
		padding: 10,
		width: 'calc( 100% - 20px )',
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		borderRadius: 10
	}
});

export default BarcodeInfo;
