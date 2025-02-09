import React from "react";
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useTranslation} from "react-i18next";

const SearchManufacturer: React.FC = () => {
	const { t } = useTranslation();

	return (
		<ThemedView style={styles.container}>
			<ThemedText type="title">{t('searchManufacturer')}</ThemedText>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
	content: {
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 10,
		width: 'calc( 100% - 20px )',
		padding: 10,
		margin: 10
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
});
export default SearchManufacturer;