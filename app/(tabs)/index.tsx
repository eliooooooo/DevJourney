import { Image, StyleSheet, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LevelContainer } from '@/components/LevelContainer';

export default function HomeScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView>
        <ThemedText type="title">Welcome back Username !</ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}>
        <Text>16 days streak !</Text>
      </ThemedView>
      <LevelContainer />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
});
