import {  Text, type TextProps, StyleSheet} from 'react-native';
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";



export default function TabTwoScreen() {
  return (
      <ThemedView style={styles.container}>
        <ThemedText type="default">Made In Canada</ThemedText>
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
    justifyContent: 'center',
    padding: 20,
  },
});
