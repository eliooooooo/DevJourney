import { ThemedView } from '@/components/ThemedView';
import { LevelContainer } from '@/components/LevelContainer';

export default function Index() {

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LevelContainer />
    </ThemedView>
  );
}
