
import React from "react";
import { StatusBar, Platform, StyleSheet } from "react-native";
import { AppBar } from "@react-native-material/core";
import { Image } from 'react-native';

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

          <Image source={require('../assets/images/icon.png')} style={{width: 36, height: 36}}  />
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
