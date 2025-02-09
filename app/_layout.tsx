import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import TopBar from "@/components/TopBar";
import {BarcodeProvider} from "@/context/BarcodeState";
import i18next from "i18next";
import Localization from "@/locales/localization";
import HomeScreen from "@/app/(tabs)";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }

    }, [loaded]);

    useEffect(() => {
        // Simulate async fetching of localization data
        const fetchLocalizationData = async () => {
            await i18next.changeLanguage(Localization.language ? Localization.language.split('-')[0] : 'en');// Set language once localization is ready
        };

        fetchLocalizationData();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <BarcodeProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <TopBar />

                <Stack  screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>
        </BarcodeProvider>
    );
}
