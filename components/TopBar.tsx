import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StatusBar, Platform, StyleSheet } from "react-native";
import { AppBar } from "@react-native-material/core";

interface AppBarProps {}

const TopBar = (props: AppBarProps) => {
  return (
    <AppBar
      title="True Origin"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "red", // Adjust padding for Android devices
      }}
      leading={(props) => (
        <MaterialCommunityIcons name="barcode-scan" size={36} color="white" />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TopBar;
