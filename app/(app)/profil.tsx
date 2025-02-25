import { Platform, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ScrollView style={{
      backgroundColor: '#fff',
      padding: 16,
      paddingTop: Platform.OS === 'ios' ? 100 : 50,
    }}>
        <ThemedView>
          <ThemedText type="title">Profil</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText type="subtitle">Username</ThemedText>
          <ThemedText>Username</ThemedText>
        </ThemedView>
    </ScrollView>
  );
}