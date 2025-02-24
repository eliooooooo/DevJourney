import { Image, StyleSheet, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LevelContainer } from '@/components/LevelContainer';
import Code from '@/components/Code';

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
      <Code code="<ScrollView style={styles.container}>
                    <Text style={styles.codeText}>{code}</Text>
                  </ScrollView>" >
      </Code>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
});
