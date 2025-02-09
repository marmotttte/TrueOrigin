import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Entypo from "@expo/vector-icons/Entypo";
import {useTranslation} from "react-i18next";

interface TabLayoutProps {}
const TabLayout: React.FC<TabLayoutProps> = (props: TabLayoutProps) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title:  t('scanProduct'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              size={28}
              color={color}
            />
          ),
        }}
      />
        <Tabs.Screen
            name="searchManufacturer"
            options={{
                title: t("searchManufacturer"),
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                        name="factory"
                        size={28}
                        color={color}
                    />
                ),
            }}
        />
      <Tabs.Screen
        name="about"
        options={{
          title: t('abouttitle'),
          tabBarIcon: ({ color }) => (
            <Entypo name="info-with-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
