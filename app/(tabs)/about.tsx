import {Text, type TextProps, StyleSheet, Image, ScrollView} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import {useTranslation} from "react-i18next";
import { version } from '../../package.json';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText type="title">{t('abouttitle')}</ThemedText>
        <ThemedView style={styles.content}>
          <ThemedText type="default">{t('madeincanada')}</ThemedText>
          <Image source={require('../../assets/images/Flag_of_Canada.png')} style={{width: 184, height: 92}}  />
          <ThemedText type="default" style={{textAlign: 'center'}}>Version :  {version}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.content}>
          <ThemedText type="default" style={{textAlign: 'center'}}>{t("about")}</ThemedText>
        </ThemedView>

      </ScrollView>
    </ThemedView>
  );
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

export default AboutPage;